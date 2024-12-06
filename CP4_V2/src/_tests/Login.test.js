import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { signInWithPopup, signOut } from "firebase/auth";
import Login from "./Login";
import { auth, provider } from "../firebase";

// Mock Firebase dependencies
jest.mock("firebase/auth", () => ({
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(() => ({ exists: jest.fn(() => false) })),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(() => jest.fn()),
  NavLink: ({ children }) => <div>{children}</div>,
}));

describe("Login Component", () => {
  it("renders the login form when user is not logged in", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("calls signInWithPopup and updates user state on login", async () => {
    const mockUser = {
      user: {
        email: "test@example.com",
        displayName: "Test User",
        uid: "12345",
      },
    };

    signInWithPopup.mockResolvedValueOnce(mockUser);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const googleLoginButton = screen.getByText("Google");
    fireEvent.click(googleLoginButton);

    // Wait for async operations to complete
    expect(signInWithPopup).toHaveBeenCalledWith(auth, provider);
    // Normally, you'd use `await` + `findByText` to handle async state updates
    await screen.findByText("Welcome, Test User");
  });

  it("calls signOut and clears user state on logout", async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);

    signOut.mockResolvedValueOnce();

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const googleLoginButton = screen.getByText("Google");
    fireEvent.click(googleLoginButton);

    // Mock that the user has logged in successfully
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(signOut).toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalledWith("/home");
  });
});
