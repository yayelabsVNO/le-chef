/**
 * Мок-данные рецептов для MVP. Бэкенд пока не нужен — это временный источник.
 * Когда появится API (docs/api-contract.md → GET /recipes), экраны переключаются
 * на api-клиент без изменения вёрстки.
 *
 * Картинки — цветной плейсхолдер + эмодзи (RecipeImage), без сетевых ассетов.
 */

export interface MockIngredient {
  name: string;
  amount: string;
}

export interface MockRecipe {
  id: string;
  title: string;
  description: string;
  emoji: string; // плейсхолдер вместо фото
  color: string; // фон карточки-плейсхолдера
  minutes: number;
  ingredients: MockIngredient[];
  steps: string[];
}

export const RECIPES: MockRecipe[] = [
  {
    id: "pasta",
    title: "Pasta",
    description: "Кремовая паста с чесноком и пармезаном за 20 минут.",
    emoji: "🍝",
    color: "#FDE7D2",
    minutes: 20,
    ingredients: [
      { name: "Спагетти", amount: "200 г" },
      { name: "Сливки", amount: "150 мл" },
      { name: "Чеснок", amount: "2 зубчика" },
      { name: "Пармезан", amount: "40 г" },
      { name: "Оливковое масло", amount: "1 ст. л." },
      { name: "Соль, перец", amount: "по вкусу" },
    ],
    steps: [
      "Отварите спагетти в подсоленной воде до состояния al dente.",
      "Обжарьте измельчённый чеснок на оливковом масле 30 секунд.",
      "Влейте сливки, прогрейте, добавьте тёртый пармезан.",
      "Смешайте соус с пастой, приправьте солью и перцем.",
    ],
  },
  {
    id: "burger",
    title: "Burger",
    description: "Сочный говяжий бургер с плавленым сыром и соусом.",
    emoji: "🍔",
    color: "#FBE0C7",
    minutes: 25,
    ingredients: [
      { name: "Говяжий фарш", amount: "300 г" },
      { name: "Булочки", amount: "2 шт" },
      { name: "Сыр чеддер", amount: "2 ломтика" },
      { name: "Помидор", amount: "1 шт" },
      { name: "Салат", amount: "2 листа" },
      { name: "Соус бургер", amount: "2 ст. л." },
    ],
    steps: [
      "Сформируйте две котлеты из фарша, посолите и поперчите.",
      "Обжарьте котлеты по 3–4 минуты с каждой стороны.",
      "За минуту до готовности положите сыр, дайте расплавиться.",
      "Соберите бургер: булочка, соус, салат, котлета, помидор.",
    ],
  },
  {
    id: "pancakes",
    title: "Pancakes",
    description: "Пышные панкейки к завтраку с кленовым сиропом.",
    emoji: "🥞",
    color: "#FCEBD0",
    minutes: 15,
    ingredients: [
      { name: "Мука", amount: "200 г" },
      { name: "Молоко", amount: "250 мл" },
      { name: "Яйцо", amount: "1 шт" },
      { name: "Сахар", amount: "2 ст. л." },
      { name: "Разрыхлитель", amount: "1 ч. л." },
      { name: "Сливочное масло", amount: "20 г" },
    ],
    steps: [
      "Смешайте сухие ингредиенты, отдельно — молоко и яйцо.",
      "Соедините всё в гладкое тесто, дайте постоять 5 минут.",
      "Жарьте панкейки на сухой сковороде до золотистого цвета.",
      "Подавайте стопкой с маслом и кленовым сиропом.",
    ],
  },
  {
    id: "fried-pork",
    title: "Fried Pork",
    description: "Хрустящая свинина в панировке с золотой корочкой.",
    emoji: "🍖",
    color: "#F7DCC2",
    minutes: 30,
    ingredients: [
      { name: "Свиная вырезка", amount: "400 г" },
      { name: "Яйцо", amount: "1 шт" },
      { name: "Панировочные сухари", amount: "100 г" },
      { name: "Мука", amount: "50 г" },
      { name: "Растительное масло", amount: "для жарки" },
      { name: "Соль, перец", amount: "по вкусу" },
    ],
    steps: [
      "Нарежьте свинину на ломтики и слегка отбейте.",
      "Обваляйте в муке, затем в яйце, затем в сухарях.",
      "Обжарьте во фритюре до золотистой корочки.",
      "Выложите на бумажное полотенце, посолите.",
    ],
  },
  {
    id: "bibimbap",
    title: "Bibimbap",
    description: "Корейская миска с рисом, овощами, яйцом и соусом кочуджан.",
    emoji: "🍲",
    color: "#FBE3CC",
    minutes: 35,
    ingredients: [
      { name: "Рис", amount: "200 г" },
      { name: "Говядина", amount: "150 г" },
      { name: "Морковь", amount: "1 шт" },
      { name: "Шпинат", amount: "100 г" },
      { name: "Яйцо", amount: "2 шт" },
      { name: "Соус кочуджан", amount: "2 ст. л." },
    ],
    steps: [
      "Отварите рис и выложите в глубокую миску.",
      "Обжарьте говядину и овощи по отдельности.",
      "Сверху разложите овощи и мясо секторами.",
      "Добавьте яичницу-глазунью и соус кочуджан, перемешайте.",
    ],
  },
];

export const recipeById = (id: string): MockRecipe | undefined =>
  RECIPES.find((r) => r.id === id);

/** Заглушка распознавания фото: возвращает мок-список ингредиентов. */
export const MOCK_SCAN_RESULT = [
  { name: "Яйцо", confidence: 0.97 },
  { name: "Помидор", confidence: 0.93 },
  { name: "Сыр", confidence: 0.88 },
  { name: "Шпинат", confidence: 0.81 },
];
