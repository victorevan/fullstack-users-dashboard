const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

require('./config/middleware')(app, express)

app.use((req, res, next) => {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

app.listen(8000, () => console.log('listening on 8000'))