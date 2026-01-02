import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import { Search, Send, User as UserIcon } from "lucide-react";
import { Skeleton } from "./Skeleton"; // Assuming this component exists

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Debouncing could be added here for performance, but keeping your logic simple for now
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/user/bulk?filter=${filter}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setUsers(response.data.user);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch users", err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [filter]);

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Header & Search Bar */}
      <div className="mb-2">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
          </div>
          <input
            onChange={(e) => setFilter(e.target.value)}
            type="text"
            placeholder="Search users..."
            className="block w-full pl-10 pr-3 py-3 border border-neutral-800 rounded-xl leading-5 bg-neutral-900/50 text-gray-300 placeholder-gray-600 focus:outline-none focus:bg-neutral-900 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all shadow-inner"
          />
        </div>
      </div>

      {/* 2. User List */}
      <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col gap-3">
            {/* Simple Skeleton Fallback if your Skeleton component isn't dark-mode ready */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 bg-neutral-900/50 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <>
            {users.map((user) => (
              <User key={user._id} user={user} />
            ))}
            {users.length === 0 && (
              <div className="text-center py-8 text-gray-600">
                No users found
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="group flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 flex items-center justify-center text-purple-400 font-bold shadow-sm group-hover:scale-110 transition-transform">
          {user.firstName ? (
            user.firstName[0].toUpperCase()
          ) : (
            <UserIcon size={18} />
          )}
        </div>

        {/* Name info */}
        <div className="flex flex-col">
          <span className="text-gray-200 font-medium text-sm group-hover:text-white transition-colors">
            {user.firstName} {user.lastName}
          </span>
          <span className="text-xs text-gray-500">User</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => {
          navigate("/send?id=" + user._id + "&name=" + user.firstName);
        }}
        className="flex items-center gap-2 bg-purple-600/10 text-purple-400 hover:bg-purple-600 hover:text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95"
      >
        Send
        <Send size={14} />
      </button>
    </div>
  );
}
