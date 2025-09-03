import { Appbar } from "../components/Appbar";
import { Skeleton } from "../components/Skeleton";
import { Users } from "../components/Users";

export const Userspage = (props) => {
  return (
    <div>
      <Appbar name={props.name} />
      <div className="flex justify-center pt-7">
        <div className="border-4 border-gray-100 max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <Users name={props.name}></Users>
        </div>
      </div>
    </div>
  );
};
