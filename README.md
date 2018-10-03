# Full Stack Users Dashboard

By [Victor Evangelista](mailto:victorevangelista@protonmail.com)

[victorevan.com](victorevan.com)

## Instructions

1. Navigate to [repo](https://github.com/victorevan/fullstack-users-dashboard)
2. Clone locally using
  `git clone https://github.com/victorevan/fullstack-users-dashboard.git`
3. Install dependencies for both /client and /server directories using `yarn`
4. Start the dockerized database using `sudo yarn db-start`
5. Run /server tests using `yarn test`
6. Start the server and client by using `yarn start` within the corresponding directory
7. Navigate to app in [browser](http://localhost:8080)
8. Enjoy!


## Server Discussion

I used the following technologies: MongoDB, Mongoose, Express, Mocha, and Chai.

# Requirements

### Build a few routes for Users, where one queries all Users, and one
### that takes a string as the argument and looks up Users by that name.

These actions are handled by the `/api/users` route.
The client will receive all users by sending a `GET` request to `/api/users`.
To get a specific a user, the clients sends a `GET` request to `/api/users/:userId`.
The `:userId` query parameter will be used for retreiving the correct user.

## Bonuses

### Add pagination to retrieving users

The `/api/users/paginated` route handles sending paginated user data.
The response includes the `total` users found in the query, the `limit` of users per page,
the current `page`, the total `pages`, and of course the users found in the query in `docs`.

With this information, creating a paginated UI client-side is very simple.

### Make a RESTful route for users (delete, post, etc.)

As outlined by the `/server/routes/api.js` and `/server/test/functional_tests` files,
the RESTful API handles all CRUD operations with the following actions:

`/api/users` - GET (read), POST (create)
`/api/users/paginated` - GET (read)
`/api/users/:userId` - GET (read), PUT (update), DELETE (delete)

### Add a Dockerfile to create a Docker Image for this repo

I dockerized the mongod daemon process for ease of use.
The Dockerfile can be found at `/server/Dockerfile`.
The database can be initialized by running `sudo yarn db-start`.


## Client Discussion

I used the following main technologies: React, Redux, Redux Thunk, React-Redux, Normalizr,
React Router 4, Connected React Router, Styled Components, Semantic UI React, and ESLint.

I updated the React Starter configuration to use Webpack 4 and Babel 7 up from Webpack 3
and Babel 6. Webpack Hot Module Reloading proved very useful for the development environment.

# Requirements

### Build out a UI that will retrieve Users from the Node API on page load, and display them
### on the page, ensuring no duplicates appear. (fetch lib called 'Axios' available to use)

On initial page load, my app will retrieve Users from the RESTful Node API and display them.

This is done by the `Dashboard` container in the componentDidMount React Lifecycle event. Located at `/client/src/components/Dashboard/index.js`.

The `loadPaginatedData` function is passed the appropriate queries (initially none), and dispatches the `handlePaginationData` action creator. Located at `/client/src/actions/paginatedUsers.js`.

The `handlePaginationData` function returns a curried asynchronous function that is processed by the Redux Thunk middleware. The `showLoading` action creator is dispatched in order to facilitate rendering a loading bar. `getPaginationData` is an api utility function for retreiving pagination data and Users.

The `getPaginationData` function can be found at `/client/src/utils/api.js`. It uses the fetch API to retrieve data from the server's `/api/users/paginated` route, with optional parameters available for querying data. Once the promise is resolved, the `handlePaginationData` function continues.

`handlePaginationData`'s curried function dispatches the `receivePaginationData` action creator, passing it the data returned from the API. `receievePaginationData` is a synchronous action creator that will return the action type and normalized data to the Redux reducer. The `docs` property is an array of users that is normalized with `normalizr.js`. The schema used to normalize the data for the front end can be found at `/client/src/actions/userSchema.js`. This was done as a best practice when handling large amounts of data.

The `paginatedUsers` function is located at `/client/src/reducers/paginatedUsers.js`. It is a pure function, or in Redux terms a reducer that simply checks the type of action sent (`RECEIVE_PAGINATED_DATA`), and returns a new state with the pagination data included on the action object.

### On the subject of ensuring no duplicates appear

Initially, I filtered the duplicate user files on the front end. The utility helper function used for this is located at `/client/src/utils/helpers.js`. It is called `filterDuplicatesBy`. It filters an array of objects by a property. The property I used was the `name` property in order to remove duplicate users.

I then moved this function to run on initial load of the server instead, because the issue of duplicate users seems like more of a server side issue to me than a client side issue. The users are filtered before they are turned into MongoDB documents, and eliminates the possibility of showing false pagination data to the user. The code can be located on line 29 at `/server/server.js`.

### Add an input box and allow the ability to search the API (as you type) and have filtering reflected on the page.

The `SearchInput` component handles options for searching through users by name, role, location, type, or survey status. It is located at `/client/src/components/Dashboard/SearchInput.js`. The Dashboard container has a `handleFilterChange` method and a `handleSearch` method that take care of calling `loadPaginatedData` again, but this time with appropriate queries. The API utility function `getPaginationData` is equipped to handle stringifying these queries with the query-string library, and retrieving the appropriate data. The Redux state is updated, and the connected Dashboard container receives new normalized pagination data.

Thus, the ability to search live as you type and have filtering reflected on the page is created.

### Style it as you see fit, ideally make it responsive (Bootstrap and Semantic included)

I used Semantic UI to quickly scaffold a decent UI. Using Styled Components, I created custom styled versions of Semantic UI's components for making the UI responsive.

## Bonuses

### Add the ability to save a new User

This is handled by the `AddUser` component at the `/addUser` route. I created a form with controlled inputs that utilizes the API endpoint for creating a new User. It will alert the end user if there is an error creating the User, or redirect them to the user's dedicated page where edits can be made on the user on success. From there, the end user can also delete the User. There is no client side validation. it is all handled server side, but form validation could easily be implemented from the scaffolding already completed.

### Add tests to validate your work

I'm new to testing React, and also new to testing with Jest and Enzyme. However, I am definitely willing to learn! I already have experience with Mocha and Chai. You can see my BDD and TDD tests at `/server/test/functional_tests.js`.

### Add the user data to a table and allow sorting by name via clicking on a column

The `Table` component can be found at `/client/src/components/Dashboard/Table.js`. It is a custom styled Table component from Semantic UI React. Client side sorting of the users displayed on the current page is available by any property, including by name. This is handled by Table's `handleSort` method.

A server side approach to this would be sending a sort order as part of a paginated data request, causing a re-render with the appropriate sort, but I opted to do a client side approach. Any feedback on this would be appreciated.

### Add some animations/transitions to the page

I abstained from creating animations and transitions. You can however see my experience with handling animations with React on my website: `victorevan.com`.

Primarily, I use React CSS Transitions. However, I am currently learning to use a physics based React animation library called React Spring.
