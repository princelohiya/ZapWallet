import { nativeEnum } from "zod";

export const Appbar = (props) => {
  const name = props.name;
  return (
    <div className="shadow border-b border-slate-300 h-14 flex justify-between ">
      <div className="flex flex-col justify-center h-full ml-4 w-26">
        <img src="/logo.png" alt="" />{" "}
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4 text text-slate-600">
          {name}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl text-orange-500">
            {name[0].toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};
