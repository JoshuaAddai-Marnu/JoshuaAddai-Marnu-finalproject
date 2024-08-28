import React from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/Layouts';
import { Link } from 'react-router-dom';

function DebtTrackerGuide() {
    return (
        <GuideStyled>
            <InnerLayout>
                <h1>Debt Tracker User Guide</h1>
                <p>
                    The Debt Tracker helps you manage your debts effectively by keeping track of what you owe and how much you've paid. Here's a detailed guide on how to use the Debt Tracker.
                </p>
                <h2>Adding a New Debt Entry</h2>
                <p>
                    To add a new debt entry, follow these steps:
                </p>
                <ol>
                    <li>Navigate to the Debt Tracker page from the home screen.</li>
                    <li>In the form provided, fill in the details of your debt:
                        <ul>
                            <li><strong>Debt Name:</strong> A brief description of the debt (e.g., "Car Loan").</li>
                            <li><strong>Total Amount:</strong> The total amount you owe.</li>
                            <li><strong>Debt Date:</strong> The date when the debt was taken.</li>
                        </ul>
                    </li>
                    <li>Click on the "Add" button to save the entry.</li>
                </ol>
                <h2>Managing Debts</h2>
                <p>
                    You can view all your debts in a list. Each entry will display the debt name, total amount, amount paid, remaining balance, and progress. You can also:
                </p>
                <ul>
                    <li><strong>Edit:</strong> Click the "Edit" button next to a debt entry to modify its details.</li>
                    <li><strong>Delete:</strong> Click the "Delete" button to remove a debt entry from the list.</li>
                </ul>
                <h2>Making Payments</h2>
                <p>
                    To record a payment made toward a debt, follow these steps:
                </p>
                <ol>
                    <li>Select the debt from the "Make a Payment" form.</li>
                    <li>Enter the payment amount and date.</li>
                    <li>Click the "Pay" button to record the payment.</li>
                </ol>
                <h2>Payment Details</h2>
                <p>
                    You can view the payment history for each debt by clicking on the "Show Payment Details" button. This will display all the payments made, along with the dates.
                </p>
                <h2>Bar Chart Visualization</h2>
                <p>
                    The Debt Tracker includes a bar chart that visually represents the progress you've made in paying off each debt.
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
export default DebtTrackerGuide;
