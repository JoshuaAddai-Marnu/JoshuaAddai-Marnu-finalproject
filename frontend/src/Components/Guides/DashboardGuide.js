import React from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/Layouts';
import { Link } from 'react-router-dom';

function DashboardGuide() {
    return (
        <GuideStyled>
            <InnerLayout>
                <h1>Dashboard User Guide</h1>
                <p>
                    The Dashboard provides a comprehensive overview of your financial status, including income, expenses, and balances. Here’s a detailed guide on how to use the Dashboard effectively.
                </p>
                <h2>Overview</h2>
                <p>
                    The Dashboard is designed to give you a quick snapshot of your financial situation. It includes the following sections:
                </p>
                <ul>
                    <li><strong>Total Income:</strong> Displays the total income you've recorded.</li>
                    <li><strong>Total Expense:</strong> Shows the total amount of expenses you've recorded.</li>
                    <li><strong>Total Balance:</strong> Shows the difference between your total income and total expenses.</li>
                </ul>
                <h2>Using the Dashboard</h2>
                <p>
                    When you navigate to the Dashboard, it automatically pulls in data from your income and expense trackers to display the following:
                </p>
                <ol>
                    <li><strong>Income and Expense Chart:</strong> A visual representation of your income and expenses.</li>
                    <li><strong>History:</strong> A chronological list of all your transactions (income and expenses).</li>
                    <li><strong>Salary Statistics:</strong> Minimum and maximum values for both income and expenses.</li>
                </ol>
                <h2>Balance Indicator</h2>
                <p>
                    The Dashboard includes a balance indicator that shows whether your total balance is positive (green) or negative (red). This helps you quickly assess your financial health.
                </p>
                <BackButtonContainer>
                    <Link to="/home" className="back-button">Back to Home</Link>
                </BackButtonContainer>
            </InnerLayout>
        </GuideStyled>
    );
}

const GuideStyled = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    h1 {
        font-size: 2.5rem;
        color: #333;
        margin-bottom: 1rem;
    }

    h2 {
        font-size: 2rem;
        color: #555;
        margin-top: 2rem;
    }

    p {
        font-size: 1.25rem;
        color: #666;
        margin-bottom: 1rem;
        line-height: 1.6;
    }

    ol, ul {
        font-size: 1.25rem;
        color: #666;
        margin-bottom: 1rem;
        line-height: 1.6;
    }

    ul {
        list-style-type: disc;
        margin-left: 2rem;
    }

    ol {
        margin-left: 2rem;
    }

    strong {
        color: #333;
    }
`;

const BackButtonContainer = styled.div`
    margin-top: 2rem;

    .back-button {
        display: inline-block;
        padding: 0.8rem 1.6rem;
        background-color: #4caf50;
        color: white;
        border-radius: 5px;
        text-decoration: none;
        font-size: 1rem;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #388e3c;
        }
    }
`;

export default DashboardGuide;
