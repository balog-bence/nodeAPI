const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');

fs.open('adat.db', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
});

const db = new sqlite3.Database("./adat.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
  
    console.log("A csatlakozás sikeres!");
  });
  
db.run('CREATE TABLE adatok(id INTEGER PRIMARY KEY AUTOINCREMENT, event TEXT NOT NULL, date TEXT NOT NULL, city TEXT NOT NULL , venue TEXT UNIQUE NOT NULL, ticket TEXT NOT NULL)');

