const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello snail');
});

app.listen(port, () => {
  console.log('App is listening on port', port);
});

// Two sides: Account admin and account guest
// Account admin creates a schedule inquiry for guest to check out.
