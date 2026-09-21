import { Text, View } from 'react-native';

import type { Transaction } from '@/types/transaction';
import { formatCurrency } from '@/utils/format-currency';

export type TransactionHistoryProps = {
  transactions?: Transaction[];
  title?: string;
};

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'buy',
    asset: 'BTC',
    amount: 420,
    category: 'Crypto',
    note: 'Bitcoin Purchase',
    date: '2026-09-19T14:32:00Z',
  },
  {
    id: '2',
    type: 'expense',
    asset: 'USD',
    amount: 68.42,
    category: 'Groceries',
    note: 'Grocery Store',
    date: '2026-09-18T10:05:00Z',
  },
  {
    id: '3',
    type: 'income',
    asset: 'USD',
    amount: 2500,
    category: 'Payroll',
    note: 'Salary Deposit',
    date: '2026-09-17T09:00:00Z',
  },
  {
    id: '4',
    type: 'sell',
    asset: 'ETH',
    amount: 310.5,
    category: 'Crypto',
    note: 'Ethereum Sale',
    date: '2026-09-16T16:48:00Z',
  },
  {
    id: '5',
    type: 'expense',
    asset: 'USD',
    amount: 14.99,
    category: 'Subscriptions',
    note: 'Streaming Service',
    date: '2026-09-15T08:12:00Z',
  },
];

function isInflow(type: Transaction['type']) {
  return type === 'income' || type === 'sell';
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function TransactionHistory({
  transactions = MOCK_TRANSACTIONS,
  title = 'Recent Transactions',
}: TransactionHistoryProps) {
  return (
    <View className="gap-2">
      <Text className="text-h3 font-semibold text-text-primary">{title}</Text>

      <View className="overflow-hidden rounded-3xl border border-border bg-background-elevated">
        {transactions.map((transaction, index) => {
          const inflow = isInflow(transaction.type);
          const displayTitle = transaction.note ?? transaction.asset;

          return (
            <View
              key={transaction.id}
              className={`flex-row items-center gap-3 px-4 py-3 ${
                index !== transactions.length - 1 ? 'border-b border-border' : ''
              }`}>
              <View className="h-11 w-11 items-center justify-center rounded-full bg-background-elevated-hover">
                <Text className="text-body font-semibold text-text-secondary">
                  {displayTitle.charAt(0).toUpperCase()}
                </Text>
              </View>

              <View className="flex-1">
                <Text className="text-body font-medium text-text-primary" numberOfLines={1}>
                  {displayTitle}
                </Text>
                <Text className="text-caption text-text-muted">
                  {transaction.category ?? 'Uncategorized'} · {formatDate(transaction.date)}
                </Text>
              </View>

              <Text
                className={`text-body font-semibold ${
                  inflow ? 'text-gain-strong' : 'text-loss-strong'
                }`}>
                {inflow ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
