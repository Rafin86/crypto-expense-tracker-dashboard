import { Text, View } from 'react-native';

import type { Transaction } from '@/types/transaction';
import { formatCurrency } from '@/utils/format-currency';

export type TransactionHistoryProps = {
  transactions: Transaction[];
  title?: string;
};

function isInflow(type: Transaction['type']) {
  return type === 'income' || type === 'sell';
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function TransactionHistory({
  transactions,
  title = 'Recent Transactions',
}: TransactionHistoryProps) {
  return (
    <View className="gap-2">
      <Text className="text-h3 font-semibold text-text-primary">{title}</Text>

      <View className="overflow-hidden rounded-3xl border border-border bg-background-elevated">
        {transactions.length === 0 && (
          <Text className="px-4 py-6 text-center text-bodySmall text-text-muted">
            No transactions yet.
          </Text>
        )}
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
