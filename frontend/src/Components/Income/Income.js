import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../Styles/Layouts";
import { useGlobalContext } from "../../Context/globalContext";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";

// Registering necessary Chart.js components for Pie chart
ChartJs.register(ArcElement, Tooltip, Legend);

function Income() {
  // Fetching incomes and related actions from global context
  const { incomes, deleteIncome, totalIncome } = useGlobalContext();

  // Preparing data for the pie chart
  const incomeCategories = incomes.reduce((acc, income) => {
    acc[income.category] = (acc[income.category] || 0) + income.amount;
    return acc;
  }, {});

  // Data structure for the Pie chart, defining categories and colors
  const pieData = {
    labels: Object.keys(incomeCategories),
    datasets: [
      {
        data: Object.values(incomeCategories), // Income values for each category
        backgroundColor: [
          "#f44336", // red
          "#ff9800", // orange
          "#2196f3", // blue
          "#9c27b0", // purple
          "#00bcd4", // cyan
          "#4caf50", // green
          "#ffeb3b", // yellow
          "#ff5722", // deep orange
          "#673ab7", // deep purple
          "#3f51b5", // indigo
          "#8bc34a", // light green
          "#cddc39", // lime
          "#ffc107", // amber
          "#795548", // brown
          "#607d8b", // blue grey
          "#e91e63", // pink
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
    "Earn more by giving more.",
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
    <IncomeStyled>
      <InnerLayout>
        <h1>Income</h1>
        <h2 className="total-income">
          Total Income: <span>£{totalIncome()}</span>
        </h2>
        <div className="income-content">
          <div className="form-and-list">
            <div className="form-container">
              <Form /> {/* Form component for adding income */}
            </div>
          </div>
          {/* Pie chart for income distribution */}
          <PieChartContainer>
            <h3>Income Distribution by Category</h3>
            <Pie data={pieData} />
            <MotivationalMessage>{currentMessage}</MotivationalMessage>
          </PieChartContainer>
        </div>

        {/* Listing all incomes */}
        <IncomesContainer>
          {incomes.map((income) => {
            const { _id, title, amount, date, category, description, type } =
              income;
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
    background: #fcf6f9;
    border: 2px solid #ffffff;
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
  background: #fcf6f9;
  border: 2px solid #ffffff;
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
  font-family: "Poppins", sans-serif; /* Apply the Poppins font here */
`;

export default Income;
