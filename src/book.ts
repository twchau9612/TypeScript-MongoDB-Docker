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