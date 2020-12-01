const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
        assert.equal(err,null);
        console.log('connected correctly to server');

        const db = client.db(dbname);
        dboper.insertDocument(db,{name:"vadonut", description:"Test"}, 'dishes', (result) => {
                 console.log('Insert Document:\n', result.ops);
                 dboper.findDocuments(db, 'dishes', (docs) => {
                     console.log('Found Document:\n',docs);
                     dboper.updateDocument(db, {name: "vadonut"},{description: "Updated Test"},'dishes',(result) => {
                         console.log('Updated Document:\n',result.result);
                         dboper.findDocuments(db, 'dishes', (docs) => {
                            console.log('Found Document:\n',docs);
                            db.dropCollection('dishes', (result) => {
                               console.log('droped collection : ', result);
                               client.close();
                            });
                         });
                     });
                 });

        });

});
