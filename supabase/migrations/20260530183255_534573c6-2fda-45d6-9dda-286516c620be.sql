-- ============ ENUMS ============
create type public.app_role as enum ('admin', 'moderator', 'user');

-- ============ user_roles ============
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users view own roles" on public.user_roles for select to authenticated
  using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));
create policy "Admins manage roles" on public.user_roles for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- ============ customers ============
create table public.customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique not null,
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  address text,
  invoice_email text,
  report_email text,
  stripe_customer_id text unique,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.customers to authenticated;
grant all on public.customers to service_role;
alter table public.customers enable row level security;

create policy "Customers read own" on public.customers for select to authenticated
  using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));
create policy "Customers update own" on public.customers for update to authenticated
  using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));
create policy "Admins insert customers" on public.customers for insert to authenticated
  with check (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));
create policy "Admins delete customers" on public.customers for delete to authenticated
  using (public.has_role(auth.uid(),'admin'));

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger customers_set_updated_at before update on public.customers
  for each row execute function public.set_updated_at();

-- ============ Signup trigger ============
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_role public.app_role := 'user';
begin
  if new.email = 'jesper@jkmarketing.se' then
    v_role := 'admin';
  end if;
  insert into public.user_roles (user_id, role) values (new.id, v_role)
    on conflict (user_id, role) do nothing;
  insert into public.customers (user_id, company_name, contact_name, email, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'company_name', ''),
    coalesce(new.raw_user_meta_data->>'contact_name', ''),
    new.email,
    new.raw_user_meta_data->>'phone'
  )
  on conflict (user_id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ niches ============
create table public.niches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  domain text,
  icon text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.niches to anon, authenticated;
grant all on public.niches to service_role;
alter table public.niches enable row level security;
create policy "Niches public read" on public.niches for select to anon, authenticated using (true);
create policy "Admins manage niches" on public.niches for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- ============ cities ============
create table public.cities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz not null default now()
);
grant select on public.cities to anon, authenticated;
grant all on public.cities to service_role;
alter table public.cities enable row level security;
create policy "Cities public read" on public.cities for select to anon, authenticated using (true);
create policy "Admins manage cities" on public.cities for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- ============ subscriptions ============
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  niche_id uuid not null references public.niches(id),
  city_id uuid not null references public.cities(id),
  plan text not null check (plan in ('growth','premium')),
  status text not null check (status in ('active','past_due','canceled','paused','trialing')),
  stripe_subscription_id text unique,
  stripe_price_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index subscriptions_unique_active_slot
  on public.subscriptions (niche_id, city_id)
  where status in ('active','past_due','trialing');
create trigger subscriptions_set_updated_at before update on public.subscriptions
  for each row execute function public.set_updated_at();
grant select on public.subscriptions to authenticated;
grant all on public.subscriptions to service_role;
alter table public.subscriptions enable row level security;
create policy "Customers read own subs" on public.subscriptions for select to authenticated
  using (
    exists(select 1 from public.customers c where c.id = customer_id and c.user_id = auth.uid())
    or public.has_role(auth.uid(),'admin')
  );
create policy "Admins manage subs" on public.subscriptions for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- ============ subscription_stats ============
create table public.subscription_stats (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.subscriptions(id) on delete cascade,
  month date not null,
  leads_count integer not null default 0,
  page_views integer not null default 0,
  clicks integer not null default 0,
  ad_spend integer not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  unique (subscription_id, month)
);
grant select on public.subscription_stats to authenticated;
grant all on public.subscription_stats to service_role;
alter table public.subscription_stats enable row level security;
create policy "Customers read own stats" on public.subscription_stats for select to authenticated
  using (
    exists(select 1 from public.subscriptions s join public.customers c on c.id = s.customer_id
           where s.id = subscription_id and c.user_id = auth.uid())
    or public.has_role(auth.uid(),'admin')
  );
create policy "Admins manage stats" on public.subscription_stats for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- ============ monthly_reports ============
create table public.monthly_reports (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.subscriptions(id) on delete cascade,
  month date not null,
  report_url text,
  summary text,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);
grant select on public.monthly_reports to authenticated;
grant all on public.monthly_reports to service_role;
alter table public.monthly_reports enable row level security;
create policy "Customers read own reports" on public.monthly_reports for select to authenticated
  using (
    exists(select 1 from public.subscriptions s join public.customers c on c.id = s.customer_id
           where s.id = subscription_id and c.user_id = auth.uid())
    or public.has_role(auth.uid(),'admin')
  );
create policy "Admins manage reports" on public.monthly_reports for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- ============ payments ============
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.subscriptions(id) on delete cascade,
  stripe_invoice_id text,
  amount integer not null,
  currency text not null default 'sek',
  status text not null check (status in ('paid','failed','pending')),
  paid_at timestamptz,
  created_at timestamptz not null default now()
);
grant select on public.payments to authenticated;
grant all on public.payments to service_role;
alter table public.payments enable row level security;
create policy "Customers read own payments" on public.payments for select to authenticated
  using (
    exists(select 1 from public.subscriptions s join public.customers c on c.id = s.customer_id
           where s.id = subscription_id and c.user_id = auth.uid())
    or public.has_role(auth.uid(),'admin')
  );
create policy "Admins manage payments" on public.payments for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- ============ slot_reservations ============
create table public.slot_reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  niche_id uuid not null references public.niches(id) on delete cascade,
  city_id uuid not null references public.cities(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique (niche_id, city_id)
);
grant select, insert, delete on public.slot_reservations to authenticated;
grant all on public.slot_reservations to service_role;
alter table public.slot_reservations enable row level security;
create policy "Users read own reservations" on public.slot_reservations for select to authenticated
  using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));
create policy "Users insert own reservations" on public.slot_reservations for insert to authenticated
  with check (auth.uid() = user_id);
create policy "Users delete own reservations" on public.slot_reservations for delete to authenticated
  using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));

-- ============ Seed niches ============
insert into public.niches (name, slug, domain, icon) values
  ('Städfirmor','stadfirmor','stadfirmor.nu','🧹'),
  ('Tandläkare','tandlakare','tandlakare.nu','🦷'),
  ('Bilfirmor','bilfirmor','bilfirmor.nu','🚗'),
  ('Takläggare','taklaggare','taklaggare.nu','🏠'),
  ('Mäklare','maklare','maklare.nu','🔑'),
  ('Flyttfirmor','flyttfirmor','flyttfirmor.nu','📦'),
  ('Elektriker','elektriker','elektriker.nu','⚡'),
  ('VVS','vvs','vvs.nu','🔧');

-- ============ Seed 290 Swedish municipalities ============
insert into public.cities (name, slug) values
  ('Ale','ale'),('Alingsås','alingsas'),('Alvesta','alvesta'),('Aneby','aneby'),('Arboga','arboga'),
  ('Arjeplog','arjeplog'),('Arvidsjaur','arvidsjaur'),('Arvika','arvika'),('Askersund','askersund'),('Avesta','avesta'),
  ('Bengtsfors','bengtsfors'),('Berg','berg'),('Bjurholm','bjurholm'),('Bjuv','bjuv'),('Boden','boden'),
  ('Bollebygd','bollebygd'),('Bollnäs','bollnas'),('Borgholm','borgholm'),('Borlänge','borlange'),('Borås','boras'),
  ('Botkyrka','botkyrka'),('Boxholm','boxholm'),('Bromölla','bromolla'),('Bräcke','bracke'),('Burlöv','burlov'),
  ('Båstad','bastad'),('Dals-Ed','dals-ed'),('Danderyd','danderyd'),('Degerfors','degerfors'),('Dorotea','dorotea'),
  ('Eda','eda'),('Ekerö','ekero'),('Eksjö','eksjo'),('Emmaboda','emmaboda'),('Enköping','enkoping'),
  ('Eskilstuna','eskilstuna'),('Eslöv','eslov'),('Essunga','essunga'),('Fagersta','fagersta'),('Falkenberg','falkenberg'),
  ('Falköping','falkoping'),('Falun','falun'),('Filipstad','filipstad'),('Finspång','finspang'),('Flen','flen'),
  ('Forshaga','forshaga'),('Färgelanda','fargelanda'),('Gagnef','gagnef'),('Gislaved','gislaved'),('Gnesta','gnesta'),
  ('Gnosjö','gnosjo'),('Gotland','gotland'),('Grums','grums'),('Grästorp','grastorp'),('Gullspång','gullspang'),
  ('Gällivare','gallivare'),('Gävle','gavle'),('Göteborg','goteborg'),('Götene','gotene'),('Habo','habo'),
  ('Hagfors','hagfors'),('Hallsberg','hallsberg'),('Hallstahammar','hallstahammar'),('Halmstad','halmstad'),('Hammarö','hammaro'),
  ('Haninge','haninge'),('Haparanda','haparanda'),('Heby','heby'),('Hedemora','hedemora'),('Helsingborg','helsingborg'),
  ('Herrljunga','herrljunga'),('Hjo','hjo'),('Hofors','hofors'),('Huddinge','huddinge'),('Hudiksvall','hudiksvall'),
  ('Hultsfred','hultsfred'),('Hylte','hylte'),('Hällefors','hallefors'),('Härjedalen','harjedalen'),('Härnösand','harnosand'),
  ('Härryda','harryda'),('Hässleholm','hassleholm'),('Håbo','habo-kommun'),('Höganäs','hoganas'),('Högsby','hogsby'),
  ('Hörby','horby'),('Höör','hoor'),('Jokkmokk','jokkmokk'),('Järfälla','jarfalla'),('Jönköping','jonkoping'),
  ('Kalix','kalix'),('Kalmar','kalmar'),('Karlsborg','karlsborg'),('Karlshamn','karlshamn'),('Karlskoga','karlskoga'),
  ('Karlskrona','karlskrona'),('Karlstad','karlstad'),('Katrineholm','katrineholm'),('Kil','kil'),('Kinda','kinda'),
  ('Kiruna','kiruna'),('Klippan','klippan'),('Knivsta','knivsta'),('Kramfors','kramfors'),('Kristianstad','kristianstad'),
  ('Kristinehamn','kristinehamn'),('Krokom','krokom'),('Kumla','kumla'),('Kungsbacka','kungsbacka'),('Kungsör','kungsor'),
  ('Kungälv','kungalv'),('Kävlinge','kavlinge'),('Köping','koping'),('Laholm','laholm'),('Landskrona','landskrona'),
  ('Laxå','laxa'),('Lekeberg','lekeberg'),('Leksand','leksand'),('Lerum','lerum'),('Lessebo','lessebo'),
  ('Lidingö','lidingo'),('Lidköping','lidkoping'),('Lilla Edet','lilla-edet'),('Lindesberg','lindesberg'),('Linköping','linkoping'),
  ('Ljungby','ljungby'),('Ljusdal','ljusdal'),('Ljusnarsberg','ljusnarsberg'),('Lomma','lomma'),('Ludvika','ludvika'),
  ('Luleå','lulea'),('Lund','lund'),('Lycksele','lycksele'),('Lysekil','lysekil'),('Malmö','malmo'),
  ('Malung-Sälen','malung-salen'),('Malå','mala'),('Mariestad','mariestad'),('Mark','mark'),('Markaryd','markaryd'),
  ('Mellerud','mellerud'),('Mjölby','mjolby'),('Mora','mora'),('Motala','motala'),('Mullsjö','mullsjo'),
  ('Munkedal','munkedal'),('Munkfors','munkfors'),('Mölndal','molndal'),('Mönsterås','monsteras'),('Mörbylånga','morbylanga'),
  ('Nacka','nacka'),('Nora','nora'),('Norberg','norberg'),('Nordanstig','nordanstig'),('Nordmaling','nordmaling'),
  ('Norrköping','norrkoping'),('Norrtälje','norrtalje'),('Norsjö','norsjo'),('Nybro','nybro'),('Nykvarn','nykvarn'),
  ('Nyköping','nykoping'),('Nynäshamn','nynashamn'),('Nässjö','nassjo'),('Ockelbo','ockelbo'),('Olofström','olofstrom'),
  ('Orsa','orsa'),('Orust','orust'),('Osby','osby'),('Oskarshamn','oskarshamn'),('Ovanåker','ovanaker'),
  ('Oxelösund','oxelosund'),('Pajala','pajala'),('Partille','partille'),('Perstorp','perstorp'),('Piteå','pitea'),
  ('Ragunda','ragunda'),('Robertsfors','robertsfors'),('Ronneby','ronneby'),('Rättvik','rattvik'),('Sala','sala'),
  ('Salem','salem'),('Sandviken','sandviken'),('Sigtuna','sigtuna'),('Simrishamn','simrishamn'),('Sjöbo','sjobo'),
  ('Skara','skara'),('Skellefteå','skelleftea'),('Skinnskatteberg','skinnskatteberg'),('Skurup','skurup'),('Skövde','skovde'),
  ('Smedjebacken','smedjebacken'),('Sollefteå','solleftea'),('Sollentuna','sollentuna'),('Solna','solna'),('Sorsele','sorsele'),
  ('Sotenäs','sotenas'),('Staffanstorp','staffanstorp'),('Stenungsund','stenungsund'),('Stockholm','stockholm'),('Storfors','storfors'),
  ('Storuman','storuman'),('Strängnäs','strangnas'),('Strömstad','stromstad'),('Strömsund','stromsund'),('Sundbyberg','sundbyberg'),
  ('Sundsvall','sundsvall'),('Sunne','sunne'),('Surahammar','surahammar'),('Svalöv','svalov'),('Svedala','svedala'),
  ('Svenljunga','svenljunga'),('Säffle','saffle'),('Säter','sater'),('Sävsjö','savsjo'),('Söderhamn','soderhamn'),
  ('Söderköping','soderkoping'),('Södertälje','sodertalje'),('Sölvesborg','solvesborg'),('Tanum','tanum'),('Tibro','tibro'),
  ('Tidaholm','tidaholm'),('Tierp','tierp'),('Timrå','timra'),('Tingsryd','tingsryd'),('Tjörn','tjorn'),
  ('Tomelilla','tomelilla'),('Torsby','torsby'),('Torsås','torsas'),('Tranemo','tranemo'),('Tranås','tranas'),
  ('Trelleborg','trelleborg'),('Trollhättan','trollhattan'),('Trosa','trosa'),('Tyresö','tyreso'),('Täby','taby'),
  ('Töreboda','toreboda'),('Uddevalla','uddevalla'),('Ulricehamn','ulricehamn'),('Umeå','umea'),('Upplands Väsby','upplands-vasby'),
  ('Upplands-Bro','upplands-bro'),('Uppsala','uppsala'),('Uppvidinge','uppvidinge'),('Vadstena','vadstena'),('Vaggeryd','vaggeryd'),
  ('Valdemarsvik','valdemarsvik'),('Vallentuna','vallentuna'),('Vansbro','vansbro'),('Vara','vara'),('Varberg','varberg'),
  ('Vaxholm','vaxholm'),('Vellinge','vellinge'),('Vetlanda','vetlanda'),('Vilhelmina','vilhelmina'),('Vimmerby','vimmerby'),
  ('Vindeln','vindeln'),('Vingåker','vingaker'),('Vårgårda','vargarda'),('Vänersborg','vanersborg'),('Vännäs','vannas'),
  ('Värmdö','varmdo'),('Värnamo','varnamo'),('Västervik','vastervik'),('Västerås','vasteras'),('Växjö','vaxjo'),
  ('Ydre','ydre'),('Ystad','ystad'),('Åmål','amal'),('Ånge','ange'),('Åre','are'),
  ('Årjäng','arjang'),('Åsele','asele'),('Åstorp','astorp'),('Åtvidaberg','atvidaberg'),('Älmhult','almhult'),
  ('Älvdalen','alvdalen'),('Älvkarleby','alvkarleby'),('Älvsbyn','alvsbyn'),('Ängelholm','angelholm'),('Öckerö','ockero'),
  ('Ödeshög','odeshog'),('Örebro','orebro'),('Örkelljunga','orkelljunga'),('Örnsköldsvik','ornskoldsvik'),('Östersund','ostersund'),
  ('Österåker','osteraker'),('Östhammar','osthammar'),('Östra Göinge','ostra-goinge'),('Överkalix','overkalix'),('Övertorneå','overtornea');
