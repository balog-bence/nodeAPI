const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors());

const db = new sqlite3.Database("./adat.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);

  console.log("A csatlakozás sikeres!");
});

app.get("/view", function (request, response) {
  const sql = 'SELECT * FROM adatok';
  var rows;
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row => {
      console.log(rows);
    }))
    response.send(rows);
  });

});

app.post('/hozzaadas/:param', function (request, response) {
  var data = request.params.param.split(';');

  const sql = "INSERT into adatok (event, date, city, venue, ticket) values ('" + data[0] + "', '" + data[1] + "', '" + data[2] + "', '" + data[3] + "', '" + data[4] + "')";
  console.log(sql);
  db.run(sql);
  console.log("Új esemény hozzáadva!");
});

app.post('/frissites/:param', function (request, response) {
  var data = request.params.param.split(';');
  const sql = "UPDATE adatok SET event='" + data[1] + "', date='" + data[2] + "', city='" + data[3] + "' , venue='" + data[4] + "', ticket='" + data[5] + "' WHERE id='" + data[0] + "'";
  console.log(sql);
  db.run(sql);
  console.log("Esemény frissítve, id: " + data[0]);

});

app.post('/torles/:param', function (request, response) {
  console.log("Törlés...");
  var data =request.params.param;
  const sql = "delete from adatok where id = "+data+"";
  console.log(sql);
  db.run(sql);
  console.log("Esemény törölve, id: " + data);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("A szerver sikeresen elindult!");
});