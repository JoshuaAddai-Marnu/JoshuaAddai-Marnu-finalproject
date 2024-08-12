import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { InnerLayout } from '../../Styles/Layouts';
import Button from '../Button/Button';
import { plus, circle } from '../../Utils/Icons';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Goals() {
    const [goals, setGoals] = useState([]);
    const [goalName, setGoalName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [contribution, setContribution] = useState('');
    const [selectedGoal, setSelectedGoal] = useState('');
    const [goalDate, setGoalDate] = useState('');
    const [contributionDate, setContributionDate] = useState('');
    const [editingGoalId, setEditingGoalId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [contributionError, setContributionError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Function to add or edit a goal
    const addOrEditGoal = (e) => {
        e.preventDefault();

        if (!goalName || !targetAmount || parseFloat(targetAmount) <= 0 || !goalDate) {
            setErrorMessage('Please enter a valid goal name, target amount, and date.');
            setSuccessMessage('');
            return;
        }

        const newGoal = {
            id: editingGoalId || Date.now(),
            name: goalName,
            targetAmount: parseFloat(targetAmount),
            contributedAmount: editingGoalId
                ? goals.find(goal => goal.id === editingGoalId).contributedAmount
                : 0,
            dateAdded: goalDate,
            contributions: editingGoalId
                ? goals.find(goal => goal.id === editingGoalId).contributions
                : [],
            showContributions: false,
        };

        if (editingGoalId) {
            // Update existing goal
            setGoals(goals.map(goal => (goal.id === editingGoalId ? newGoal : goal)));
            setEditingGoalId(null);
            setSuccessMessage('Goal updated successfully!');
        } else {
            // Add new goal
            setGoals([...goals, newGoal]);
            setSuccessMessage('Goal added successfully!');
        }

        setGoalName('');
        setTargetAmount('');
        setGoalDate('');
        setErrorMessage('');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    // Function to delete a goal
    const deleteGoal = (id) => {
        setGoals(goals.filter(goal => goal.id !== id));
        setSuccessMessage('Goal deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    // Function to edit a goal
    const startEditingGoal = (id) => {
        const goalToEdit = goals.find(goal => goal.id === id);
        setGoalName(goalToEdit.name);
        setTargetAmount(goalToEdit.targetAmount.toString());
        setGoalDate(goalToEdit.dateAdded);
        setEditingGoalId(id);
    };

    // Function to contribute to a goal
    const contributeToGoal = (e) => {
        e.preventDefault();

        if (!selectedGoal || !contribution || parseFloat(contribution) <= 0 || !contributionDate) {
            setContributionError('Please select a goal, enter a valid contribution amount, and select a contribution date.');
            setSuccessMessage('');
            return;
        }

        const updatedGoals = goals.map(goal => {
            if (goal.id === parseInt(selectedGoal)) {
                const newContributedAmount = goal.contributedAmount + parseFloat(contribution);
                if (newContributedAmount > goal.targetAmount) {
                    setContributionError('Contribution exceeds the target amount.');
                    setSuccessMessage('');
                    return goal;
                }
                const newContribution = {
                    amount: parseFloat(contribution),
                    date: contributionDate
                };
                return {
                    ...goal,
                    contributedAmount: newContributedAmount,
                    contributions: [...goal.contributions, newContribution],
                };
            }
            return goal;
        });
        setGoals(updatedGoals);
        setContribution('');
        setContributionDate('');
        setSelectedGoal('');
        setContributionError('');
        setSuccessMessage('Contribution made successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    // Function to toggle the visibility of contribution details
    const toggleContributions = (id) => {
        setGoals(goals.map(goal =>
            goal.id === id ? { ...goal, showContributions: !goal.showContributions } : goal
        ));
    };

    return (
        <GoalsStyled>
            <InnerLayout>
                <h1>Set Your Goals</h1>
                <ContentContainer>
                    <LeftSide>
                        <GoalForm onSubmit={addOrEditGoal}>
                            <h2>{plus} {editingGoalId ? 'Edit Goal' : 'Add New Goal'}</h2>
                            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
                            <input
                                type="text"
                                placeholder="Goal Name"
                                value={goalName}
                                onChange={(e) => setGoalName(e.target.value)}
                                required
                                aria-label="Goal Name"
                            />
                            <input
                                type="number"
                                placeholder="Target Amount (£)"
                                value={targetAmount}
                                onChange={(e) => setTargetAmount(e.target.value)}
                                required
                                aria-label="Target Amount in Pounds"
                            />
                            <input
                                type="date"
                                value={goalDate}
                                onChange={(e) => setGoalDate(e.target.value)}
                                required
                                aria-label="Goal Date"
                            />
                            <Button
                                name={editingGoalId ? 'Update' : 'Add'}
                                icon={plus}
                                bPad={'.8rem 1.6rem'}
                                bRad={'30px'}
                                bg={'var(--color-accent)'}
                                color={'#fff'}
                                aria-label={editingGoalId ? 'Update Goal' : 'Add Goal'}
                            />
                        </GoalForm>

                        <GoalForm onSubmit={contributeToGoal}>
                            <h2>{circle} Contribute to Goal</h2>
                            {contributionError && <ErrorMessage>{contributionError}</ErrorMessage>}
                            <select
                                value={selectedGoal}
                                onChange={(e) => setSelectedGoal(e.target.value)}
                                required
                                aria-label="Select Goal"
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
                                aria-label="Contribution Amount in Pounds"
                            />
                            <input
                                type="date"
                                value={contributionDate}
                                onChange={(e) => setContributionDate(e.target.value)}
                                required
                                aria-label="Contribution Date"
                            />
                            <Button
                                name={'Contribute'}
                                icon={plus}
                                bPad={'.8rem 1.6rem'}
                                bRad={'30px'}
                                bg={'var(--color-accent)'}
                                color={'#fff'}
                                aria-label="Make Contribution"
                            />
                        </GoalForm>
                    </LeftSide>

                    <RightSide>
                        <GoalList aria-live="polite">
                            <h2>Your Goals</h2>
                            {goals.length === 0 ? (
                                <p>No goals added yet.</p>
                            ) : (
                                goals.map(goal => (
                                    <GoalItem key={goal.id} className="goal-item">
                                        <h3>{goal.name}</h3>
                                        <p>Target: £{goal.targetAmount.toFixed(2)}</p>
                                        <p>Contributed: £{goal.contributedAmount.toFixed(2)}</p>
                                        <p>Remaining: £{(goal.targetAmount - goal.contributedAmount).toFixed(2)}</p>
                                        <p>Progress: {((goal.contributedAmount / goal.targetAmount) * 100).toFixed(2)}%</p>
                                        <p>Date Added: {goal.dateAdded}</p>
                                        <ButtonContainer>
                                            <Button
                                                name="Edit"
                                                icon={circle}
                                                bPad={'.4rem 1rem'}
                                                bRad={'20px'}
                                                bg={'#f0ad4e'}
                                                color={'#fff'}
                                                onClick={() => startEditingGoal(goal.id)}
                                            />
                                            <Button
                                                name="Delete"
                                                icon={circle}
                                                bPad={'.4rem 1rem'}
                                                bRad={'20px'}
                                                bg={'#d9534f'}
                                                color={'#fff'}
                                                onClick={() => deleteGoal(goal.id)}
                                            />
                                        </ButtonContainer>
                                        <ToggleContributionsButton onClick={() => toggleContributions(goal.id)}>
                                            {goal.showContributions ? 'Hide Contribution Details' : 'Show Contribution Details'}
                                        </ToggleContributionsButton>
                                        {goal.showContributions && goal.contributions.map((contribution, index) => (
                                            <ContributionDetail key={index}>
                                                {index + 1}. Contribution of £{contribution.amount.toFixed(2)} on {contribution.date}
                                            </ContributionDetail>
                                        ))}
                                        <BarChart progress={(goal.contributedAmount / goal.targetAmount) * 100} />
                                    </GoalItem>
                                ))
                            )}
                        </GoalList>
                    </RightSide>
                </ContentContainer>
            </InnerLayout>
        </GoalsStyled>
    );
}

// Fade-in animation for Goal Items
const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const GoalsStyled = styled.div`
    padding: 0rem;
    border-radius: 10px;
    max-width: 1200px;
    margin: 1rem auto;
    text-align: left;
    background: transparent;

    h1 {
        font-size: 2.5rem;
        color: #333;
        text-align: center;
        margin-bottom: 1rem;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 2rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const LeftSide = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const RightSide = styled.div`
    flex: 2;
`;

const GoalForm = styled.form`
    background: #fff;
    padding: 1rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    text-align: center;

    h2 {
        margin-bottom: 0.5rem;
        font-size: 1.75rem;
        color: #4caf50;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        justify-content: center;
    }

    input, select {
        width: 100%;
        padding: 0.5rem 1rem;
        margin: 0.5rem 0;
        border-radius: 5px;
        border: none;
        font-size: 1rem;
        background: transparent;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);

        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }

    button {
        width: 100%;
        margin-top: 0rem;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: var(--color-green) !important;
        }
    }
`;

const GoalList = styled.div`
    background: #fff;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    max-height: 585px;
    overflow-y: auto;
    text-align: center;

    h2 {
        margin-bottom: 1rem;
        font-size: 1.75rem;
        color: #4caf50;
    }

    p {
        font-size: 1rem;
        color: #333;
    }
`;

const GoalItem = styled.div`
    background: #FCF6F9;
    border-radius: 10px;
    padding: 2rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    animation: ${fadeIn} 0.5s ease-in-out;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;

    h3 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 0.5rem;
        flex-basis: 100%;
    }

    p {
        font-size: 1rem;
        color: #555;
        flex-basis: calc(50% - 1rem);
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
    flex-basis: 100%;
    justify-content: center;
    margin-top: 1rem;
`;

const ToggleContributionsButton = styled.button`
    background-color: #4caf50;
    color: #fff;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #45a049;
    }
`;

const ContributionDetail = styled.div`
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.25rem;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 1rem;
    margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
    color: green;
    font-size: 1rem;
    margin-bottom: 1rem;
`;

const BarChart = ({ progress }) => {
    const data = {
        labels: ['Progress'],
        datasets: [
            {
                label: 'Contributed (%)',
                data: [progress],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Remaining (%)',
                data: [100 - progress],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                max: 100,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ height: '50px', width: '100%' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default Goals;
