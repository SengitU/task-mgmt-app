import { useLayoutEffect } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import queryClient from "./queryClient";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Landing />} />
      <Route path="register" element={<Register />} />
      <Route path="home" element={<Home />} errorElement={<ErrorPage />} />
    </Route>
  )
);

const App = () => {
  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#f9fafb";
  });
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
