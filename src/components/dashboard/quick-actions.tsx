import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { Theme } from '@/constants/theme';
import { useTransactionStore } from '@/store/use-transaction-store';

export type QuickAction = {
  id: string;
  label: string;
  /** Placeholder glyph — swap for a real icon component later. */
  icon: string;
};

export type QuickActionsProps = {
  actions?: QuickAction[];
  onActionPress?: (action: QuickAction) => void;
};

const DEFAULT_ACTIONS: QuickAction[] = [
  { id: 'add-expense', label: 'Add Expense', icon: '➕' },
  { id: 'receive', label: 'Receive', icon: '⬇' },
  { id: 'transfer', label: 'Transfer', icon: '⇄' },
  { id: 'analytics', label: 'Analytics', icon: '📊' },
];

export function QuickActions({ actions = DEFAULT_ACTIONS, onActionPress }: QuickActionsProps) {
  const [isAddExpenseOpen, setAddExpenseOpen] = useState(false);
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const parsedAmount = Number(amount);
  const canSubmit = note.trim().length > 0 && Number.isFinite(parsedAmount) && parsedAmount > 0;

  function handlePress(action: QuickAction) {
    if (action.id === 'add-expense') {
      setAddExpenseOpen(true);
    }
    onActionPress?.(action);
  }

  function handleClose() {
    setAddExpenseOpen(false);
    setNote('');
    setAmount('');
  }

  function handleSubmit() {
    if (!canSubmit) return;

    addTransaction({
      type: 'expense',
      asset: 'USD',
      amount: parsedAmount,
      category: 'Other',
      note: note.trim(),
      date: new Date().toISOString(),
    });

    handleClose();
  }

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-3 px-1">
        {actions.map((action) => (
          <Pressable
            key={action.id}
            onPress={() => handlePress(action)}
            className="items-center gap-2 rounded-2xl border border-border bg-background-elevated px-5 py-4 active:bg-background-elevated-hover">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-accent/15">
              <Text className="text-h3">{action.icon}</Text>
            </View>
            <Text className="text-bodySmall font-medium text-text-primary">{action.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Modal visible={isAddExpenseOpen} transparent animationType="fade" onRequestClose={handleClose}>
        <View className="flex-1 items-center justify-center bg-black/60 px-6">
          <View className="w-full max-w-sm gap-4 rounded-3xl border border-border-strong bg-background-elevated p-6">
            <Text className="text-h3 font-semibold text-text-primary">Add Expense</Text>

            <View className="gap-1">
              <Text className="text-caption text-text-secondary">Description</Text>
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="e.g. Grocery Store"
                placeholderTextColor={Theme.colors.text.muted}
                className="rounded-xl border border-border bg-background px-3 py-2 text-body text-text-primary"
              />
            </View>

            <View className="gap-1">
              <Text className="text-caption text-text-secondary">Amount (USD)</Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor={Theme.colors.text.muted}
                keyboardType="decimal-pad"
                className="rounded-xl border border-border bg-background px-3 py-2 text-body text-text-primary"
              />
            </View>

            <View className="mt-2 flex-row gap-3">
              <Pressable
                onPress={handleClose}
                className="flex-1 items-center rounded-xl border border-border py-3">
                <Text className="text-body font-medium text-text-secondary">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleSubmit}
                disabled={!canSubmit}
                className="flex-1 items-center rounded-xl bg-loss py-3 disabled:opacity-40">
                <Text className="text-body font-semibold text-text-primary">Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
