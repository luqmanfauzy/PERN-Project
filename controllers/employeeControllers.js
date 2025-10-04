import { query } from "../utils/connectToDB.js";
import {
  createroleQuery,
  createEmployeeTableQuery,
  getAllEmployeesQuery,
  createEmployeeQuery,
  getEmployeeByIdQuery,
  deleteEmployeeByIdQuery,
  updateEmployeeByIdQuery,
} from "../utils/sqlQuery.js";
import { createError } from "../utils/error.js";

export async function getEmployees(req, res, next) {
  try {
    const response = await query("SELECT to_regclass('employee_details')");
    console.log(response);
    if (!response.rows[0].to_regclass) {
      await query(createroleQuery);
      await query(createEmployeeTableQuery);
      res.status(200).send("Employee table created successfully");
    }
    const { rows } = await query(getAllEmployeesQuery);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).send("Internal Server Error");
    return next(createError("Failed to fetch employees", 500));
  }
}

export async function getSpecifiedEmployees(req, res, next) {
  try {
    const { id } = req.params;
    const data = await query(getEmployeeByIdQuery, [id]);
    if (!data.rowCount) {
      return next(createError("Employee not found", 404));
    }
    res.status(200).json(data.rows[0]);
  } catch (error) {
    console.error("Error fetching employee:", error);
    return next(createError("Failed to fetch employee", 500));
  }
}

export async function createEmployees(req, res, next) {
  try {
    const { name, email, age, role, salary } = req.body;
    if (!name || !email || !age || !salary) {
      return next(
        createError("Name, email, age, and salary are required fields", 400)
      );
    }
    const data = await query(createEmployeeQuery, [
      name,
      email,
      age,
      role,
      salary,
    ]);
    res.status(201).json(data.rows[0]);
  } catch (error) {
    console.log("Error creating employee:", error);
    return next(createError("Failed to create employee", 500));
  }
}

export async function editEmployees(req, res, next) {
  try {
    const { id } = req.params;
    const { name, email, age, role, salary } = req.body;
    const data = await query(updateEmployeeByIdQuery, [
      name,
      email,
      age,
      role,
      salary,
      id,
    ]);
    if (!data.rowCount) {
      return next(createError("Employee not found", 404));
    }
    res.status(200).json(data.rows[0]);
  } catch (error) {
    console.log("Error updating employee:", error);
    return next(createError("Failed to update employee", 500));
  }
}

export async function deleteEmployees(req, res, next) {
  try {
    const { id } = req.params;
    const data = await query(deleteEmployeeByIdQuery, [id]);
    if (!data.rowCount) {
      return next(createError("Employee not found", 404));
    }
    res.status(200).json(data.rows[0]);
  } catch (error) {
    console.log("Error deleting employee:", error);
    return next(createError("Failed to delete employee", 500));
  }
}
