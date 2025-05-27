//////////////////// 10

// 1) Create expenses CRUD using Express js.

// 2) Add pagination feature, /expenses?page=1&take=30, your server should be return 30 default.

// 3) You should add validation to delete expense. The expense should be deleted by
//  user who pass some secret key from the headers, like secret=random123.

// 4) Handle errors, if user does not pass key, or if user want to delete non existing expense.
// use FS module and Express js. expenses info should be saved in expenses.json file.

//////////////////// 11

// 1) Craete routes and grouped all expenses into routes.

// 2) Add services file where you write all logics.

// 3) Create a middleware and add this middleware on delete route.
//  check if you does not provided some key from headers, throw errors.

// 4) Create a middleware that add craete expense route and check if user pass
// all required fields, otherwise throw errors.

// 5) Create a /random-fact route that returs some random fact about anything that you want,
//  create a middleware that adds to random route and randomly half of request blocks and half of requests pass.
