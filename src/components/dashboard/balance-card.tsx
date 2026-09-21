import { Text, View } from 'react-native';

import { Theme } from '@/constants/theme';
import { formatCurrency } from '@/utils/format-currency';

export type BalanceCardProps = {
  /** Total balance to display. Defaults to a placeholder figure. */
  balance?: number;
  /** Signed percent change (e.g. 5.4 or -2.1). Drives the badge color/direction. */
  changePercent?: number;
  label?: string;
};

export function BalanceCard({
  balance = 14250.0,
  changePercent = 5.4,
  label = 'Total Balance',
}: BalanceCardProps) {
  const isPositive = changePercent >= 0;

  return (
    <View
      className="overflow-hidden rounded-3xl border border-border-strong p-6"
      style={{
        experimental_backgroundImage: `linear-gradient(135deg, ${Theme.colors.backgroundElevatedHover} 0%, ${Theme.colors.background} 70%)`,
      }}>
      <Text className="text-caption font-semibold uppercase tracking-widest text-text-secondary">
        {label}
      </Text>

      <Text className="mt-2 text-display font-bold text-text-primary">
        {formatCurrency(balance)}
      </Text>

      <View
        className={`mt-4 flex-row items-center gap-1 self-start rounded-full px-3 py-1 ${
          isPositive ? 'bg-gain-muted' : 'bg-loss-muted'
        }`}>
        <Text
          className={`text-bodySmall font-semibold ${
            isPositive ? 'text-gain-strong' : 'text-loss-strong'
          }`}>
          {isPositive ? '▲' : '▼'} {Math.abs(changePercent).toFixed(1)}% today
        </Text>
      </View>
    </View>
  );
}
