import { FieldProps } from "formik";
import classnames from "classnames";

export const Input = ({ field, form, ...props }: FieldProps) => {
  const isFieldTouched = form.touched[field.name];
  const isFieldInvalid = form.errors[field.name];
  const isError = isFieldTouched && isFieldInvalid;
  const isValid = isFieldTouched && !isFieldInvalid;
  return (
    <div>
      <label
        htmlFor={field.name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {(props as unknown as Record<"label", string>).label || field.name}
      </label>
      <input
        {...field}
        {...props}
        className={classnames(
          "block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600",
          {
            "bg-red-50 border-red-500 text-red-900 focus:border-red-500 focus:outline-none":
              isError,
            "bg-green-50 border border-green-500 text-green-900 focus:border-green-500 focus:outline-none":
              isValid,
          }
        )}
      />
      {isError && (
        <div className="mt-2 text-sm text-red-600">
          {form.errors[field.name] as string}
        </div>
      )}
    </div>
  );
};
