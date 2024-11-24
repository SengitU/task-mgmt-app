import { ReactNode } from "react";

const BasePage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-50 w-full h-screen">
      <section className="flex flex-col items-center justify-center h-full mx-auto my-0 max-w-7xl bg-white">
        <h1 className="center text-2xl font-bold pt-8">Task Management App</h1>
        {children}
      </section>
    </div>
  );
};

export default BasePage;
