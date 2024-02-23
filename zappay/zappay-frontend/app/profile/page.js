"use client";
import React from "react";
import UserCard from "../components/cards/UserCard";
import PasswordCard from "../components/cards/PasswordCard";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/atoms/AuthAtom";

const Page = () => {
  const auth = useRecoilValue(authState);

  return (
    <div className="w-full  h-screen p-5 overflow-hidden">
      <div className="pt-16 h-full">
        <div className="flex flex-col  gap-5 h-full w-full sm:w-2/3 md:w-1/2  lg:w-2/5 mx-auto">
          <UserCard auth={auth} />
          <PasswordCard auth={auth} />
        </div>
      </div>
    </div>
  );
};

export default Page;