import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import HeaderTitle from './src/components/HeaderTitle';

// Tanstack query client for whole app
const queryClient = new QueryClient();

// React navigation TS configuration
export type StackParamsProps = {
  Overview: undefined;
  Details: {
    id: string;
    name: string;
    code: string;
    price: number;
    rank: number;
    marketCap: number;
    change1h: number;
    change24h: number;
    change7d: number;
    volume24h: number;
  };
};

const Stack = createNativeStackNavigator<StackParamsProps>();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Overview"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#171717',
            },
            headerTitleStyle: {
              color: '#fafafa',
            },
          }}
        >
          <Stack.Screen
            name="Overview"
            options={{ headerShown: true }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Details"
            options={({ route }) => ({
              headerTitle: () => (
                <HeaderTitle
                  id={route.params.id}
                  name={route.params.name}
                  code={route.params.code}
                />
              ),
            })}
            component={DetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
