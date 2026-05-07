export type ServiceStatus = "active" | "trial" | "paused" | "evaluating" | "cancelled";
export type ServiceCycle  = "monthly" | "annual" | "quarterly" | "one_time";

export interface Phase {
  id: string;
  slug: string;
  name: string;
  short_name: string;
  start_month: number;
  end_month: number;
  color: string;
  description: string | null;
  deliverables: string[];
  target_amount: number | null;
  position: number;
}

export interface Milestone {
  id: string;
  month: number;
  label: string;
  target_amount: number;
  achieved_amount: number | null;
  achieved_at: string | null;
  notes: string | null;
}

export interface Service {
  id: string;
  name: string;
  provider: string | null;
  url: string | null;
  category: string;
  cost: number;
  currency: string;
  cycle: ServiceCycle;
  status: ServiceStatus;
  started_at: string | null;
  next_renewal: string | null;
  essential: boolean | null;
  is_public: boolean | null;
  notes: string | null;
  position: number | null;
  created_at: string;
}

export interface Snapshot {
  id: string;
  month: string;
  burn_monthly: number;
  services_count: number;
  revenue_month: number;
  revenue_cumulative: number;
  mrr: number;
  audience_size: number;
  notes: string | null;
  created_at: string;
}

export interface LogEntry {
  id: string;
  slug: string;
  title: string;
  body_md: string;
  excerpt: string | null;
  week_number: number | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Settings {
  goal_amount: number;
  start_date: string;
  horizon_months: number;
  site_tagline: string;
  founder_name: string;
}

export const STATUS_LABEL: Record<ServiceStatus, string> = {
  active:     "Attivo",
  trial:      "Trial",
  paused:     "In pausa",
  evaluating: "Da valutare",
  cancelled:  "Cancellato"
};

export const CYCLE_LABEL: Record<ServiceCycle, string> = {
  monthly:   "Mensile",
  annual:    "Annuale",
  quarterly: "Trimestrale",
  one_time:  "Una tantum"
};

export function monthlyCost(s: Pick<Service, "cost" | "cycle">): number {
  switch (s.cycle) {
    case "monthly":   return s.cost;
    case "annual":    return s.cost / 12;
    case "quarterly": return s.cost / 3;
    case "one_time":  return 0;
  }
}

export function annualCost(s: Pick<Service, "cost" | "cycle">): number {
  switch (s.cycle) {
    case "monthly":   return s.cost * 12;
    case "annual":    return s.cost;
    case "quarterly": return s.cost * 4;
    case "one_time":  return s.cost;
  }
}
