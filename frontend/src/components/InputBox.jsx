import { set } from "mongoose";

export function InputBox({ label, placeholder, onChange, type, onKeyDown }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        type={type || "text"}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200"
        onKeyDown={onKeyDown} // Added this line
      />
    </div>
  );
}
