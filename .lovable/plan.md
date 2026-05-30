
# Local Rocket – Backend & Portaler

Det här är ett stort bygge. Jag föreslår att vi delar upp det i 5 faser så vi kan testa stegvis. Innan vi kör behöver jag bekräfta några saker — se "Frågor" i slutet.

## Förutsättningar som saknas idag

Sajten är just nu en ren frontend utan backend. Följande finns INTE i projektet ännu, trots att kravspecen refererar till dem som "befintliga":

- Lovable Cloud (Supabase) är inte aktiverat — måste aktiveras först
- Ingen `user_roles`-tabell eller `app_role`-enum
- Ingen admin-panel eller `/admin/*`-routes (businesses, cities, leads, crm, m.fl.)
- Inga `cities`-tabell
- Ingen Stripe-koppling

Jag bygger allt från grunden. De "befintliga admin-routes" som ska "bevaras" finns inte — säg till om du har dem i ett annat projekt så kan jag kopiera in.

## Fas 1 – Fundament (Cloud + Auth + Roller)

1. Aktivera Lovable Cloud
2. Migration: `app_role`-enum (`admin`, `moderator`, `user`), `user_roles`-tabell, `has_role()` security-definer-funktion
3. Migration: `customers`-tabell + trigger som vid signup skapar customer-rad och tilldelar rollen `user`
4. Sidor `/login`, `/signup`, `/reset-password` med Local Rocket-design
5. `AuthProvider` + `ProtectedRoute`-komponent (rollbaserad)
6. Navbar visar "Logga in" / "Min portal" + "Logga ut"

## Fas 2 – Databasschema + RLS

Migrationer för alla tabeller enligt specen:
- `niches`, `cities` (saknas idag), `subscriptions`, `subscription_stats`, `monthly_reports`, `payments`, `slot_reservations`
- Unique partial index på `subscriptions(niche_id, city_id)` där status ∈ aktiv/past_due/trialing
- RLS-policies per spec (kund ser sitt, admin ser allt)
- GRANTs till `authenticated` / `service_role`
- Seed: nischerna Städfirmor, Tandläkare, Bilfirmor, Takläggare, Mäklare, Flyttfirmor, Elektriker, VVS + lista över svenska kommuner

## Fas 3 – Onboarding-wizard + Stripe Checkout

1. `/onboarding` med stepper (5 steg): konto → plan → nisch → stad → betalning
2. Edge function `check-availability` (kollar subscriptions + slot_reservations)
3. Edge function `create-checkout-session` (skapar Stripe Customer + Subscription Checkout, reserverar slot 15 min)
4. Edge function `stripe-webhook`: hanterar `checkout.session.completed`, `invoice.payment_succeeded/failed`, `customer.subscription.updated/deleted`
5. Edge function `cleanup-reservations` + pg_cron var 5:e min
6. Stripe-nycklar som secrets: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `VITE_STRIPE_PUBLISHABLE_KEY`, samt `STRIPE_PRICE_ID_GROWTH` / `STRIPE_PRICE_ID_PREMIUM`

## Fas 4 – Kundportal `/dashboard/*`

Sidebar-layout med:
- `/dashboard` – KPI-kort, Recharts trendgraf, senaste leads
- `/dashboard/subscription` – plan/status + knappar mot Stripe Customer Portal (ny edge function `create-portal-session`), uppgradera, avsluta
- `/dashboard/reports` – lista månadsrapporter
- `/dashboard/settings` – kvitto-mail, rapport-mail, företagsinfo, byt lösenord

## Fas 5 – Admin-CRM `/admin/*`

Separat admin-layout med sidebar:
- `/admin` – KPI:er (aktiva subs, MRR, lediga platser, churn) + senaste händelser
- `/admin/niches` – CRUD nischer
- `/admin/availability` – matris städer × nischer (scrollbar horisontellt)
- `/admin/customers` + `/admin/customers/:id` – lista, detalj, anteckningar, manuella åtgärder
- `/admin/stats` – formulär + CSV-import för månadsstatistik
- `/admin/settings` – plats för globala inställningar

## Tekniska val (samma genom hela bygget)

- React Router, TanStack Query, shadcn/ui, Recharts
- Zod-validering på alla formulär och edge-function-inputs
- All design via befintliga semantiska tokens (röd primary, vit bg, Mabry)
- All text på svenska
- Roller alltid i `user_roles` (aldrig på `customers`)
- Edge functions med CORS från `npm:@supabase/supabase-js@2/cors`

## Vad jag behöver från dig innan jag börjar

1. **Stripe**: Har du redan ett Stripe-konto och Price IDs för Growth (5 000 kr/mån) och Premium (8 000 kr/mån)? Annars använder vi Lovable's inbyggda Stripe-integration (rekommenderas — inget eget konto behövs initialt). Bekräfta vilket.
2. **Städer**: Ska jag seed:a med Sveriges 290 kommuner, top 50 städer, eller har du en egen lista?
3. **Första admin-användaren**: Vilken e-post ska få `admin`-rollen automatiskt? (Jag lägger in en migration som promotar just den mailen till admin första gången hen registrerar sig.)
4. **Bygga allt på en gång eller fas-för-fas?** Allt-på-en-gång blir ~30+ filer i en enda omgång och svårare att testa. Jag rekommenderar att vi kör Fas 1 + 2 först, du testar inloggning och tittar i databasen, sedan fortsätter vi.

Svara på de fyra frågorna så drar jag igång.
