import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/Layouts';
import { useGlobalContext } from '../../Context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJs.register(ArcElement, Tooltip, Legend);

function Income() {
    const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

    useEffect(() => {
        getIncomes();
    }, []);

    // Preparing data for the pie chart
    const incomeCategories = incomes.reduce((acc, income) => {
        acc[income.category] = (acc[income.category] || 0) + income.amount;
        return acc;
    }, {});

    const pieData = {
        labels: Object.keys(incomeCategories),
        datasets: [
            {
                data: Object.values(incomeCategories),
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

    // Array of motivational speeches for income
    const motivationalSpeeches = [
        "Opportunities don't happen, you create them.",
        "Your income can grow as fast as your ambition.",
        "Hard work beats talent when talent doesn’t work hard.",
        "Don’t watch the clock; do what it does. Keep going.",
        "The only way to do great work is to love what you do.",
        "Invest in yourself; it pays the best interest.",
        "Income rarely exceeds personal development.",
        "The harder you work, the luckier you get.",
        "Success is not in what you have, but who you are.",
        "Earn more by giving more."
    ];

    // Function to get a random motivational speech
    const getRandomSpeech = () => {
        const randomIndex = Math.floor(Math.random() * motivationalSpeeches.length);
        return motivationalSpeeches[randomIndex];
    };

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Income</h1>
                <h2 className="total-income">
                    Total Income: <span>£{totalIncome()}</span>
                </h2>
                <div className="income-content">
                    <div className="form-and-list">
                        <div className="form-container">
                            <Form />
                        </div>
                        <IncomesContainer>
                            {incomes.map((income) => {
                                const { _id, title, amount, date, category, description, type } = income;
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
                                        deleteItem={deleteIncome}
                                    />
                                );
                            })}
                        </IncomesContainer>
                    </div>
                    <PieChartContainer>
                        <h3>Income Distribution by Category</h3>
                        <Pie data={pieData} />
                        <MotivationalMessage>
                            {getRandomSpeech()}
                        </MotivationalMessage>
                    </PieChartContainer>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
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

const IncomesContainer = styled.div`
    flex: 1;
    max-height: 500px; /* Adjust this height as needed */
    overflow-y: auto;
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

    h3 {
        text-align: center;
        margin-bottom: 1rem;
    }

    canvas {
        max-width: 100%;
        height: auto;
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

export default Income;
