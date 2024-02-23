"use client";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/app/recoil/atoms/UserAtom";

const UserCard = ({ auth }) => {
  const [user, setUser] = useRecoilState(userState);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [error, setError] = useState({
    firstNameErr: false,
    lastNameErr: false,
  });

  const handleReset = useCallback(() => {
    setFirstName("");
    setLastName("");
    setError({
      firstNameErr: false,
      lastNameErr: false,
    });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const firstNameValid = firstName.length >= 1 && firstName.length <= 20;
    const lastNameValid = lastName.length >= 1 && lastName.length <= 20;

    setError({
      firstNameErr: !firstNameValid,
      lastNameErr: !lastNameValid,
    });

    if (firstNameValid && lastNameValid) {
      try {
        const response = await axios.put(
          `https://paytm-clone-backend-production.up.railway.app/api/users/update/${auth.userId}`,
          {
            firstName,
            lastName,
          },
          {
            headers: {
              Authorization: auth.JWT,
            },
          }
        );
        const data = await response.data;
        setUser({ ...user, firstName: firstName, lastName: lastName });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full p-5 rounded bg-white">
        <form className="space-y-3">
          <div className=" text-sm uppercase font-medium">
            <span>{user.username}</span>
          </div>
          <div>
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
          <div>
            <input
              type="text"
              name="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full rounded text-sm py-1 px-2 outline-orange-600 border ${
                error.lastNameErr ? "border-red-600" : ""
              }`}
            />
            {error.lastNameErr && (
              <p className="text-xs mt-1 text-red-600">
                Last name must be between 1 and 20 characters.
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleUpdate}
              className={`py-2 text-sm bg-orange-600 text-white px-5 rounded font-medium `}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCard;
