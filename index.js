var app = require('koa')();
var router = require('koa-router')();

var MongoClient = require('mongodb').MongoClient;

var Promise = require('bluebird');
var connect = connectDb ('mongodb://jinc:1234@ds031647.mongolab.com:31647/server');
// function getNextSequence(db, name) {
// 	var ret = db.collection('counters_' + name).findAndModify(
// 		{
// 			query: { _id: name },
// 			update: { $inc: { seq: 1 } },
// 			new: true
// 		}
// 	);
// 	console.log(ret);//jinc
// 	return ret.seq;
// }

function slip (time, callback) {
	setTimeout(function () {
		callback(null, {text: 'wake up'});
	}, time);
}

// function* channel () {
// 	console.log('====0====');//jinc
// 	yield '==1==';
//   slip(2000, function () {
//   	console.log('=slip=');//jinc
//   })
//   console.log('====2====');//jinc
//   if(yield '==3=='){
//   	console.log('====4====');//jinc	
//   }
//   return 'done';
// }
// var gen = channel()
// console.log(gen.next(111));
// console.log(gen.next(222));
// console.log(gen.next(333));

function connectDb (url) {
	var promise = new Promise(function (resolve, reject) {
    MongoClient.connect(url, function(err, database) {
    	if(err) return reject(err);
		  console.log('Connected correctly to server');
		  resolve(database);
		});
  });
	return promise;
}

var start;
app.use(function*(next) {
  this.set('Access-Control-Allow-Origin', '*');
	start = Date.now();
	yield next;
});

router.get('/', function*(next) {
	this.body = 'Remember all :)';
	yield next;
});

// router.get('/api/settings', function*(next) {
// 	yield next;
// });
// router.post('/api/settings', function*(next) {
// 	yield next;
// });

router.get('/api/remembers', function*(next) {
	this.status = 200;
	yield next;
});
router.get('/api/remembers/:id', function*(next) {
	this.status = 200;
	yield next;
});
router.post('/api/remembers', function*(next) {
	var db = yield connect;
	this.request.body.date = Date.now();
	var remembersCollection = db.collection('remembers');
  var response = yield Promise.promisify(remembersCollection.insert, remembersCollection)(this.request.body);
  this.body = response.ops[0];
	// yield (callback) => slip(10000, callback);
	this.status = 200;
	yield next;
});
router.put('/api/remembers/:id', function*(next) {
	this.status = 200;
	yield next;
});
router.delete('/api/remembers/:id', function*(next) {
	this.status = 204;
	yield next;
});

router.put('/api/remembers/:id/answer', function*(next) {
	this.status = 200;
	yield next;
});

app.use(require('koa-bodyparser')());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(function*(next) {
	yield next;
	var ms = new Date - start;
	var body;
	try {
		body = JSON.stringify(this.body);
	} catch (e) {
		body = this.body;
	}
	console.log('%s %s - %s', this.method, body || '', this.url, ms + 'ms');
});

var server = module.exports = require('http').createServer(app.callback());
var io = require('socket.io')(server);
io.on('connection', function(connect) {
	console.log('Connection socket'); //jinc
	connect.on('disconnect', function() {
		console.log('Disconnect socket'); //jinc
	});
});

server.listen(3000, function() {
	console.log('Application listening at %s', server.address().port);
});


// app.listen(3000);

// var markdown = require('markdown').parse;

// console.log(markdown( 'Hello.\n\n* This is markdown.\n* It is fun\n* Love it or leave it.' ));//jinc

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