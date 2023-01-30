const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const usersRouter = require('./Routes/users.routes');
const promptsRouter = require('./Routes/prompts.routes');
const { auth: authMiddleware } = require('./Middleware/auth.middleware');
const { connect: connectToDB } = require('./DB/connect.db');
const { sendMail } = require('./Email/email');

connectToDB();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello snail');
});

app.listen(port, () => {
  console.log('App is listening on port', port);
});

app.use('/users', usersRouter);
app.use('/prompts', promptsRouter);
