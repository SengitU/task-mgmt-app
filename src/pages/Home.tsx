import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";

import BasePage from "../components/BasePage";
import TaskPanel from "../components/TaskPanel";
import useUser from "../hooks/useLoggedInUser";
import ModalWrapper from "../components/ModalWrapper";
import TaskForm from "../components/TaskForm";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (!user) {
    navigate("/", { replace: true });
    return <></>;
  }

  return (
    <BasePage>
      <div className="flex flex-col items-center w-full h-full p-1 space-y-6">
        <h2>Welcome {user.user.name}</h2>
        <ModalWrapper
          isOpen={isCreateModalOpen}
          title="Create new task"
          closeModalHandler={() => setIsCreateModalOpen(false)}
          displayElement={
            <button
              className="px-3 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create task
            </button>
          }
        >
          <TaskForm onSubmitComplete={() => {}} />
        </ModalWrapper>

        <Suspense fallback={<div>Loading</div>}>
          <TaskPanel user={user} />
        </Suspense>
      </div>
    </BasePage>
  );
};

export default Home;
