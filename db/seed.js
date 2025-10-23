import db from "./client.js";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  await createEmployee({
    name: "Harry",
    birthday: "1961-07-04",
    salary: 94000,
  });

  await createEmployee({
    name: "Marv",
    birthday: "1963-12-24",
    salary: 77000,
  });

  await createEmployee({
    name: "Kevin",
    birthday: "1988-10-10",
    salary: 54000,
  });

  await createEmployee({
    name: "Buzz",
    birthday: "1984-08-22",
    salary: 8000,
  });

  await createEmployee({
    name: "Frank",
    birthday: "1968-05-15",
    salary: 100,
  });

  await createEmployee({
    name: "Peter",
    birthday: "1965-01-12",
    salary: 1000000,
  });

  await createEmployee({
    name: "Fuller",
    birthday: "1992-02-29",
    salary: 10,
  });

  await createEmployee({
    name: "Johnny",
    birthday: "1944-11-26",
    salary: 2500000,
  });

  await createEmployee({
    name: "Gus",
    birthday: "1965-01-12",
    salary: 36000,
  });

  await createEmployee({
    name: "Kate",
    birthday: "1965-08-03",
    salary: 750000,
  });
}
