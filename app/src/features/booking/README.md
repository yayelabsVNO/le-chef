# Подсистема: Бронь шефа (Occasion / Book the Chef)

Точка расширения для бронирования. Отдельная подсистема — повод (occasion) и
бронь шефа развиваются независимо от рецептов.

- Экраны: `Occasion`, `BookChef`, `BookingFlow` (см. navigation/types.ts).
- API: `GET /occasions`, `POST /bookings`.
- Поводы: Business Meeting / Partner / Friends / Company.
- Ветки повода: «готовить дома» → MakeYourOwnDinner; «выбрать место» → Restaurants;
  «позвать шефа» → BookingFlow; «шеф онлайн».

**Оплата:** через внешнего провайдера; данные карт на нашей стороне НЕ храним
(провайдер — TODO, см. api-contract.md). backend-dev фиксирует выбор отдельным ADR.
