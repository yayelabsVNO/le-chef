# Подсистема: Игры (Spin the Wheel + Quiz)

Точка расширения геймификации. Намеренно изолирована, чтобы развивать колесо и
квиз отдельно от утилитарной части (рецепты/корзина).

**Инвариант (см. docs/navigation.md):** любой результат колеса/квиза обязан
содержать ссылку «дальше в дело» — рецепт, скан, корзину или бронь. Тупиков нет.

- Экраны: `SpinTheWheel`, `WheelResult`, `Quiz`, `QuizFlow`, `QuizResult` (см. navigation/types.ts).
- API: `GET /wheel/options`, `POST /wheel/spin`, `GET /quiz`, `POST /quiz/submit`.
- Результаты пишутся в `useProfile().preferences` и улучшают `Recommendations`.

Реализация экранов — frontend-dev; серверная логика — backend-dev.
