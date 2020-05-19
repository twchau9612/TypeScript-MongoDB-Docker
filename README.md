# Run the command below in order to install node.js in the first time
```bash
$ npm install
```

## 1. Setting up a MongoDB database with docker
```bash
$ docker pull mongo
$ docker run --name my_mongo -d -p 127.0.0.1:27017:27017 mongo
```

## 2. Setting up TypeScript project’s dependencies
### The `concurrently` library can run and rebuild if we make any changes and without having to go back into the command line.
```bash
$ npm init # entry point => app.js
$ npm install express @types/express mongoose @types/mongoose
$ npm install concurrently nodemon
```

## 3. Update the `scripts` in `package.json`
### Add the following `scripts` which can convert `typescript` automatically
#### `package.json`
```json
"scripts": {
    "watch-ts": "tsc -w",
    "watch-node": "nodemon dist/app.js",
    "watch": "concurrently -k -p \"[{name}]\" -n \"TypeScript, Node\" -c \"yello.bold, cyan.bold\" \"npm run watch-ts\" \"npm run watch-node\""
},
```

## 4. Run command to add `tsconfig.json`, replace content as below
```bash
$ npx tsc --init
```
#### `tsconfig.json`
```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5",
    "module": "commonjs",
    "outDir": "./dist",
    /* Strict Type-Checking Options */
    "strict": true,      
    "esModuleInterop": true,
    /* Source Map Options */
    "sourceRoot": "./src",
    "inlineSourceMap": true
  }           
}
```

## 5. Create `src/app.ts` and run `$ npm run watch`
### This start by creating a simple express based server which returns `Hello World` when running on `http://localhost:3000`
#### `app.ts`
```ts
import express from "express";

// Express APP config
const app = express();
app.use(express.json());
app.set("port", 3000);

// API Endpoints
app.get("/", function (req, res) {
    res.send("Hello World!");
});

const server = app.listen(app.get("port"), () => {
    console.log("App is running on http://localhost:%d", app.get("port"));
});  
```

## 6. Create `src/controllers/bookController.ts`
### Subsequently the functions in `bookController.ts` which wanted to expose
#### `bookController.ts`
```ts
import { Request, Response } from "express";

export let allBooks = (req: Request, res: Response) => {
    res.send("Returns all books");
};
  
export let getBook = (req: Request, res: Response) => {
    res.send("Returns get book");
};
  
export let deleteBook = (req: Request, res: Response) => {
    res.send("Returns delete book");
};
  
export let updateBook = (req: Request, res: Response) => {
    res.send("Returns update book");
};

export let addBook = (req: Request, res: Response) => {
    res.send("Returns add book");
};
```
### Then, map these functions up to a corresponding endpoint in `app.ts`
#### `app.ts`
```ts
import express from "express";
import * as bookController from "./controllers/bookController";

// Express APP config
const app = express();
app.use(express.json());
app.set("port", 3000);

// API Endpoints
app.get("/", function (req, res) {
    res.send("Hello World!");
});

// Map Book API Endpoints
app.get("/books", bookController.allBooks);
app.get("/book/:id", bookController.getBook);
app.post("/book", bookController.addBook);
app.put("/book/:id", bookController.updateBook);
app.delete("/book/:id", bookController.deleteBook);

const server = app.listen(app.get("port"), () => {
    console.log("App is running on http://localhost:%d", app.get("port"));
});
```
### You can use `Postman` request the response. 
```
{GET}: http://localhost:3000/books
{RESPONSE}: Returns all books

{POST}: http://localhost:3000/book
{RESPONSE}: Returns add book
...
```

## 7. Create `src/book.ts` and integrating with MongoDB
#### `book.ts`
```ts
import { connect, model, Schema } from "mongoose";

const uri: string = "mongodb://127.0.0.1:27017/typescript_mongodb_docker";

// Connect MongoDB
connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Successfully Connected MongoDB!")
  }
});

// Set Schema for Book
export const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true }
});

const Book = model("Book", BookSchema);
export default Book;
```
#### `bookController.ts`
```ts
import { Request, Response } from "express";
import Book from "./../book";

// We'll start with allBooks which will return
// every we have from our database
export let allBooks = (req: Request, res: Response) => {
  let books = Book.find((err: any, books: any) => {
    if (err) {
      res.send("Error!");
    } else {
      res.send(books);
    }
  });
};

export let getBook = (req: Request, res: Response) => {
  let book = Book.findById(req.params.id, (err: any, book: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(book);
    }
  });
};

export let deleteBook = (req: Request, res: Response) => {
  let book = Book.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Succesfully Deleted Book");
    }
  });
};

export let updateBook = (req: Request, res: Response) => {
  console.log(req.body);
  let book = Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: any, book: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Succesfully updated book!");
      }
    }
  );
};

export let addBook = (req: Request, res: Response) => {
  var book = new Book(req.body);
  console.log(req.body);
  console.log(book);
  book.save((err: any) => {
    if (err) {
      console.log(err)
      res.send(err);
    } else {
      console.log(book);
      res.send(book);
    }
  });
};
```

## 8. Try in `Postman`
### You can try in `Postman` requesting the response. 
```
{POST}: http://localhost:3000/book
{BODY}: {
          "title": "Book 1",
          "author": "Ivan Chau"
        }
{RESPONSE}: {
              "_id": "5ec3a6158abf6e02b4d0a912",
              "title": "Book 1",
              "author": "Ivan Chau",
              "__v": 0
            }
...
```
