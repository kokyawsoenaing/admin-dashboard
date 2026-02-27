import { useEffect, useRef } from "react";
import {
    Chart,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    type ChartConfiguration,
    type Plugin,
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

    // image drawer circular shape
    const drawCircularImage = (
        ctx: CanvasRenderingContext2D,
        img: HTMLImageElement,
        x: number,
        y: number,
        size: number,
    ) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
        ctx.restore();
    };

    useEffect(() => {
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

        //  Custom Plugin create
        const imagePlugin: Plugin<"bar"> = {
            id: "barAvatarPlugin",
            afterDatasetsDraw: (chart) => {
                const { ctx } = chart;
                const size = 32; // Logo size

                chart.getDatasetMeta(0).data.forEach((bar, index) => {
                    const logoUrl = mentionsData[index].logo;
                    const img = new Image();
                    img.src = logoUrl;

                    // Image load after render function
                    const render = () => {
                        const { x: posX, y: posY } = bar.tooltipPosition(false);
                        if (posX !== null && posY !== null) {
                            // Bar 10px upper position
                            drawCircularImage(
                                ctx,
                                img,
                                posX,
                                posY - size / 2 - 10,
                                size,
                            );
                        }
                    };

                    if (img.complete) {
                        render();
                    } else {
                        img.onload = () => chart.draw(); // Loaded image redraw chart to show image
                    }
                });
            },
        };

        const config: ChartConfiguration<"bar"> = {
            type: "bar",
            data: {
                labels: mentionsData.map((d) => d.label),
                datasets: [
                    {
                        label: "Mentions",
                        data: mentionsData.map((d) => d.value),
                        backgroundColor: "#2ecc8f",
                        borderRadius: {
                            topLeft: 4,
                            topRight: 4,
                            bottomLeft: 0,
                            bottomRight: 0,
                        },
                        borderSkipped: false,
                        barThickness: 48,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 40, // Image position
                    },
                },
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    x: { grid: { display: false } },
                    y: {
                        beginAtZero: true,
                        min: 0, //start from 0
                        max: 450, // Max value + some space
                        ticks: {
                            stepSize: 50, // Step size for y-axis ticks
                        },
                        grid: {
                            drawTicks: false,
                        },
                    },
                },
            },
            plugins: [imagePlugin], // Plugin add to config
        };

        chartInstanceRef.current = new Chart(chartRef.current, config);

        return () => {
            chartInstanceRef.current?.destroy();
        };
    }, []);

    return (
        <div
            style={{
                position: "relative",
                height: "420px",
                width: "100%",
                padding: "20px",
            }}
        >
            <canvas ref={chartRef} />
        </div>
    );
};

export default MentionsChart;
