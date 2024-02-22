import React from 'react';
import { Text } from 'react-native';

type StyledTextProps = {
  content: string;
  customClass?: string;
};

const StyledText: React.FC<StyledTextProps> = ({ content, customClass }) => {
  return <Text className={`text-neutral-100 ${customClass}`}>{content}</Text>;
};

export default StyledText;
