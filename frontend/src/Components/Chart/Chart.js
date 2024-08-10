import React from 'react';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../Context/globalContext';
import { dateFormat } from '../../Utils/dateFormat';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

function Chart() {
    const { incomes, expenses } = useGlobalContext();

    // Ensure the data is sorted by date
    const sortedIncomes = incomes.sort((a, b) => new Date(a.date) - new Date(b.date));
    const sortedExpenses = expenses.sort((a, b) => new Date(a.date) - new Date(b.date));

    const data = {
        labels: sortedIncomes.map((inc) => {
            const { date } = inc;
            return dateFormat(date);
        }),
        datasets: [
            {
                label: 'Income',
                data: sortedIncomes.map((income) => income.amount),
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                pointBackgroundColor: '#4caf50',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#4caf50',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Expenses',
                data: sortedExpenses.map((expense) => expense.amount),
                borderColor: '#f44336',
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                pointBackgroundColor: '#f44336',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#f44336',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                    },
                    color: '#333',
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `£${tooltipItem.raw.toLocaleString()}`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: true, // Display vertical grid lines
                    color: 'rgba(0, 0, 0, 0.1)', // Set the color of the grid lines
                },
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                grid: {
                    display: true, // Display horizontal grid lines
                    color: 'rgba(0, 0, 0, 0.1)', // Set the color of the grid lines
                },
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    },
                    callback: (value) => `£${value}`,
                },
            },
        },
    };

    return (
        <ChartStyled>
            <Line data={data} options={options} />
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
    width: 100%;
`;

export default Chart;
