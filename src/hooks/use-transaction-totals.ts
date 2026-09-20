import { useMemo } from 'react';

import { useTransactionStore } from '@/store/use-transaction-store';

export function useTransactionTotals() {
  const transactions = useTransactionStore((state) => state.transactions);

  return useMemo(() => {
    let income = 0;
    let expense = 0;

    for (const transaction of transactions) {
      if (transaction.type === 'income' || transaction.type === 'sell') {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    }

    return { income, expense, balance: income - expense };
  }, [transactions]);
}
