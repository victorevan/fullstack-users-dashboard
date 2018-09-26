const bodyParser = require('body-parser')

// NOTE: check out Express Documentation if not familiar with how to setup routes, but a lot is ready for you.
module.exports = (app, express) => {
  const userRouter = express.Router()

  app.use(bodyParser.urlencoded({extended : true}))
  app.use(bodyParser.json())
  app.use(express.static(__dirname))

  // Add the RESTful URL convention to namespace the User route.
  // A very basic example could be: '/user', but there are more meaningful ways to represent an API route.
  const userUrl = '/'

  // YOUR CODE GOES HERE, SETUP A ROUTE TO RETRIEVE ALL USERS

  app.use(userUrl, userRouter)

  return app
}