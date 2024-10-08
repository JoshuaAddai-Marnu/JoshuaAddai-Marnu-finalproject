import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../Context/globalContext';
import { InnerLayout } from '../../Styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';

// Registering Chart.js elements for Pie chart
ChartJs.register(ArcElement, Tooltip, Legend);

// Expenses component for displaying and managing expenses
function Expenses() {
    const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();

    // Fetch expenses when the component is mounted
    useEffect(() => {
        getExpenses(); // Fetch the expenses from the API
    }, []);

    // Prepare data for the pie chart by categorizing expenses
    const expenseCategories = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount; // Sum up the amounts for each category
        return acc;
    }, {});

    // Configuration for Pie chart data
    const pieData = {
        labels: Object.keys(expenseCategories),
        datasets: [
            {
                data: Object.values(expenseCategories),
                backgroundColor: [
                    '#f44336', // red
                    '#ff9800', // orange
                    '#2196f3', // blue
                    '#9c27b0', // purple
                    '#00bcd4', // cyan
                    '#4caf50', // green
                    '#ffeb3b', // yellow
                    '#ff5722', // deep orange
                    '#673ab7', // deep purple
                    '#3f51b5', // indigo
                    '#8bc34a', // light green
                    '#cddc39', // lime
                    '#ffc107', // amber
                    '#795548', // brown
                    '#607d8b', // blue grey
                    '#e91e63', // pink
                ],
                borderWidth: 1,
            },
        ],
    };

    // Array of motivational speeches
    const motivationalSpeeches = [
        "Cutting back now means a brighter future ahead!",
        "Every penny saved adds up. Start small, think big!",
        "Small sacrifices today lead to big rewards tomorrow.",
        "A wise spender is a future saver.",
        "Reduce expenses, increase freedom.",
        "Spend smart, save hard, live free.",
        "Less spending today means more freedom tomorrow.",
        "Frugality is the first step to wealth.",
        "Smart spending is smart living.",
        "The less you need, the richer you become."
    ];

    // Function to get a random motivational speech
    const getRandomSpeech = () => {
        const randomIndex = Math.floor(Math.random() * motivationalSpeeches.length);
        return motivationalSpeeches[randomIndex];
    };

    // State to store the current motivational message
    const [currentMessage, setCurrentMessage] = useState(getRandomSpeech());

    // Set up an interval to change the message every 7 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage(getRandomSpeech());
        }, 7000); // 7000ms = 7 seconds

        return () => clearInterval(interval); // Clear the interval when the component unmounts
    }, []);

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-income">Total Expense: <span>£{totalExpenses()}</span></h2>
                <div className="income-content">
                    <div className="form-and-list">
                        <div className="form-container">
                            <ExpenseForm /> {/* Expense form to add new expenses */}
                        </div>

                    </div>
                    <PieChartContainer>
                        <h3>Expense Distribution by Category</h3>
                        <Pie data={pieData} /> {/* Pie chart showing distribution of expenses */}
                        <MotivationalMessage>
                            {currentMessage} {/* Display the current motivational message */}
                        </MotivationalMessage>
                    </PieChartContainer>
                </div>
                <ExpensesContainer>
                    {/* Map over the list of expenses and display each using ExpenseItem component */}
                    {expenses.map((expense) => {
                        const { _id, title, amount, date, category, description, type } = expense;
                        return (
                            <IncomeItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                type={type}
                                category={category}
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense} // Function to delete an expense
                            />
                        );
                    })}
                </ExpensesContainer>
            </InnerLayout>

        </ExpenseStyled>
    );
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;

    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: 0.5rem;

        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }

    .income-content {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
    }

    .form-and-list {
        flex: 2;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
`;

const ExpensesContainer = styled.div`
    flex: 1;
    max-height: 500px; /* You can adjust this height as needed */
    overflow-y: auto;
    margin-top: 50px;
    padding-right: 1rem; /* To avoid content being hidden behind the scrollbar */

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--color-green);
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background-color: #f1f1f1;
        border-radius: 10px;
    }
`;

const PieChartContainer = styled.div`
    flex: 1;
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    max-width: 400px;
    height: 530px; /* Set a fixed height */

    h3 {
        text-align: center;
        margin-bottom: 1rem;
    }

    canvas {
        max-width: 100%;
        height: 100px; /* Adjust the canvas height accordingly */
    }
`;

const MotivationalMessage = styled.p`
    margin-top: 1rem;
    text-align: center;
    font-size: 1.5rem; /* Larger font size */
    font-weight: 700; /* Bold font */
    font-style: italic; /* Italic font */
    color: #333;
    font-family: 'Poppins', sans-serif; /* Apply the Poppins font here */
`;

export default Expenses;
