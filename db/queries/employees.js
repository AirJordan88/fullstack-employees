import db from "../client.js";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  try {
    const sql = `
      INSERT INTO employees (name, birthday, salary)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, birthday, salary];
    const { rows } = await db.query(sql, values);
    console.log("New Employee Added", rows[0]);
    return rows[0];
  } catch (error) {
    console.error("Error creating employee", error);
    throw error;
  }
}

/** @returns all employees */
export async function getEmployees() {
  const { rows } = await db.query(`SELECT * FROM employees ORDER BY id`);
  return rows;
}

/** @returns the employee with the given id, or undefined if not found */
export async function getEmployee(id) {
  const { rows } = await db.query(`SELECT * FROM employees WHERE id = $1`, [
    id,
  ]);
  return rows[0];
}

/** @returns the updated employee with the given id, or undefined if not found */
export async function updateEmployee({ id, name, birthday, salary }) {
  const { rows } = await db.query(
    `
    UPDATE employees
    SET name = $2, birthday = $3, salary = $4
    WHERE id = $1
    RETURNING *;
    `,
    [id, name, birthday, salary]
  );
  return rows[0];
}

/** @returns the deleted employee with the given id, or undefined if not found */
export async function deleteEmployee(id) {
  const { rows } = await db.query(
    `
    DELETE FROM employees
    WHERE id = $1
    RETURNING *;
    `,
    [id]
  );
  return rows[0];
}
