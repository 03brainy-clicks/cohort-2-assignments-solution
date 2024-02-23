import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const UserDetailCard = ({ user }) => {
  const { _id, firstName, lastName,username } = user;
  return (
    <div className="text-white flex gap-4 border-b items-center hover:bg-zap-hoverBlack p-2 border-zap-lightBlack">
      <div className="w-7 h-7 rounded-full border  flex items-center justify-center">
        <span>{firstName[0]}</span>
      </div>
      <div className="mr-auto">
        {firstName} {lastName} <br />
        <span className="text-xs">{username}</span>
      </div>
      <Link href={`payment/${_id}`}>
        <button className="ml-auto py-2 text-sm bg-orange-600 text-white px-5 rounded font-medium">
          Pay
        </button>
      </Link>
    </div>
  );
};

export default UserDetailCard;
