import Image from "next/image";
import Transaction from "../public/transaction.svg";
const page = () => {
  return (
    <div className="w-9/12 mx-auto flex items-center min-h-screen  justify-center">
      <div>
        <Image
          src={Transaction}
          alt="Transaction"
          className="md:w-1/2 mx-auto mb-10"
        />
        <h1 className="text-white text-center text-4xl font-bold">
          Make Payments Fast, Easy and Secure.
        </h1>
      </div>
    </div>
  );
};

export default page;
