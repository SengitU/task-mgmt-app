import { Suspense } from "react";
import { useNavigate } from "react-router-dom";

import BasePage from "../components/BasePage";
import TaskPanel from "../components/TaskPanel";
import useUser from "../hooks/useLoggedInUser";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  if (!user) {
    navigate("/", { replace: true });
    return <></>;
  }

  return (
    <BasePage>
      <div className="flex flex-col items-center w-full h-full p-1 space-y-6">
        <h2>Welcome {user.user.name}</h2>
        <Suspense fallback={<div>Loading</div>}>
          <TaskPanel user={user} />
        </Suspense>
      </div>
    </BasePage>
  );
};

export default Home;
