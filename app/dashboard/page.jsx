"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EmptyState from "./_component/EmptyState";

const Dashboard = () => {
  const [videoList, setVideoList] = useState([]);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold text-primary">Dashboard</h2>
        <Button>+ Create New</Button>
      </div>
      {videoList?.length === 0 && <EmptyState />}
    </div>
  );
};

export default Dashboard;
