// Note: ; is optional in typescript (or javascript). But it is a good practice to use it.
// Note: When we are importing a file, we don't need to use the extension of the file

// We need to import the app from app.ts
// We need to do this in the top of out imports
import app from "./app";

// We need to validateEnv file here
import env from "./util/validateEnv";

// Importing the mongoose module
// This is same as import "mongoose/config" but we also get a shorthand called mongoose
import mongoose from "mongoose";

// We need to get the port from the environment variables
// process.env is an object that contains all the environment variables
// const port = process.env.PORT;
// We don't need to use the above line because we have already validated the environment variables
const port = env.PORT;

// Connecting to the database
// process.env is an object that contains all the environment variables
// .connect() returns a promise which is basically a function that will run in the future
// This is an asynchronous function
mongoose
  // We add a ! at the end of the variable to tell typescript that it is not a null value
  // Otherwise because there is a possibility that the value is null, typescript will throw an error
  .connect(env.MONGO_CONNECTION_STRING)
  // If the promise is successful, then we will run the following code
  .then(() => {
    console.log("Mongoose Connected");

    // This will start the server
    // It will listen to the port 4000
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  // If the promise is unsuccessful, then we will run the following code
  // console.error is same as console.log but it will be in red
  .catch(console.error);
