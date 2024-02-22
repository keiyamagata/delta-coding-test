import React, { useState } from 'react';
import { View } from 'react-native';
import StyledText from '../components/StyledText';
import { formatCurrency } from '@coingecko/cryptoformat';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { StackParamsProps } from '../../App';
import CustomButton from '../components/CustomButton';

type DetailsScreenProps = NativeStackScreenProps<StackParamsProps, 'Details'>;

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const coin = route.params;
  const [priceChange, setPriceChange] = useState(coin.change1h);

  const buttons = [
    { title: '1H', value: coin.change1h },
    { title: '24H', value: coin.change24h },
    { title: '7D', value: coin.change7d },
  ];

  return (
    <View className="bg-neutral-900 flex-1 px-4">
      <View className="mt-4 mb-8">
        <StyledText content={coin.name} customClass="text-lg font-bold" />
        <StyledText
          content={formatCurrency(coin.price, 'USD')}
          customClass="text-3xl font-bold"
        />
        <StyledText
          content={`${priceChange.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}%`}
          customClass={`pt-2 ${
            priceChange < 0 ? 'text-red-500' : 'text-green-500'
          }`}
        />
        <View className="mt-4 flex-row justify-between">
          {buttons.map((button) => (
            <CustomButton
              key={button.title}
              title={button.title}
              onPress={() => setPriceChange(button.value)}
            />
          ))}
        </View>
      </View>

      <View>
        <StyledText
          content="Market Information"
          customClass="text-xl font-bold"
        />
        <View className="mt-6 mb-3 flex-row justify-between">
          <StyledText content="Market Rank" />
          <StyledText content={`No. ${coin.rank}`} />
        </View>
        <View className="mb-3 flex-row justify-between">
          <StyledText content="Market Cap" />
          <StyledText content={formatCurrency(coin.marketCap, 'USD')} />
        </View>
        <View className="flex-row justify-between">
          <StyledText content="Volume (24h)" />
          <StyledText content={formatCurrency(coin.volume24h, 'USD')} />
        </View>
      </View>
    </View>
  );
};

export default DetailsScreen;
