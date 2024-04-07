import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
  return (
    <div className="flex items-center h-dvh">
        <div className="flex h-[90dvh]  w-full">
            <Header/>
            <Outlet/>
        </div>
    </div>
  )
}
