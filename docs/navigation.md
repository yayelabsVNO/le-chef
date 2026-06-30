# Le Chef — карта навигации (с мостом fun → utility)

Стратегия: вход через игру, плавный спуск к утилите. Колесо и квиз на главной —
точка входа, но каждый их результат ведёт глубже в продукт.

Home
- Spin the Wheel -> WheelResult
    - "Готовить дома" -> RecipeDetail -> Grocery (добавить недостающее) -> Cart
    - "Что из наличия" -> ScanPhoto -> IngredientsDetected -> Recommendations
    - "Поесть вне дома" -> Restaurants (по кухне) / Occasion -> BookChef
- Quiz -> QuizFlow (mood / повод / время / диета)
    - ResultSet: 3-5 рецептов + 1 ресторан + опция "позвать шефа"
      (результат пишется в Profile -> улучшает Recommendations)
- Search / List of products -> TypeOfFood -> Ingredients -> Grocery -> Cart
- Scan photo -> IngredientsDetected -> Recommendations -> RecipeDetail
- Categories -> RecipeList
- Countries (карта + флаги) -> RecipeList(by country)
- My recepies / My favorites
- Restaurants (список + Map + Filters) -> RestaurantDetail
- Occasion (Business Meeting / Partner / Friends / Company)
    - Make food at home -> Make Your Own Dinner
    - Choose a place -> Restaurants
    - Book the Chef -> BookingFlow (Date)
    - Chef's online

Таб-бар (5 иконок): home, категории, центральная кнопка-лого, корзина, профиль.

Ключевые правила:
1. WheelResult и QuizResult обязаны вести в рецепт/корзину/бронь — без тупиков.
2. Регистрация лениво — только при сохранении (favorites/cart/booking).
3. Результаты игр и сканов пишутся в профиль и питают Recommendations.
4. Глубокие экраны достижимы и напрямую (Search/Scan), и через игру.
