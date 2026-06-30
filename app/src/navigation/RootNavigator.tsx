import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../theme/tokens";
import { TabBar } from "./TabBar";
import { HomeScreen } from "../screens/HomeScreen";
import { RecipesScreen } from "../screens/RecipesScreen";
import { GroceryScreen } from "../screens/GroceryScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { WheelResultScreen } from "../screens/WheelResultScreen";
import { ScanScreen } from "../screens/ScanScreen";
import { RecipeDetailScreen } from "../screens/RecipeDetailScreen";
import { RestaurantsScreen } from "../screens/RestaurantsScreen";
import { QuizScreen } from "../screens/QuizScreen";
import type { RootStackParamList, RootTabParamList } from "./types";

/**
 * Каркас навигации MVP (соответствует docs/navigation.md, мост fun → utility).
 * Tabs (5 слотов, кастомный TabBar) внутри корневого Stack с глубокими экранами.
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={RecipesScreen} />
      <Tab.Screen name="Cart" component={GroceryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: colors.primary,
          headerStyle: { backgroundColor: "#fff" },
          headerTitleStyle: { color: colors.text },
          contentStyle: { backgroundColor: "#fff" },
        }}
      >
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="WheelResult"
          component={WheelResultScreen}
          options={{ title: "Результат" }}
        />
        <Stack.Screen
          name="RecipeDetail"
          component={RecipeDetailScreen}
          options={{ title: "Рецепт" }}
        />
        <Stack.Screen name="ScanPhoto" component={ScanScreen} options={{ title: "Скан" }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: "Квиз" }} />
        <Stack.Screen
          name="Restaurants"
          component={RestaurantsScreen}
          options={{ title: "Рестораны" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
