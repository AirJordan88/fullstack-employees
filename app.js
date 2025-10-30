import express from "express";
import employeesRouter from "./api/employees.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// Employees routes
app.use("/employees", employeesRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});

export default app;
