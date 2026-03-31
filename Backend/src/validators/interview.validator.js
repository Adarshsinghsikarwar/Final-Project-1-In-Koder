import { body } from "express-validator";

export const createSessionValidation = [
  body("jobRole").trim().notEmpty().withMessage("Job role is required"),
  body("difficulty")
    .optional()
    .isIn(["beginner", "intermediate", "advanced"])
    .withMessage("Difficulty must be beginner, intermediate, or advanced"),
  body("techStack")
    .optional()
    .isArray()
    .withMessage("Tech stack must be an array"),
  body("type")
    .optional()
    .isIn(["ai", "live"])
    .withMessage("Type must be ai or live"),
];
