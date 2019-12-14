const app     = require('./server/server');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Application listening in port ', PORT));
