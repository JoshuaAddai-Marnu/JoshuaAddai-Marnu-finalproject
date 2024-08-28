import React from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/Layouts';
import { Link } from 'react-router-dom';

function WageCalculatorGuide() {
    return (
        <GuideStyled>
            <InnerLayout>
                <h1>Wage Calculator User Guide</h1>
                <p>
                    The Wage Calculator helps you calculate your gross and net hourly wages based on your annual salary, estimated deductions, and total working hours per year. Here’s a detailed guide on how to use the Wage Calculator.
                </p>
                <h2>Using the Wage Calculator</h2>
                <p>
                    To calculate your wages, follow these steps:
                </p>
                <ol>
                    <li>Navigate to the Wage Calculator page from the home screen.</li>
                    <li>In the form provided, enter the following details:
                        <ul>
                            <li><strong>Gross Annual Salary:</strong> Your total earnings before any deductions.</li>
                            <li><strong>Estimated Deductions:</strong> The estimated total amount deducted for taxes, insurance, etc.</li>
                            <li><strong>Total Working Hours per Year:</strong> The total number of hours you work in a year.</li>
                        </ul>
                    </li>
                    <li>Click on the "Calculate" button to see your results.</li>
                </ol>
                <h2>Understanding the Results</h2>
                <p>
                    After calculating, you will see two results:
                </p>
                <ul>
                    <li><strong>Gross Hourly Wage:</strong> This is your hourly wage before any deductions.</li>
                    <li><strong>Net Hourly Wage:</strong> This is your hourly wage after estimated deductions have been applied.</li>
                </ul>
                <h2>Error Handling</h2>
                <p>
                    If any of the inputs are invalid (e.g., negative numbers), an error message will be displayed. Please ensure all values are positive numbers.
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

export default WageCalculatorGuide;
