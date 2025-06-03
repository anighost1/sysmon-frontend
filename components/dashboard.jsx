"use client";

import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import CpuChart from "./charts/cpuChart";
import MemoryChart from './charts/memoryChart';
import NetworkChart from './charts/networkChart';
import DiskChart from './charts/diskChart';

export default function Dashboard() {

  const [data, setData] = useState({});

  const istTime = new Date(data?.boot_time).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: false,
  });

  const { lastMessage } = useWebSocket(process.env.NEXT_PUBLIC_API_URL, {
    onOpen: () => console.log('Connected'),
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage?.data);
      // console.log(data?.memory?.percent)
      setData(data);
    }
  }, [lastMessage]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mt-4">AT Monitoring System</h1>
      <div className="flex flex-row flex-wrap justify-center items-start gap-4 p-10">
        <CpuChart data={data?.cpu_percent} />
        <MemoryChart data={data?.memory} />
        <DiskChart data={data?.disk} />
      </div>
    </div>
  );
}