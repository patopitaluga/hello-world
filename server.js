import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World ' + process.env.DATABASE_URL);
});

app.listen((process.env.PORT || 3000), () => {
  console.log('App listening on port ' + (process.env.PORT || 3000));
});
