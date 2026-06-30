import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../theme/tokens";
import { Placeholder } from "../screens/Placeholder";
import type { RootStackParamList, RootTabParamList } from "./types";

/**
 * Каркас навигации Le Chef (соответствует docs/navigation.md и types.ts).
 *
 * Структура: корневой Stack оборачивает Tabs (5 иконок) и все «глубокие»
 * экраны. Сейчас каждый экран — Placeholder; frontend-dev подменяет их на
 * реальные компоненты, НЕ меняя список маршрутов (контракт фиксируется здесь).
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

// Временные обёртки-заглушки. Реальные экраны добавляет frontend-dev.
const S = (title: string) => () => <Placeholder title={title} />;

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      {/* 5 иконок: home · категории · центральная кнопка-лого · корзина · профиль */}
      <Tab.Screen name="Home" component={S("Home")} />
      <Tab.Screen name="Categories" component={S("Categories")} />
      <Tab.Screen name="HomeHub" component={S("Hub / Игры")} />
      <Tab.Screen name="Cart" component={S("Cart")} />
      <Tab.Screen name="Profile" component={S("Profile")} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTintColor: colors.primary }}>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />

        {/* Игры (fun → utility) */}
        <Stack.Screen name="SpinTheWheel" component={S("Spin the Wheel")} />
        <Stack.Screen name="WheelResult" component={S("Wheel Result")} />
        <Stack.Screen name="Quiz" component={S("Quiz")} />
        <Stack.Screen name="QuizFlow" component={S("Quiz Flow")} />
        <Stack.Screen name="QuizResult" component={S("Quiz Result")} />

        {/* Готовка дома */}
        <Stack.Screen name="Search" component={S("Search")} />
        <Stack.Screen name="TypeOfFood" component={S("Type of Food")} />
        <Stack.Screen name="Ingredients" component={S("Ingredients")} />
        <Stack.Screen name="RecipeList" component={S("Recipe List")} />
        <Stack.Screen name="RecipeDetail" component={S("Recipe Detail")} />
        <Stack.Screen name="Grocery" component={S("Grocery")} />
        <Stack.Screen name="MakeYourOwnDinner" component={S("Make Your Own Dinner")} />

        {/* Распознавание */}
        <Stack.Screen name="ScanPhoto" component={S("Scan Photo")} />
        <Stack.Screen name="IngredientsDetected" component={S("Ingredients Detected")} />
        <Stack.Screen name="Recommendations" component={S("Recommendations")} />

        {/* Страны */}
        <Stack.Screen name="Countries" component={S("Countries")} />

        {/* Рестораны */}
        <Stack.Screen name="Restaurants" component={S("Restaurants")} />
        <Stack.Screen name="RestaurantDetail" component={S("Restaurant Detail")} />

        {/* Поводы и бронь шефа */}
        <Stack.Screen name="Occasion" component={S("Occasion")} />
        <Stack.Screen name="BookChef" component={S("Book the Chef")} />
        <Stack.Screen name="BookingFlow" component={S("Booking Flow")} />

        {/* Профиль */}
        <Stack.Screen name="MyRecipes" component={S("My Recepies")} />
        <Stack.Screen name="MyFavorites" component={S("My Favorites")} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
