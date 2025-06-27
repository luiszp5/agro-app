import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  if (theme === 'light') {
    return props.light ?? Colors.light[colorName];
  } else {
    return props.dark ?? Colors.dark[colorName];
  }
}
