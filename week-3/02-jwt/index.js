const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const zod = require("zod");

// Define validation schemas using Zod
const validUsername = zod.string().email();
const validPassword = zod.string().min(6);
const validToken = zod.string();

/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */
function signJwt(username, password) {
  // Check both username and password using safeParse
  const usernameResult = validUsername.safeParse(username);
  const passwordResult = validPassword.safeParse(password);

  // Check if both username and password are valid
  if (usernameResult.success && passwordResult.success) {
    // Sign and return the JWT with username and password in the payload
    return jwt.sign(
      { username: usernameResult.data, password: passwordResult.data },
      jwtPassword
    );
  }

  // Return null if either username or password is not valid
  return null;
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
  // Check if the token is a valid string using safeParse
  const tokenResult = validToken.safeParse(token);

  // Check if the token is valid before attempting to verify
  if (tokenResult.success) {
    try {
      // Verify the token using the secret key and check if username exists
      const verifyToken = jwt.verify(token, jwtPassword);
      return Boolean(verifyToken.username);
    } catch (error) {
      // Handle verification errors, e.g., invalid token, expired token, etc.
      return false;
    }
  }

  // Return false if the token is not a valid string
  return false;
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
  // Check if the token is a valid string using safeParse
  const tokenResult = validToken.safeParse(token);

  // Check if the token is valid before attempting to decode
  if (tokenResult.success) {
    try {
      // Decode the token and check if username and password exist
      const decode = jwt.decode(token, jwtPassword);
      return Boolean(decode?.username && decode?.password);
    } catch (error) {
      // Handle decoding errors, e.g., invalid token format
      return false;
    }
  }

  // Return false if the token is not a valid string
  return false;
}

// Export the functions and JWT password
module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
