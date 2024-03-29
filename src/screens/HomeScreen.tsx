import React, { useEffect } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import ListItem from '../components/ListItem';

import { useGetCoins } from '../hooks/useCoins';
import { useIsFocused } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { StackParamsProps } from '../../App';
import StyledText from '../components/StyledText';
import CustomButton from '../components/CustomButton';

type HomeScreenProps = NativeStackScreenProps<StackParamsProps, 'Overview'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
    isLoading,
    isError,
  } = useGetCoins();

  const flattenData = data?.pages.flatMap((page) => page.data);

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleClickCoin = (coinDetails: StackParamsProps['Details']) =>
    navigation.navigate('Details', coinDetails);

  // Refetch data after going back to overview page
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  return (
    <View className="bg-neutral-900 flex-1 px-4">
      {isError && (
        <View className="flex-1 items-center justify-center">
          <StyledText content="Something went wrong..." customClass="mb-4" />
          <CustomButton title="Retry" onPress={() => refetch()} />
        </View>
      )}
      {isRefetching || isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
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
      )}
    </View>
  );
};

export default HomeScreen;
