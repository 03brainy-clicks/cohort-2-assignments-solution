"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {
  validateName,
  validatePassword,
  validateUsername,
} from "@/app/utils/ValidationFunctions";

const SignupPage = () => {
  // State variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    firstNameErr: false,
    lastNameErr: false,
    usernameErr: false,
    passwordErr: false,
  });
  const router = useRouter();

  // Reset form fields
  const handleReset = useCallback(() => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
  }, []);

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation
    const usernameValid = validateUsername(username);
    const firstNameValid = validateName(firstName);
    const lastNameValid = validateName(lastName);
    const passwordValid = validatePassword(password);

    setError({
      firstNameErr: !firstNameValid,
      lastNameErr: !lastNameValid,
      usernameErr: !usernameValid,
      passwordErr: !passwordValid,
    });

    // If all fields are valid, proceed with signup
    if (usernameValid && firstNameValid && lastNameValid && passwordValid) {
      try {
        // API call to register user
        const response = await axios.post(
          "https://paytm-clone-backend-production.up.railway.app/api/users/signup",
          { firstName, lastName, username, password }
        );
        const data = await response.data;

        // Reset form and navigate to signin page
        handleReset();
        console.log(data);
        router.push("/auth/signin");
      } catch (error) {
        console.error("Signup failed:", error);
        // Additional error handling can be added here, e.g., show an error message to the user
      }
    }
  };

  // JSX for rendering the signup form
  return (
    <div className="w-screen h-screen flex items-center p-5 justify-center">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 p-5 rounded bg-white">
        <h2 className="font-bold text-2xl mb-2 tracking-tight flex items-center justify-center gap-1">
          Sign Up
        </h2>
        <p className="text-gray-600 text-center">
          To make smooth transactions!
        </p>
        <form action="" className="space-y-2 mt-5">
          {/* Form fields with validation messages */}
          <div>
            <label htmlFor="firstName" className="text-xs font-medium">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full rounded text-sm py-1 px-2 outline-orange-600 border ${
                error.firstNameErr ? "border-red-600" : ""
              }`}
            />
            {error.firstNameErr && (
              <p className="text-xs mt-1 text-red-600">
                First name must be between 1 and 20 characters.
              </p>
            )}
          </div>
          {/* ... (similar structure for other form fields, omitted for brevity) ... */}
          {/* Signup and Reset buttons */}
          <div className="pt-3 clas flex items-center gap-3">
            <button
              onClick={handleSignup}
              className="py-2 text-sm bg-orange-600 text-white px-5 rounded font-medium w-1/2"
            >
              Sign up
            </button>{" "}
            <button
              onClick={handleReset}
              className="py-2 text-sm border border-orange-600 text-orange-600 px-5 rounded font-medium w-1/2"
            >
              Reset
            </button>
          </div>
        </form>
        {/* Separators and Login link */}
        <div className="flex items-center gap-3">
          <div className="border-b flex-1 "> </div>
          <p className="text-center text-xs py-3 text-gray-500">OR</p>
          <div className="border-b flex-1"> </div>
        </div>
        <p className="text-center text-xs">
          Already have an account?{" "}
          <Link href={"/auth/signin"}>
            <span className="text-orange-600 cursor-pointer">Login</span>
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
