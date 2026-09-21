import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Transaction } from '@/types/transaction';
import { generateId } from '@/utils/generate-id';

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'seed-1',
    type: 'buy',
    asset: 'BTC',
    amount: 420,
    price: 61250,
    category: 'Crypto',
    note: 'Bitcoin Purchase',
    date: '2026-09-19T14:32:00Z',
  },
  {
    id: 'seed-2',
    type: 'expense',
    asset: 'USD',
    amount: 68.42,
    category: 'Groceries',
    note: 'Grocery Store',
    date: '2026-09-18T10:05:00Z',
  },
  {
    id: 'seed-3',
    type: 'income',
    asset: 'USD',
    amount: 2500,
    category: 'Payroll',
    note: 'Salary Deposit',
    date: '2026-09-17T09:00:00Z',
  },
  {
    id: 'seed-4',
    type: 'sell',
    asset: 'ETH',
    amount: 310.5,
    price: 3120,
    category: 'Crypto',
    note: 'Ethereum Sale',
    date: '2026-09-16T16:48:00Z',
  },
  {
    id: 'seed-5',
    type: 'expense',
    asset: 'USD',
    amount: 14.99,
    category: 'Subscriptions',
    note: 'Streaming Service',
    date: '2026-09-15T08:12:00Z',
  },
];

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'> & { id?: string }) => void;
  removeTransaction: (id: string) => void;
  clearTransactions: () => void;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: MOCK_TRANSACTIONS,
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            { ...transaction, id: transaction.id ?? generateId() },
            ...state.transactions,
          ],
        })),
      removeTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
      clearTransactions: () => set({ transactions: [] }),
    }),
    {
      name: 'transaction-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
