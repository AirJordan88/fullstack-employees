import express from "express";
import { getEmployees } from "../db/queries/employees.js";

const router = express.Router();
export default router;

// GET /employees -> return all employees
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees", error);
    next(error);
  }
});
