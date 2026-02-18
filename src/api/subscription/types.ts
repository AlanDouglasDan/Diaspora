export interface CreateCustomerPayload {
  userId: string;
  email: string;
}

export interface CreateSubscriptionPayload {
  userId: string;
  priceId: string;
}

export interface SubscriptionResponse {
  clientSecret: string | null;
  subscriptionId?: string;
}
