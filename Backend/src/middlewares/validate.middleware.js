import { validationResult } from "express-validator";

/**
 * validate middleware
 * A reusable middleware that checks for express-validator errors.
 * If errors exist, it returns a 400 Bad Request with the error array.
 * Otherwise, it calls next() to proceed to the controller.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export default validate;
