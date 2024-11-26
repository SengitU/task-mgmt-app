import { Formik, Form, Field } from "formik";

import { Input } from "../Input";
import { Task } from "../../hooks/useTasks";
import useSubmitTask from "../../hooks/useSubmitTask";
import { useCallback } from "react";

type TaskFormInput = Pick<Task, "title" | "description" | "dueAt">;

const validator = (values: {
  title: string;
  description: string;
  dueAt: string;
}) => {
  const errors = {} as Partial<Task>;
  if (!values.title) {
    errors.title = "Title is required";
  }
  if (!values.description) {
    errors.description = "Description is required";
  }
  if (!values.dueAt) {
    errors.dueAt = "Due date is required";
  }
  return errors;
};

const TaskForm = ({
  initialValues,
  taskId,
  onSubmitComplete,
}: {
  initialValues?: TaskFormInput;
  taskId?: number;
  onSubmitComplete: () => void;
}) => {
  const submitTaskAction = useSubmitTask(taskId);
  const submitAction = useCallback(
    async (
      values: TaskFormInput,
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
      try {
        await submitTaskAction.mutate(values);
        if (onSubmitComplete) onSubmitComplete();
      } catch (err) {
        console.log({ err });
        setSubmitting(false);
      }
    },
    [submitTaskAction]
  );

  return (
    <Formik
      initialValues={initialValues || { title: "", description: "", dueAt: "" }}
      validate={validator}
      onSubmit={submitAction}
    >
      {({ isSubmitting }) => {
        return (
          <div className="space-y-4 p-2 w-full max-w-lg">
            <Form>
              <div className="mt-4">
                <Field
                  component={Input}
                  type="text"
                  name="title"
                  label="Task Title"
                />
              </div>
              <div className="mt-4">
                <Field
                  component={Input}
                  label="Task Description"
                  type="text"
                  name="description"
                />
              </div>
              <div className="mt-4">
                <Field
                  component={Input}
                  label="Due Date"
                  type="date"
                  name="dueAt"
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
        );
      }}
    </Formik>
  );
};

export default TaskForm;
