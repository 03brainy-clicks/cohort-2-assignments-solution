import React from "react";
import PageNotFound from "../public/404.svg";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="w-full md:w-10/12 lg:w-9/12 mx-auto h-screen p-5 overflow-hidden">
      <div className="pt-16 h-full text-white flex items-center justify-center">
      <Image
          src={PageNotFound}
          alt="404"
          className="md:w-1/2 mx-auto mb-10"
        />
      </div>
    </div>
  );
};

export default NotFound;
