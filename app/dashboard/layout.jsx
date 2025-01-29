"use client";

import { useState } from "react";
import { VideoDataContext } from "../_context/VideoDataContext";
import Header from "./_component/Header";
import SideNav from "./_component/SideNav";

const DashboardLayout = ({ children }) => {
  const [videoData, setVideoData] = useState({});
  return (
    <VideoDataContext.Provider value={[videoData, setVideoData]}>
      <div>
        <div className="hidden md:block bg-white mt-[65px] fixed h-screen w-64">
          <SideNav />
        </div>
        <div>
          <Header />
          <div className="md:ml-64 p-10 pt-20">{children}</div>
        </div>
      </div>
    </VideoDataContext.Provider>
  );
};

export default DashboardLayout;
