import BasePage from "../components/BasePage";
import LoginForm from "../components/LoginForm";

const Landing = () => {
  return (
    <BasePage>
      <div className="flex flex-col items-center w-full pt-10 space-y-4">
        <h2 className="text-xl font-semi-bold leading-tight tracking-tight text-gray-900">
          Sign in to continue
        </h2>
        <LoginForm />
      </div>
    </BasePage>
  );
};

export default Landing;
