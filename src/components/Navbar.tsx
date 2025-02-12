import { getUserData } from "@/api/users";
import { useAuth } from "@/context/auth";
import { User } from "@/lib/typedef";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { CreatePost } from "./CreatePost";

const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, logout } = useAuth();
  const navigate = useNavigate();


  const { data: userData, isLoading } = useQuery({
    queryKey: ["userData", user?.userId],
    queryFn: () => getUserData(user?.userId!),
    enabled: !!user?.userId, // Only run query if user exists
    retry: true,
  });


  return (
    <div className="bg-teal-500 py-4 flex justify-between px-4">
      <div className="ml-6">
        <p className="font-sans text-xl">
          <Link to={user.isAuthenticated ? "/dashboard" : "/"}>
            {isLoading || !userData
              ? "Social Media APP"
              : `Welcome, ${userData?.user.fullName}`}
          </Link>
        </p>
      </div>
      <div className="flex gap-3 ">
        {user.isAuthenticated ? (
          <>
            <CreatePost isCreate={true} postContent="" />
            <Button size={"lg"} onClick={() => navigate("/chat-screen")}>
              Chat
            </Button>
            <Button size={"lg"} asChild onClick={logout}>
              <Link to="/">Log out</Link>
            </Button>
          </>
        ) : (
          <>
            {(currentPath == "/register" || currentPath == "/") && (
              <Button size={"lg"} asChild>
                <Link to="/login">Log in</Link>
              </Button>
            )}{" "}
            {(currentPath == "/login" || currentPath == "/") && (
              <Button size={"lg"} asChild>
                <Link to="/register">Register</Link>
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
