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