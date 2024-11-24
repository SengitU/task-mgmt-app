import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BasePage from "../components/BasePage";

const Error = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  });

  return (
    <BasePage>
      <div className="flex flex-row items-center w-full h-full p-5">
        <h2>Something went wrong</h2>
        <p>Try logging in again</p>
      </div>
    </BasePage>
  );
};

export default Error;
