import mongoose from "mongoose";

const mongodbURI =
  "mongodb+srv://anithaavk_db_user:7nvizONXQMsXL6im@democluster.vtof4zx.mongodb.net/UsersDB?retryWrites=true&w=majority&appName=democluster";
const connectDB = () => {
  mongoose
    .connect(mongodbURI)
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch((err) => {
      console.log("error connecting to mongodb", err);
    });
};
export default connectDB;