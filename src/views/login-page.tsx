import LoginPanel from "@/components/login-panel";
import Image from "next/image";

interface LoginPageProps {
  registerPage?: boolean;
}

const LoginPage = ({ registerPage }: LoginPageProps) => {
  return (
    <div className="flex h-100vh">
      <LoginPanel registerPage={Boolean(registerPage)} />
      <div className="hidden md:block w-full h-full bg-no-repeat bg-center relative">
        <Image fill src="/background.png" alt="Background" />
      </div>
    </div>
  );
};

export default LoginPage;
