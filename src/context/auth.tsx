import { UserResponse } from "@/lib/typedef";
import { jwtDecode, JwtPayload } from "jwt-decode";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer
} from "react";
import { useNavigate } from "react-router-dom";

interface User {
  userId: string | undefined;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User;
  logout: () => void;
  login: (userData: UserResponse) => void;
}

const initialState: AuthState = {
  user: { userId: undefined, isAuthenticated: false },
};

interface AuthState {
  user: User;
}

type AuthAction =
  | { type: "LOGIN"; payload: { userId: string } }
  | { type: "LOGOUT" }
  | { type: "INITIALIZE"; payload: { userId?: string } };

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: {
          userId: action.payload.userId,
          isAuthenticated: true,
        },
      };
    case "LOGOUT":
      return {
        user: { userId: undefined, isAuthenticated: false },
      };
    case "INITIALIZE":
      return {
        user: {
          userId: action.payload.userId,
          isAuthenticated: !!action.payload.userId,
        },
      };
    default:
      throw new Error(`Unhandled action type: ${(action as any).type}`);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        dispatch({ type: "INITIALIZE", payload: { userId: decoded.userId } });
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (userData: UserResponse) => {
    localStorage.setItem("token", userData.token);
    dispatch({ type: "LOGIN", payload: { userId: userData.user.id } });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}{" "}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
