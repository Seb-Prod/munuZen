import { View, ViewProps, ViewStyle } from "react-native";
import React from "react";

type Props = ViewProps & {
  spacing?: number; // espace entre les enfants
  children: React.ReactNode;
};

export function Row({ style, spacing = 8, children, ...rest }: Props) {
  const childrenArray = React.Children.toArray(children);

  return (
    <View style={[rowStyle, style]} {...rest}>
      {childrenArray.map((child, index) => (
        <View
          key={index}
          style={{ marginRight: index !== childrenArray.length - 1 ? spacing : 0 }}
        >
          {child}
        </View>
      ))}
    </View>
  );
}

const rowStyle: ViewStyle = {
  marginHorizontal: 0,
  flexDirection: "row",
};