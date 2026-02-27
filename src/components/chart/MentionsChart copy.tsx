import { useEffect, useRef } from "react";
import {
    Chart,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { mentionsData } from "../../data/mentionsData";

Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
);

interface MentionsChartProps {
    sidebarOpen: boolean;
}

const MentionsChart = ({ sidebarOpen }: MentionsChartProps) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);
    useEffect(() => {
        // 1. Resize function
        const handleResize = () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.resize();
            }
        };

        const timer = setTimeout(handleResize, 350);

        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", handleResize);
        };
    }, [sidebarOpen]);

    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(chartRef.current, {
            type: "bar",
            data: {
                labels: mentionsData.map((d) => d.label),
                datasets: [
                    {
                        label: "Mentions",
                        data: mentionsData.map((d) => d.value),
                        backgroundColor: "#2ecc8f",
                        borderRadius: 4,
                        borderSkipped: false,
                        barThickness: 48,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true, max: 500 },
                },
            },
        });

        return () => {
            chartInstanceRef.current?.destroy();
        };
    }, []);

    return (
        <div style={{ position: "relative", height: "420px", width: "100%" }}>
            <canvas ref={chartRef} />
        </div>
    );
};

export default MentionsChart;
