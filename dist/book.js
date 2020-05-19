"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = void 0;
var mongoose_1 = require("mongoose");
var uri = "mongodb://127.0.0.1:27017/typescript_mongodb_docker";
// Connect MongoDB
mongoose_1.connect(uri, function (err) {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log("Successfully Connected MongoDB!");
    }
});
// Set Schema for Book
exports.BookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true }
});
var Book = mongoose_1.model("Book", exports.BookSchema);
exports.default = Book;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vay5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImJvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQWtEO0FBRWxELElBQU0sR0FBRyxHQUFXLHFEQUFxRCxDQUFDO0FBRTFFLGtCQUFrQjtBQUNsQixrQkFBTyxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQVE7SUFDcEIsSUFBSSxHQUFHLEVBQUU7UUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMxQjtTQUFNO1FBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO0tBQy9DO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxzQkFBc0I7QUFDVCxRQUFBLFVBQVUsR0FBRyxJQUFJLGlCQUFNLENBQUM7SUFDbkMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQ3ZDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtDQUN6QyxDQUFDLENBQUM7QUFFSCxJQUFNLElBQUksR0FBRyxnQkFBSyxDQUFDLE1BQU0sRUFBRSxrQkFBVSxDQUFDLENBQUM7QUFDdkMsa0JBQWUsSUFBSSxDQUFDIn0=