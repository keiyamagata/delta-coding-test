import React from 'react';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
import StyledText from '../components/StyledText';

import type { CoinsProps } from '../types/coins.types';
import type { StackParamsProps } from '../../App';
import { formatCurrency } from '@coingecko/cryptoformat';

type ListItemProps = {
  item: CoinsProps;
  handleClickCoin: ({ id, name }: StackParamsProps['Details']) => void;
};

const ListItem: React.FC<ListItemProps> = ({ item, handleClickCoin }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        handleClickCoin({
          id: item.id,
          name: item.name,
          code: item.dirtyCode,
          price: item.priceInUSD,
          rank: item.marketCapRank,
          marketCap: item.marketCapInUSD,
          change1h: item.percentChange1h,
          change24h: item.percentChange24h,
          change7d: item.percentChange7d,
          volume24h: item.volume24hInUSD,
        })
      }
    >
      <View className="py-3 flex-1 flex-row items-center justify-between border-b border-neutral-600">
        <View className="flex-1 flex-row items-center gap-2">
          <Image
            source={{
              uri: `https://delta.app/images/${item.id}/icon-64.png`,
            }}
            style={{ width: 32, height: 32 }}
          />
          <View>
            <StyledText content={item.name} customClass="font-bold text-lg" />
            <StyledText content={item.dirtyCode} customClass="text-xs" />
          </View>
        </View>
        <View>
          <StyledText content={formatCurrency(item.priceInUSD, 'USD')} />
          <StyledText
            content={`${item.percentChange1h.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}%`}
            customClass={`text-right ${
              item.percentChange1h < 0 ? 'text-red-500' : 'text-green-500'
            }`}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ListItem;
