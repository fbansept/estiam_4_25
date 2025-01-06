import { useSafeAreaStyle } from "@/hooks/useSafeAreaStyle";
import { PropsWithChildren } from "react";
import { GestureResponderEvent, View, ViewStyle } from "react-native";

export function SafeAreaContainer({
  style,
  evenement,
  children
}: {
  style?: ViewStyle;
  evenement?: (event: GestureResponderEvent) => void;
} & PropsWithChildren) {
  const safeAreaStyle = useSafeAreaStyle();

  return (
    <View
      onTouchStart={evenement}
      style={[safeAreaStyle, { height: "100%" }, style]}
    >
      {children}
    </View>
  );
}
