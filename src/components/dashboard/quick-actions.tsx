import { Pressable, ScrollView, Text, View } from 'react-native';

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
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-3 px-1">
      {actions.map((action) => (
        <Pressable
          key={action.id}
          onPress={() => onActionPress?.(action)}
          className="items-center gap-2 rounded-2xl border border-border bg-background-elevated px-5 py-4 active:bg-background-elevated-hover">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-accent/15">
            <Text className="text-h3">{action.icon}</Text>
          </View>
          <Text className="text-bodySmall font-medium text-text-primary">{action.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
