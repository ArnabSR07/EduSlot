"use client";

import { useUserSync } from "@/hooks/useUserSync";

const Dashboard = () => {
  useUserSync();
  return <div>Dashboard</div>;
};

export default Dashboard;
