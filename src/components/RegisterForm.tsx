import { Formik, Form, Field } from "formik";

import { Input } from "./Input";
import { register } from "../services/userService";

const validator = (values: {
  email: string;
  password: string;
  name: string;
}) => {
  const errors = {} as { email: string; password: string; name: string };
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
  if (!values.name) {
    errors.name = "Name is required";
  } else if (values.name.length < 2 || values.name.length > 30) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  return errors;
};

const RegisterForm = () => (
  <Formik
    initialValues={{ email: "", password: "", name: "" }}
    validate={validator}
    onSubmit={async (values, { setSubmitting, setErrors }) => {
      try {
        await register(values);
        location.replace("/ ");
      } catch (err) {
        setErrors({ email: "Email already registered" });
        setSubmitting(false);
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
          <div className="mt-4">
            <Field
              component={Input}
              label="Name"
              type="name"
              name="name"
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
        </Form>
      </div>
    )}
  </Formik>
);

export default RegisterForm;
