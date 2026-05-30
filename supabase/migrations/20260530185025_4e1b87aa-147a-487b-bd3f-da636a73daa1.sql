-- Add environment column (sandbox/live) to subscriptions
ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS environment text NOT NULL DEFAULT 'sandbox';

-- Index for quick lookup by stripe_subscription_id (already unique-ish but make sure)
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_sub
  ON public.subscriptions(stripe_subscription_id);

-- Enforce: at most one ACTIVE subscription per (niche, city, environment)
CREATE UNIQUE INDEX IF NOT EXISTS uniq_active_slot
  ON public.subscriptions(niche_id, city_id, environment)
  WHERE status IN ('active','trialing','past_due');

-- Helper: is a slot available?
CREATE OR REPLACE FUNCTION public.is_slot_available(
  _niche_id uuid, _city_id uuid, _env text DEFAULT 'sandbox'
) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM public.subscriptions
    WHERE niche_id = _niche_id
      AND city_id = _city_id
      AND environment = _env
      AND status IN ('active','trialing','past_due')
  ) AND NOT EXISTS (
    SELECT 1 FROM public.slot_reservations
    WHERE niche_id = _niche_id
      AND city_id = _city_id
      AND expires_at > now()
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_slot_available(uuid, uuid, text) TO authenticated, anon;