export const Balance = ({ value }) => {
  return (
    <div className="bg-gradient-to-r from-orange-700 to-indigo-200 text-white p-3.5 rounded-2xl shadow-lg flex justify-between items-center w-104">
      <div>
        <p className="text-lg font-medium">Your Balance</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
    </div>
  );
};
