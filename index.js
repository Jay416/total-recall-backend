'use strict';

let app = require('koa')();
let router = require('koa-router')();

let MongoClient = require('mongodb')
  .MongoClient;

let a = () =>{'aaa'};
a();

let Promise = require('bluebird');
let connect = connectDb('mongodb://jinc:1234@ds031647.mongolab.com:31647/server');
// function getNextSequence(db, name) {
// 	let ret = db.collection('counters_' + name).findAndModify(
// 		{
// 			query: { _id: name },
// 			update: { $inc: { seq: 1 } },
// 			new: true
// 		}
// 	);
// 	console.log(ret);//jinc
// 	return ret.seq;
// }

function slip(time, callback) {
  setTimeout(function () {
    callback(null, {
      text: 'wake up'
    });
  }, time);
}

// function *channel () {
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
// let gen = channel()
// console.log(gen.next(111));
// console.log(gen.next(222));
// console.log(gen.next(333));

function connectDb(url) {
  let promise = new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, database) {
      if (err) return reject(err);
      console.log('Connected correctly to server');
      resolve(database);
    });
  });
  return promise;
}

app.use(function *(next) {
  this.set('Access-Control-Allow-Origin', '*');
  this.start = Date.now();
  yield next;
});

router.get('/', function *(next) {
  this.body = 'Remember all :)';
  yield next;
});

// router.get('/api/settings', function*(next) {
// 	yield next;
// });
// router.post('/api/settings', function*(next) {
// 	yield next;
// });

router.get('/api/remembers', function *(next) {
  this.status = 200;
  yield next;
});
router.get('/api/remembers/:id', function *(next) {
  this.status = 200;
  yield next;
});
router.post('/api/remembers', function *(next) {
  let db = yield connect;
  this.request.body.date = Date.now();
  let remembersCollection = db.collection('remembers');
  let response = yield Promise.promisify(remembersCollection.insert, remembersCollection)(this.request.body);
  this.body = response.ops[0];
  // yield (callback) => slip(10000, callback);
  this.status = 200;
  yield next;
});
router.put('/api/remembers/:id', function *(next) {
  this.status = 200;
  yield next;
});
router.delete('/api/remembers/:id', function *(next) {
  this.status = 204;
  yield next;
});

router.put('/api/remembers/:id/answer', function *(next) {
  this.status = 200;
  yield next;
});

app.use(require('koa-bodyparser')());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(function *(next) {
  yield next;
  let ms = Date.now() - this.start;
  let body;
  try {
    body = JSON.stringify(this.body);
  } catch (e) {
    body = this.body;
  }
  console.log('%s %s - %s', this.method, body || '', this.url, ms + 'ms');
});

let server = module.exports = require('http')
  .createServer(app.callback());
let io = require('socket.io')(server);
io.on('connection', function (socket) {
  console.log('Connection socket');
  socket.on('disconnect', function () {
    console.log('Disconnect socket');
  });
});

server.listen(3000, function () {
  console.log('Application listening at %s', server.address().port);
});


// app.listen(3000);

// let markdown = require('markdown').parse;

// console.log(markdown( 'Hello.\n\n* This is markdown.\n* It is fun\n* Love it or leave it.' ));//jinc
