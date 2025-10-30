import express from "express";
import {
  getEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "../db/queries/employees.js";

// Helper function for stricter ID validation
function isValidId(idParam) {
  // Must be all digits, no decimals or exponents
  const id = Number(idParam);
  if (!/^\d+$/.test(idParam)) return false; // reject 1e10, 1.5, etc.
  if (!Number.isInteger(id) || id < 0) return false; // allow 0 as valid for 404 test
  return true;
}

const router = express.Router();

// === GET /employees ===
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
});

// === POST /employees ===
router.post("/", async (req, res) => {
  try {
    const { name, salary, birthday } = req.body || {};
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, salary, and birthday" });
    }
    if (!name || !salary || !birthday) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, salary, and birthday" });
    }

    const newEmployee = await createEmployee({ name, salary, birthday });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Failed to create employee" });
  }
});

// === GET /employees/:id ===
router.get("/:id", async (req, res) => {
  const { id: idParam } = req.params;

  if (!isValidId(idParam)) {
    return res.status(400).json({ error: "Invalid employee ID" });
  }

  const id = Number(idParam);
  const employee = await getEmployee(id);

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  res.status(200).json(employee);
});

// === PUT /employees/:id ===
router.put("/:id", async (req, res) => {
  const { id: idParam } = req.params;
  const { name, salary, birthday } = req.body || {};

  if (!isValidId(idParam)) {
    return res.status(400).json({ error: "Invalid employee ID" });
  }

  const id = Number(idParam);

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is required" });
  }

  if (!name || !salary || !birthday) {
    return res
      .status(400)
      .json({ error: "Missing required fields: name, salary, and birthday" });
  }

  const updated = await updateEmployee({ id, name, salary, birthday });
  if (!updated) {
    return res.status(404).json({ error: "Employee not found" });
  }

  res.status(200).json(updated);
});

// === DELETE /employees/:id ===
router.delete("/:id", async (req, res) => {
  const { id: idParam } = req.params;

  if (!isValidId(idParam)) {
    return res.status(400).json({ error: "Invalid employee ID" });
  }

  const id = Number(idParam);
  const deleted = await deleteEmployee(id);

  if (!deleted) {
    return res.status(404).json({ error: "Employee not found" });
  }

  res.status(204).send();
});

export default router;
