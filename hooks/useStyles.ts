import { StyleSheet } from 'react-native';
import { useTheme } from '../app/context/ThemeContext';

export const makeStyles = <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  styles: (theme: ReturnType<typeof useTheme>) => T,
) => {
  return () => {
    const theme = useTheme();
    return StyleSheet.create(styles(theme));
  };
};
