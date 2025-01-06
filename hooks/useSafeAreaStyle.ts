import { useSafeAreaInsets } from "react-native-safe-area-context";

export function useSafeAreaStyle() {

  const insets = useSafeAreaInsets();

  return {
    marginTop: insets.top,
    marginBottom: insets.bottom,
    marginStart: insets.left,
    marginEnd: insets.right
  }
}