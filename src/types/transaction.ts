export type TransactionType = 'income' | 'expense' | 'buy' | 'sell';

export interface Transaction {
  id: string;
  type: TransactionType;
  asset: string;
  amount: number;
  price?: number;
  category?: string;
  note?: string;
  date: string;
}
