import React from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import ListItem from '../components/ListItem';

import { useGetCoins } from '../hooks/useCoins';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { StackParamsProps } from '../../App';

type HomeScreenProps = NativeStackScreenProps<StackParamsProps, 'Overview'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { data, hasNextPage, fetchNextPage } = useGetCoins();

  const flattenData = data?.pages.flatMap((page) => page.data);

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleClickCoin = (coinDetails: StackParamsProps['Details']) =>
    navigation.navigate('Details', coinDetails);

  return (
    <View className="bg-neutral-900 flex-1 px-4">
      <FlashList
        keyExtractor={(item) => item.id}
        data={flattenData}
        renderItem={({ item }) => (
          <ListItem item={item} handleClickCoin={handleClickCoin} />
        )}
        estimatedItemSize={100}
        onEndReached={loadNextPageData}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
};

export default HomeScreen;
