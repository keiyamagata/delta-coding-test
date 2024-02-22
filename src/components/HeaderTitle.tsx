import React from 'react';
import { View, Image } from 'react-native';
import StyledText from './StyledText';

type HeaderTitleProps = {
  id: string;
  name: string;
  code: string;
};

const HeaderTitle: React.FC<HeaderTitleProps> = ({ id, name, code }) => {
  return (
    <View className="flex-row items-center">
      <Image
        source={{
          uri: `https://delta.app/images/${id}/icon-64.png`,
        }}
        style={{ width: 24, height: 24 }}
      />
      <StyledText content={code} customClass="pl-2 text-lg font-bold" />
    </View>
  );
};

export default HeaderTitle;
