import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetCoins = () => {
  const getCoins = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(
      `https://api.getdelta.io/web/coins?page[number]=${pageParam}&page[size]=16`
    );
    return { data: data.data, nextPage: pageParam + 1 };
  };

  return useInfiniteQuery(['coins'], getCoins, {
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length < 10) return undefined;
      return lastPage.nextPage;
    },
  });
};
