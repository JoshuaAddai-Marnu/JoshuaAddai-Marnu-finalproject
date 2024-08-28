import React from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/Layouts';
import { Link } from 'react-router-dom';

function IncomeTrackerGuide() {
    return (
        <GuideStyled>
            <InnerLayout>
                <h1>Income Tracker User Guide</h1>
                <p>
                    The Income Tracker allows you to record and manage all your sources of income in one place. Below is a detailed guide on how to use the Income Tracker effectively.
                </p>
                <h2>Adding a New Income Entry</h2>
                <p>
                    To add a new income entry, follow these steps:
                </p>
                <ol>
                    <li>Navigate to the Income Tracker page from the home screen.</li>
                    <li>In the form provided, fill in the details of your income:
                        <ul>
                            <li><strong>Title:</strong> A brief description of the income source (e.g., "Freelance Project").</li>
                            <li><strong>Amount:</strong> The total amount earned.</li>
                            <li><strong>Date:</strong> The date when the income was received.</li>
                            <li><strong>Category:</strong> Select a category that best describes the income source (e.g., Salary, Freelancing, etc.). You can also create a new category by selecting "Add New".</li>
                            <li><strong>Description:</strong> Optionally, add more details about the income source.</li>
                        </ul>
                    </li>
                    <li>Click on the "Add Income" button to save the entry.</li>
                </ol>
                <h2>Viewing and Managing Income Entries</h2>
                <p>
                    Once income entries are added, you can view them in a list. Each entry will display the title, amount, date, category, and description. You can also:
                </p>
                <ul>
                    <li><strong>Edit:</strong> Click the "Edit" button next to an income entry to modify its details.</li>
                    <li><strong>Delete:</strong> Click the "Delete" button to remove an income entry from the list.</li>
                </ul>
                <h2>Pie Chart Visualization</h2>
                <p>
                    The Income Tracker includes a pie chart that visually represents your income distribution by category. This helps you quickly see where most of your income is coming from.
                </p>
                <h2>Motivational Messages</h2>
                <p>
                    To keep you inspired, the Income Tracker displays a random motivational message each time you view the page. These messages are designed to encourage you to continue growing your income and achieving your financial goals.
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

export default IncomeTrackerGuide;
