# total-recall-backend

//'language' -> 'Hello it is ...' -> [привет, пока, гавно] // привет/пока/гавно
//'language' -> 'World it is ...' -> [мир] // знаю/не знаю
//'javascript' -> 'Hello world it is ...' -> [Такая то хуйня] // знаю/не знаю

//	Админка
//// Получение групп повторялок
//// Получение, создание, редактирование и удаление повторялок
//// Статистика(?)
// 	Приложение
////	Необходимость привязки устройства(?)
////	Отправка настройки
////	Запрашивать группы с количеством
////	Запрашивать повторялки по группам(? полновесные для работы офлайн)
////	Сокет соединение для обновления количества в группах(? авто дополнения повторялок непосредственно в группах, через запрос отдельной модели)
////	Отправка пройденых повторялок(? сохранение офлайн)
//	Сервер
////	socket подключение, оправка обновлений
////	find,create(update) настроик
////	find группы с количеством(? сделаем тупо на сокетах)
////	find повторялки по группам
////	update пройденых повторялок
////
////	При подключение сокета timeout c проверкой количества повторялок с последуюшим сортом на группы(с запоминанием предидущего значения чтобы сокет не нагружать)
////хорошебы использовать хеширование ответа для сравнивания изменения(должна быть сортировка)
