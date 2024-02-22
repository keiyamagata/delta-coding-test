import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import StyledText from './StyledText';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#404040' : '#262626',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
        },
      ]}
    >
      <StyledText content={title} />
    </Pressable>
  );
};

const style = StyleSheet.create({
  button: {
    borderRadius: 100,
  },
});

export default CustomButton;
