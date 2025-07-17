import { Appbar } from "../components/Appbar";
import { Users } from "../components/Users";

export const UsersPage = (props) => {
  return (
    <div>
      <Appbar name={props.name} /> // Appbar component is not showing up in the
      Users page
      <Users />
    </div>
  );
};
