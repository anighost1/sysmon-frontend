'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function NetworkChart({ data }) {
    const [sentData, setSentData] = useState([]);
    const [recvData, setRecvData] = useState([]);

    useEffect(() => {
        if (data) {
            if (sentData.length === 100) {
                setSentData((prev) => {
                    prev.shift();
                    return [...prev, (data?.bytes_sent / (1024 * 1024)).toFixed(2)];
                });
            } else {
                setSentData((prev) => [...prev, (data?.bytes_sent / (1024 * 1024)).toFixed(2)]);
            }

            if (recvData.length === 100) {
                setRecvData((prev) => {
                    prev.shift();
                    return [...prev, (data?.bytes_recv / (1024 * 1024)).toFixed(2)];
                });
            } else {
                setRecvData((prev) => [...prev, (data?.bytes_recv / (1024 * 1024)).toFixed(2)]);
            }

            // setSentData((prev) => [...prev.slice(-9), data?.bytes_sent]);
            // setRecvData((prev) => [...prev.slice(-9), data?.bytes_recv]);

        }
    }, [data]);

    const options = {
        chart: {
            id: 'basic-line',
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: true,
            },
            axisTicks: {
                show: true,
            },
        },
    };

    const series = [
        {
            name: 'Sent (MB)',
            data: sentData,
        },
    ];

    const series2 = [
        {
            name: 'Received (MB)',
            data: recvData,
        },
    ];

    return (
        <div className='w-full flex flex-row items-center justify-center gap-4 flex-wrap'>
            <div className=" p-4 bg-white rounded shadow-md">
                <ApexChart type="line" height={350} options={options} series={series} />
            </div>
            <div className=" p-4 bg-white rounded shadow-md">
                <ApexChart type="line" height={350} options={options} series={series2} />
            </div>
        </div>
    );
}
