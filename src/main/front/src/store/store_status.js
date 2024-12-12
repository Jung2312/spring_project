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

function StoreStatus() {
    // X값
    const labels = ["2017", "2018", "2019", "2020", "2021", "2022", "2023"];

    // 데이터셋
    const data = {
        labels,
        datasets: [
            {
                label: "React",
                data: [32, 42, 51, 60, 51, 95, 97],
                backgroundColor: "#0CD3FF",
                borderColor: "#0CD3FF",
                borderWidth: 1,
            },
            {
                label: "Angular",
                data: [37, 42, 41, 37, 31, 44, 42],
                backgroundColor: "#a6120d",
                borderColor: "#a6120d",
                borderWidth: 1,
            },
            {
                label: "Vue",
                data: [60, 54, 54, 28, 27, 49, 52],
                backgroundColor: "#FFCA29",
                borderColor: "#FFCA29",
                borderWidth: 1,
            },
        ],
    };

    // 옵션 설정
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    const monthlyChart = () => {

    }
    return (
        <div className="status_container">
            {/* 월별 상태 섹션 (작년/올해) */}
            <div className="monthly_status_section">
                <h2>월별 매출 현황</h2>
                <Bar data={data} options={options} />
            </div>
            {/* 판매 및 제품 섹션 (상위 5개만 출력) */}
            <div className="sales_product_section">
                <p>상품별 판매량</p>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

export default StoreStatus;