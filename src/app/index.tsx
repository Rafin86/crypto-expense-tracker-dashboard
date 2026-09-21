import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BalanceCard } from '@/components/dashboard/balance-card';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { TransactionHistory } from '@/components/transactions/transaction-history';
import { BottomTabInset, MaxContentWidth } from '@/constants/theme';

export default function HomeScreen() {
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

        <BalanceCard />
        <QuickActions />
        <TransactionHistory />
      </ScrollView>
    </SafeAreaView>
  );
}
