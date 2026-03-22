export interface Plan {
  id: string;
  nickname: string | null;
  amount: number;
  interval: string;
  intervalCount: number;
  product: string;
  tier: string;
  metadata: Record<string, any>;
}
