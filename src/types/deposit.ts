export interface Deposit {
  id: string;
  reserve: string;
  userId: string;
  onBehalfOf: string;
  amount: string;
  referral: number;
  timestamp: number;
  txHash: string;
}

export interface DepositsResponse {
  deposits: {
    items: Deposit[];
  };
}
