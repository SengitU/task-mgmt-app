import { Formik, Form, Field } from "formik";
import { Input } from "../Input";

import { login } from "../../services/userService";
import useUser from "../../hooks/useLoggedInUser";

const validator = (values: { email: string; password: string }) => {
  const errors = {} as { email: string; password: string };
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (
    // TODO: unify with backend
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Minimum 8 characters required";
  }
  return errors;
};

const LoginForm = () => {
  const { setLoggedInUser } = useUser();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={validator}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const loggedInUser = await login(values.email, values.password);
          setLoggedInUser(loggedInUser);
          location.replace("/home");
        } catch (err) {
          console.log({ err });
          setSubmitting(false);
          setErrors({ email: "Wrong email - password combination" });
        }
      }}
    >
      {({ isSubmitting }) => (
        <div className="space-y-4 p-2 w-full max-w-lg">
          <Form>
            <div className="mt-4">
              <Field
                component={Input}
                type="Email"
                name="email"
                label="Email Address"
                placeholder="test@example.com"
              />
            </div>
            <div className="mt-4">
              <Field
                component={Input}
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 mt-4 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={isSubmitting}
            >
              Submit
            </button>
            <p className="mt-4 text-sm font-light text-gray-500">
              Don’t have an account yet?{" "}
              <a
                href="/register"
                className="font-medium text-primary-600 hover:underline"
              >
                Sign up
              </a>
            </p>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;