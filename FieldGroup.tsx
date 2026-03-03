import * as React from 'react';
import { useEffect } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const FIELD_HEIGHT = 48;
const BACKGROUND_COLOR = '#f2f2f7';
const BORDER_COLOR = '#c6c6c8';
const BORDER_RADIUS = 10;

type Props = {
  animateHeight?: boolean;
  children?: React.ReactNode;
  fields?: React.ReactNode[];
  style?: StyleProp<ViewStyle>;
};

const getFieldHeight = (count: number) =>
  FIELD_HEIGHT * count + StyleSheet.hairlineWidth * (count - 1);

export function FieldGroup({
  animateHeight = false,
  children,
  fields,
  style,
}: Props) {
  const filteredFields = (fields ?? []).filter(Boolean);
  const filteredFieldCount = filteredFields.length;
  const fieldGroupHeight = useSharedValue(getFieldHeight(filteredFieldCount));

  useEffect(() => {
    fieldGroupHeight.value = getFieldHeight(filteredFieldCount);
  }, [filteredFieldCount, fieldGroupHeight]);

  const animatedFieldGroupHeight = useAnimatedStyle(() => ({
    height: withTiming(fieldGroupHeight.value, { duration: 200 }),
  }));

  if (fields && fields.length === 0) {
    return null;
  }

  return (
    <Animated.View
      style={[
        {
          overflow: 'hidden',
          borderRadius: BORDER_RADIUS,
          backgroundColor: BACKGROUND_COLOR,
        },
        animateHeight ? animatedFieldGroupHeight : undefined,
        style,
      ]}
    >
      {filteredFields.map((field, index) => (
        <View
          key={index}
          style={{
            borderBottomWidth:
              index === filteredFields.length - 1
                ? 0
                : StyleSheet.hairlineWidth,
            borderColor: BORDER_COLOR,
          }}
        >
          {field}
        </View>
      ))}
      {children}
    </Animated.View>
  );
}
