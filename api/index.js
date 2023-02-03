const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const usersRouter = require('./Routes/users.routes');
const promptsRouter = require('./Routes/prompts.routes');
const { connect: connectToDB } = require('./DB/connect.db');

connectToDB();
const app = express();
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello API!');
});

app.listen(port, () => {
  console.log('App is listening on port', port);
});

app.use('/users', usersRouter);
app.use('/prompts', promptsRouter);
