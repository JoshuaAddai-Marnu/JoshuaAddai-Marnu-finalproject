import React, { useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/Layouts';
import { plus, circle } from '../../Utils/Icons';

function Goals() {
    const [goals, setGoals] = useState([]);
    const [goalName, setGoalName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [contribution, setContribution] = useState('');
    const [selectedGoal, setSelectedGoal] = useState('');

    // Function to add a new goal
    const addGoal = (e) => {
        e.preventDefault();
        const newGoal = {
            id: Date.now(),
            name: goalName,
            targetAmount: parseFloat(targetAmount),
            contributedAmount: 0
        };
        setGoals([...goals, newGoal]);
        setGoalName('');
        setTargetAmount('');
    };

    // Function to contribute to a goal
    const contributeToGoal = (e) => {
        e.preventDefault();
        const updatedGoals = goals.map(goal => {
            if (goal.id === parseInt(selectedGoal)) {
                return {
                    ...goal,
                    contributedAmount: goal.contributedAmount + parseFloat(contribution)
                };
            }
            return goal;
        });
        setGoals(updatedGoals);
        setContribution('');
    };

    return (
        <GoalStyled>
            <InnerLayout>
                <h1>Set Financial Goals</h1>

                <GoalForm onSubmit={addGoal}>
                    <h2>{plus} Add New Goal</h2>
                    <input
                        type="text"
                        placeholder="Goal Name"
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Target Amount (£)"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(e.target.value)}
                        required
                    />
                    <button type="submit">Add Goal</button>
                </GoalForm>

                <GoalForm onSubmit={contributeToGoal}>
                    <h2>{circle} Contribute to Goal</h2>
                    <select
                        value={selectedGoal}
                        onChange={(e) => setSelectedGoal(e.target.value)}
                        required
                    >
                        <option value="">Select Goal</option>
                        {goals.map(goal => (
                            <option key={goal.id} value={goal.id}>{goal.name}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Contribution (£)"
                        value={contribution}
                        onChange={(e) => setContribution(e.target.value)}
                        required
                    />
                    <button type="submit">Contribute</button>
                </GoalForm>

                <GoalList>
                    <h2>Your Goals</h2>
                    {goals.map(goal => (
                        <div key={goal.id} className="goal-item">
                            <h3>{goal.name}</h3>
                            <p>Target: £{goal.targetAmount.toFixed(2)}</p>
                            <p>Contributed: £{goal.contributedAmount.toFixed(2)}</p>
                            <p>Progress: {((goal.contributedAmount / goal.targetAmount) * 100).toFixed(2)}%</p>
                            <ProgressBar progress={(goal.contributedAmount / goal.targetAmount) * 100} />
                        </div>
                    ))}
                </GoalList>
            </InnerLayout>
        </GoalStyled>
    );
}

const GoalStyled = styled.div`
    padding: 2rem;
    background: var(--background-color); // Use the global background color
    border-radius: 10px;
    max-width: 800px; // Increased max-width for better readability
    margin: 2rem auto;
    text-align: center;

    h1 {
        font-size: 2rem;
        color: var(--primary-color); // Use global primary color
    }
`;

const GoalForm = styled.form`
    margin-bottom: 2rem;

    h2 {
        margin-bottom: 1rem;
        font-size: 1.5rem;
        color: var(--primary-color); // Use global primary color
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    input, select {
        width: 100%;
        padding: 0.75rem;
        margin: 0.5rem 0;
        border-radius: 5px;
        border: 1px solid #ddd;
        font-size: 1rem;
        background: var(--input-background-color); // Use global input background color
    }

    button {
        padding: 0.75rem 2rem;
        border: none;
        border-radius: 5px;
        background-color: var(--button-bg-color); // Use global button background color
        color: var(--button-text-color); // Use global button text color
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: var(--button-hover-bg-color); // Use global button hover color
        }
    }
`;

const GoalList = styled.div`
    h2 {
        margin-bottom: 1rem;
        font-size: 1.5rem;
        color: var(--primary-color); // Use global primary color
    }

    .goal-item {
        background: white;
        border-radius: 10px;
        padding: 1rem;
        margin-bottom: 1rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

        h3 {
            font-size: 1.25rem;
            color: var(--primary-color); // Use global primary color
        }

        p {
            margin: 0.25rem 0;
            font-size: 1rem;
            color: var(--text-color); // Use global text color
        }
    }
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 20px;
    background: #ddd;
    border-radius: 10px;
    margin-top: 0.5rem;
    position: relative;

    &::after {
        content: '';
        display: block;
        height: 100%;
        width: ${({ progress }) => progress}%;
        background-color: var(--progress-bar-color); // Use global progress bar color
        border-radius: 10px;
        transition: width 0.3s ease;
    }
`;

export default Goals;
