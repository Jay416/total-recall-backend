// var redis = require('redis').createClient(10321, 'scat.redistogo.com', {auth_pass: '3db12061079be7f44c934f7becd222f5'});

var redis = require('redis')
var client = redis.createClient(10321, "scat.redistogo.com");
client.auth("3db12061079be7f44c934f7becd222f5", function() {console.log("Connected!");});

client.flushdb();
client.set('test2', 123);
console.log(client.get('test'));//jinc