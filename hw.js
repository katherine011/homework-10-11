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

//////////////////// 12

// 1) add image upload using multer and cloudinary

// 2) add validation to upload max 3 mb of image

// 3) when you edit image each expense you should delete prev image from cloudinary

// 4) when you delete expense you also should delete this image from clodinary.

//////////////////// 12

// 1) your expenses app should add EJS support.
// 2) you should have 4 page, all expenses, create new expanses, updateExpenses and details page.
// 3) you should display all expenses image in the dom.
// 4) you should add image upload feature in the create expenses page *.
// 5) you should delete images from cloudinary when you delete or update expense.

// HINT: how to send image from EJS
//  <form action="/upload" method="POST" enctype="multipart/form-data">
//     <input type="text" name="username" placeholder="Enter your name" required />
//     <input type="email" name="email" placeholder="Enter your email" required />
//     <input type="file" name="avatar" accept="image/*" required />
//     <button type="submit">Upload</button>
//   </form>
