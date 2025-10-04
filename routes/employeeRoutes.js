import express from "express";
const router = express.Router();
import {
  getEmployees,
  getSpecifiedEmployees,
  createEmployees,
  editEmployees,
  deleteEmployees,
} from "../controllers/employee.js";

router.get("/", getEmployees);

router.post("/", createEmployees);

router.get("/:id", getSpecifiedEmployees);

router.put("/:id", editEmployees);

router.delete("/:id", deleteEmployees);

export default router;
