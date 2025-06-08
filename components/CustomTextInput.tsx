import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Colors } from "@/constants/Colors";

type Props = {
  placeholder?: string;
  label?: string;
  borderColor?: keyof typeof Colors["light"];
  backgroundColor?: keyof typeof Colors["light"];
  multiline?: boolean;
  numberOfLines?: number;
  minHeight?: number;
} & TextInputProps;

export function CustomTextInput({
  placeholder,
  label,
  borderColor,
  backgroundColor,
  multiline = false,
  numberOfLines = 1,
  minHeight,
  style,
  ...rest
}: Props) {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: borderColor ? colors[borderColor] : colors.texte,
            backgroundColor: backgroundColor ? colors[backgroundColor] : colors.fondInput,
            color: colors.texte,
            shadowColor: colors.ombre,
            minHeight: multiline ? (minHeight || 100) : undefined,
            textAlignVertical: multiline ? 'top' : 'center',
          },
          style,
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.texte + '80'}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
  input: {
    borderWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,

    // Ombre iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Ombre Android
    elevation: 3,
  },
});