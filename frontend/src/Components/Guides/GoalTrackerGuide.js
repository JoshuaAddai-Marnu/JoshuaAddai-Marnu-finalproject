import React from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/Layouts';
import { Link } from 'react-router-dom';

function GoalTrackerGuide() {
    return (
        <GuideStyled>
            <InnerLayout>
                <h1>Goal Tracker User Guide</h1>
                <p>
                    The Goal Tracker helps you set and achieve your financial goals by tracking your progress. Here's a detailed guide on how to use the Goal Tracker.
                </p>
                <h2>Adding a New Goal</h2>
                <p>
                    To add a new goal, follow these steps:
                </p>
                <ol>
                    <li>Navigate to the Goal Tracker page from the home screen.</li>
                    <li>In the form provided, fill in the details of your goal:
                        <ul>
                            <li><strong>Goal Name:</strong> A brief description of the goal (e.g., "Emergency Fund").</li>
                            <li><strong>Target Amount:</strong> The total amount you aim to save.</li>
                            <li><strong>Goal Date:</strong> The date by which you want to achieve the goal.</li>
                        </ul>
                    </li>
                    <li>Click on the "Add" button to save the entry.</li>
                </ol>
                <h2>Managing Goals</h2>
                <p>
                    You can view all your goals in a list. Each entry will display the goal name, target amount, amount contributed, remaining balance, and progress. You can also:
                </p>
                <ul>
                    <li><strong>Edit:</strong> Click the "Edit" button next to a goal entry to modify its details.</li>
                    <li><strong>Delete:</strong> Click the "Delete" button to remove a goal entry from the list.</li>
                </ul>
                <h2>Contributing to a Goal</h2>
                <p>
                    To record a contribution made toward a goal, follow these steps:
                </p>
                <ol>
                    <li>Select the goal from the "Contribute to Goal" form.</li>
                    <li>Enter the contribution amount and date.</li>
                    <li>Click the "Contribute" button to record the contribution.</li>
                </ol>
                <h2>Contribution Details</h2>
                <p>
                    You can view the contribution history for each goal by expanding the "Contributions" section. This will display all the contributions made, along with the dates.
                </p>
                <h2>Bar Chart Visualization</h2>
                <p>
                    The Goal Tracker includes a bar chart that visually represents the progress you've made toward each goal.
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

export default GoalTrackerGuide;
