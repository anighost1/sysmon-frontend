import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const MemoryChart = ({ data }) => {
    const options = {
        chart: {
            height: 350,
            type: 'radialBar',
            toolbar: { show: false },
        },
        title: {
            text: 'Memory Usage',
            align: 'center',
        },
        subtitle: {
            text: `${(data?.used / 1e9).toFixed(1)}GB / ${(data?.total / 1e9).toFixed(1)}GB`,
            align: 'center',
            style: { fontSize: '14px', color: '#666' },
        },
        plotOptions: {
            radialBar: {
                track: {
                    background: '#f0f0f0',
                    strokeWidth: '100%',
                },
                hollow: { size: '70%' },
                dataLabels: {
                    name: { show: true },
                    // value: {
                    //     formatter: val => `${val}%`,
                    // },
                },
            },
        },
        labels: ['Memory'],
        colors: [data?.percent > 80 ? '#FF4560' : '#00E396'],
    };

    const series = [data?.percent || 0];

    return (
        <div className="p-4 bg-white rounded shadow-md">
            <Chart
                options={options}
                series={series}
                type="radialBar"
            />
        </div>
    );
};

export default MemoryChart;
