import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Loader";
import { Users } from "../components/Users";

export const Userspage = (props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen ">
      <Appbar name={props.name} />
      <div className="flex justify-center pt-7 ">
        <div className="border-4 border-gray-200 max-w-screen p-4 space-y-8 w-88 sm:w-128 shadow-lg rounded-lg">
          {loading ? (
            <div className="flex justify-center items-center h-94">
              <Spinner></Spinner>
            </div>
          ) : (
            <Users name={props.name}></Users>
          )}
        </div>
      </div>
    </div>
  );
};
