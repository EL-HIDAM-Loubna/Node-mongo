const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {
    console.log('connected correctly to server');
    const db = client.db(dbname);
    
    dboper.insertDocument(db,{name:"vadonut", description:"Test"}, 'dishes')
    .then((result) => {
        console.log('Insert Document:\n', result.ops);
        return dboper.findDocuments(db, 'dishes')})
    .then((docs) => {
        console.log('Found Document:\n',docs);
        return dboper.updateDocument(db, {name: "vadonut"},{description: "Updated Test"},'dishes')})
    .then((result) => {
        console.log('Updated Document:\n',result.result);
        return dboper.findDocuments(db, 'dishes') })
    .then((docs) => {
        console.log('Found Document:\n',docs);
        return db.dropCollection('dishes') })
    .then((result) => {
        console.log('droped collection : ', result);
        client.close();
    })
    .catch((err)=> console.log(err));
})
.catch((err)=> console.log(err));
