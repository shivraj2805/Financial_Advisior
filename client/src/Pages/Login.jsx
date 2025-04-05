import { SignIn } from "@clerk/clerk-react";

const LoginPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <SignIn afterSignInUrl="/financialAdvisior" />
    </div>
  );
};

export default LoginPage;
