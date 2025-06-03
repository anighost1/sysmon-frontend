import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CpuChart = ({ data }) => {
    const options = {
        chart: { height: 350 },
        plotOptions: {
            radialBar: {
                hollow: { size: '70%' },
                dataLabels: {
                    name: { show: true, fontSize: '22px' },
                    value: { show: true },
                },
            },
        },
        labels: ['CPU'],
    };

    const series = [data || 0];

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

export default CpuChart;
