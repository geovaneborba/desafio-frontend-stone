import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Homepage } from "../pages/Homepage";
import { ResumePage } from "../pages/ResumePage";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/resume" element={<ResumePage />} />
      </Route>
    </Routes>
  );
}
