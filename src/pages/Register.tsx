import BasePage from "../components/BasePage";
import RegisterForm from "../components/forms/RegisterForm";

const Register = () => {
  return (
    <BasePage>
      <div className="flex flex-col items-center w-full pt-10 space-y-4">
        <h2 className="text-xl font-semi-bold leading-tight tracking-tight text-gray-900">
          Register
        </h2>
        <RegisterForm />
      </div>
    </BasePage>
  );
};

export default Register;
