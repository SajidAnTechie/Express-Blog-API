const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const middleware = require("./middleware/middleware");
const usersRouter = require("./routes/user");
const loginUser = require("./routes/auth");
const projectRouter = require("./routes/project");
const connectDB = require("./config/db");
const app = express();

dotenv.config({ path: "./config/config.env" });

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Mongo database connection is established"));

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", usersRouter);
app.use("/api/v1/auth", loginUser);
app.use("/api/v1/project", projectRouter);
app.use(middleware.unknownEndpoints);
app.use(middleware.errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
);
