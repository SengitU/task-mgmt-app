import { isPast } from "date-fns";
import classNames from "classnames";

import type { Task } from "../hooks/useTasks";
import useSubmitTask from "../hooks/useSubmitTask";

import ModalWrapper from "./ModalWrapper";
import TaskForm from "./forms/TaskForm";
import { useState } from "react";

const TaskCardStateless = ({
  task,
  cardClickHandler,
}: {
  task: Task;
  cardClickHandler: () => void;
}) => {
  const mutation = useSubmitTask(task.id);
  const isOpen = task.status === "OPEN";
  const isDue = isOpen && isPast(new Date(task.dueAt));
  const ctaText = isOpen ? "Mark as complete" : "Reopen";
  return (
    <div
      onClick={cardClickHandler}
      className={classNames(
        `flex flex-col cursor-pointer min-h-[170px] h-[250px] w-[200px] md:w-[175px] sm:w-[175px] h-max p-2 bg-white mt-2 border border-gray-200 rounded-lg shadow space-around justify-between`,
        {
          "bg-yellow-100": isDue,
        }
      )}
    >
      <h2 className="text-xl font-bold tracking-tight text-gray-900 truncate">
        {task.title}
      </h2>
      <span className="font-normal text-gray-700 max-h-[150px] break-all overflow-hidden hover:overflow-auto">
        {task.description}
      </span>
      <p className="font-normal text-gray-700">
        Due at: {new Date(task.dueAt).toLocaleDateString()}
      </p>
      <button
        className="px-3 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        onClick={(e) => {
          if (isOpen) {
            mutation.mutate({ status: "CLOSED" });
          } else {
            mutation.mutate({ status: "OPEN" });
          }
          e.stopPropagation();
        }}
      >
        {ctaText}
      </button>
    </div>
  );
};

const TaskCard = ({ task }: { task: Task }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <ModalWrapper
      isOpen={isEditModalOpen}
      title="Edit Task"
      closeModalHandler={() => setIsEditModalOpen(false)}
      displayElement={
        <TaskCardStateless
          cardClickHandler={() => setIsEditModalOpen(true)}
          task={task}
        />
      }
    >
      <TaskForm
        initialValues={task}
        taskId={task.id}
        onSubmitComplete={() => setIsEditModalOpen(false)}
      />
    </ModalWrapper>
  );
};

export default TaskCard;
