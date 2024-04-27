import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
  return (
    <div className="flex items-center h-dvh">
      <div className="flex h-[100dvh] w-full relative">
        <Header />
        <div className=" lg:ml-56 w-full py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
