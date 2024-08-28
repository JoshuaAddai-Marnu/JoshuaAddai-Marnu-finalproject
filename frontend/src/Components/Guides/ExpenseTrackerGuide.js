import React from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/Layouts';
import { Link } from 'react-router-dom';

function ExpenseTrackerGuide() {
    return (
        <GuideStyled>
            <InnerLayout>
                <h1>Expense Tracker User Guide</h1>
                <p>
                    The Expense Tracker allows you to monitor and manage your spending. Here's a comprehensive guide to help you use the Expense Tracker effectively.
                </p>
                <h2>Adding a New Expense Entry</h2>
                <p>
                    To add a new expense entry, follow these steps:
                </p>
                <ol>
                    <li>Navigate to the Expense Tracker page from the home screen.</li>
                    <li>In the form provided, fill in the details of your expense:
                        <ul>
                            <li><strong>Title:</strong> A brief description of the expense (e.g., "Grocery Shopping").</li>
                            <li><strong>Amount:</strong> The total amount spent.</li>
                            <li><strong>Date:</strong> The date when the expense was made.</li>
                            <li><strong>Category:</strong> Select a category that best describes the expense (e.g., Groceries, Health, etc.). You can also create a new category by selecting "Add New".</li>
                            <li><strong>Description:</strong> Optionally, add more details about the expense.</li>
                        </ul>
                    </li>
                    <li>Click on the "Add Expense" button to save the entry.</li>
                </ol>
                <h2>Viewing and Managing Expense Entries</h2>
                <p>
                    Once expense entries are added, you can view them in a list. Each entry will display the title, amount, date, category, and description. You can also:
                </p>
                <ul>
                    <li><strong>Edit:</strong> Click the "Edit" button next to an expense entry to modify its details.</li>
                    <li><strong>Delete:</strong> Click the "Delete" button to remove an expense entry from the list.</li>
                </ul>
                <h2>Pie Chart Visualization</h2>
                <p>
                    The Expense Tracker includes a pie chart that visually represents your expenses by category. This helps you quickly see where most of your money is going.
                </p>
                <h2>Motivational Messages</h2>
                <p>
                    To keep you motivated, the Expense Tracker displays a random motivational message each time you view the page. These messages are designed to encourage you to manage your spending effectively.
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

export default ExpenseTrackerGuide;
