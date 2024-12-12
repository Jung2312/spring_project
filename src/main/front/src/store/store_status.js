import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

// Chart.js 모듈 등록
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function StoreStatus({ paymentData }) {
    if (!paymentData || paymentData.length === 0) {
        return <div>매출 데이터가 없습니다.</div>;
    }

    // 월별 판매 개수 계산
    const monthlySales = Array(12).fill(0); // 12개월 초기화
    paymentData.forEach((payment) => {
        const month = new Date(payment.payDate).getMonth(); // 0부터 시작
        monthlySales[month] += 1; // 판매 개수 증가
    });

    const labels = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
    const salesData = monthlySales.map((count) => Math.min(count, 20)); // 최대 20개

    const data = {
        labels,
        datasets: [
            {
                label: "월별 판매 개수 (최대 20개)",
                data: salesData,
                backgroundColor: "#0CD3FF",
                borderColor: "#0CD3FF",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            tooltip: { enabled: true },
        },
        scales: {
            x: { beginAtZero: true },
            y: {
                beginAtZero: true,
                max: 20, // 세로축 최대값 20 설정
                ticks: { stepSize: 2 }, // 눈금 단위
            },
        },
    };

    return (
        <div>
            <h2>월별 판매 개수</h2>
            <Bar data={data} options={options} />
        </div>
    );
}

export default StoreStatus;
