import React from 'react';
import {
    Chart as ChartJs, // Alias for the Chart.js library
    CategoryScale, // Used for the x-axis category scaling
    LinearScale, // Used for the y-axis linear scaling
    PointElement, // Represents points in the chart
    LineElement, // Represents lines between points
    Title, // Used to display a title in the chart
    Tooltip, // Enables tooltips (popups) on hover
    Legend, // Displays a legend (key) for the datasets
    ArcElement, // Used for pie or doughnut charts (though not used in this line chart)
} from 'chart.js';
import { Line } from 'react-chartjs-2'; // Line chart component from the 'react-chartjs-2' library
import styled from 'styled-components'; // Used to style the component using tagged template literals
import { useGlobalContext } from '../../Context/globalContext'; // Custom hook to get data from the global context (likely contains incomes and expenses data)
import { dateFormat } from '../../Utils/dateFormat'; // A utility function to format dates

// Registering necessary elements and scales to Chart.js
ChartJs.register(
    CategoryScale, // For x-axis scaling
    LinearScale, // For y-axis scaling
    PointElement, // For rendering data points
    LineElement, // For rendering the line connecting data points
    Title, // To display chart title
    Tooltip, // For tooltips when hovering over data points
    Legend, // For chart legend (descriptions of datasets)
    ArcElement, // Not used in this chart but necessary for future features
);

function Chart() {
    // Accessing incomes and expenses data from the global context using a custom hook
    const { incomes, expenses } = useGlobalContext();

    // Sorting income and expense data based on date (oldest to newest)
    const sortedIncomes = incomes.sort((a, b) => new Date(a.date) - new Date(b.date));
    const sortedExpenses = expenses.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Preparing the data for the Line chart
    const data = {
        // Setting the x-axis labels as formatted dates of income entries
        labels: sortedIncomes.map((inc) => {
            const { date } = inc; // Extract the date from each income entry
            return dateFormat(date); // Format the date (likely in a readable format)
        }),
        datasets: [
            {
                label: 'Income',
                data: sortedIncomes.map((income) => income.amount), // y-axis values (income amounts)
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
                data: sortedExpenses.map((expense) => expense.amount),  // y-axis values (expense amounts)
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
