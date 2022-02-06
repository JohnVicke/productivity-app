import express from 'express';

const app = express();

const port = 4000;

app.get('/', (_req, res) => {
  res.send('hello world!');
});

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}!`);
});
