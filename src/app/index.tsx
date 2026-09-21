import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BalanceCard } from '@/components/dashboard/balance-card';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { TransactionHistory } from '@/components/transactions/transaction-history';
import { BottomTabInset, MaxContentWidth } from '@/constants/theme';
import { useTransactionTotals } from '@/hooks/use-transaction-totals';
import { useTransactionStore } from '@/store/use-transaction-store';

export default function HomeScreen() {
  const transactions = useTransactionStore((state) => state.transactions);
  const { balance } = useTransactionTotals();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="w-full gap-6 self-center px-4 py-6"
        contentContainerStyle={{ maxWidth: MaxContentWidth, paddingBottom: BottomTabInset + 24 }}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text className="text-caption font-medium uppercase tracking-widest text-text-secondary">
            Welcome back
          </Text>
          <Text className="text-h1 font-bold text-text-primary">Dashboard</Text>
        </View>

        <BalanceCard balance={balance} />
        <QuickActions />
        <TransactionHistory transactions={transactions} />
      </ScrollView>
    </SafeAreaView>
  );
}
