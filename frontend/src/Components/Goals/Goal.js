import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { InnerLayout } from "../../Styles/Layouts";
import Button from "../Button/Button";
import { plus, circle, trash } from "../../Utils/Icons";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";

// Hooks and utility functions
import { useInput } from "../../Hooks/useInput"; // Custom hook to manage input state
import { toaster } from "../../Utils/toaster"; // Toaster for displaying success/error messages
import { apiClient } from "../../Utils/apiClient"; // API client for making HTTP requests
import { formatAmount } from "../../Utils/formatAmount"; // Utility to format currency
import { useGlobalContext } from "../../Context/globalContext"; // Importing global context

// Registering necessary Chart.js components
ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// API base URL
const BASE_URL = "http://localhost:3001/api/v1/";

function Goals() {
  // Using a custom hook to manage the form inputs
  const { inputValues, resetInputVlues, updateInputValues } = useInput({
    goalName: "",
    goalDate: "",
    targetAmount: "",
    contribution: "",
    contributionDate: "",
    editingGoalId: "",
    selectedGoal: "",
  });

  // Fetching global context for goals and related actions
  const { goals, getGoals, addGoal, updateGoal, deleteGoal } =
    useGlobalContext();


  // Fetch goals when the component is mounted
  useEffect(() => {
    getGoals();
  }, []);

  const {
    goalName,
    targetAmount,
    goalDate,
    contribution,
    editingGoalId,
    selectedGoal,
    contributionDate,
  } = inputValues;

  // State to manage the visibility of contributions
  const [visibleContributions, setVisibleContributions] = useState({});

  // Toggle the visibility of contributions for a particular goal
  const toggleContributions = (goalId) => {
    setVisibleContributions((prevState) => ({
      ...prevState,
      [goalId]: !prevState[goalId],
    }));
  };

  // Function to handle adding a contribution to a goal
  const addContribution = async (goalId, contributionData) => {
    await apiClient
      .post(`${BASE_URL}goals/${goalId}/contributions`, contributionData)
      .then((res) => {
        resetInputVlues(); // Reset form inputs
        getGoals(); // Fetch updated goals
        toaster.success(res?.data?.message || "An error occurred");
      })
      .catch((err) => {
        toaster.error(err.response?.data?.message || "An error occurred");
      });
  };

  // Function to delete a contribution from a goal
  const deleteContribution = async (goalId, contributionId) => {
    await apiClient
      .delete(`${BASE_URL}goals/${goalId}/contributions/${contributionId}`)
      .then((res) => {
        getGoals(); // Fetch updated goals
        toaster.success(res?.data?.message || "An error occurred");
      })
      .catch((err) =>
        toaster.error(err.response?.data?.message || "An error occurred")
      );
  };

  // Function to handle adding or editing a goal
  const addOrEditGoal = async (e) => {
    e.preventDefault();

    // Validate inputs before proceeding
    if (!goalName || !targetAmount || parseFloat(targetAmount) <= 0 || !goalDate) {
      toaster.error("Please enter a valid goal name, target amount and goal date");
      return;
    }

    // Preparing goal data to be submitted
    const goalData = {
      name: goalName,
      targetAmount,
      goalDate,
    };

    // Add a new goal or update an existing one
    if (!editingGoalId) {
      await addGoal(goalData).then((res) => {
        if (res.success) {
          resetInputVlues(); // Reset form after successful addition
        }
      });
    } else {
      await updateGoal(editingGoalId, goalData).then((res) => {
        if (res.success) {
          resetInputVlues(); // Reset form
          updateInputValues("editingGoalId", null); // Reset editing state
        }
      });
    }
  };

  // Function to delete a goal
  const deleteGoalWithId = async (id) => {
    await deleteGoal(id);
  };

  // Set up form inputs for editing a goal
  const startEditingGoal = (goal) => {
    updateInputValues("goalName", goal.name);
    updateInputValues("targetAmount", goal.targetAmount.toString());
    const formattedDate = goal.date;
    updateInputValues("goalDate", formattedDate);
    updateInputValues("editingGoalId", goal._id);
  };


  // Function to contribute to a goal
  const contributeToGoal = async (e) => {
    e.preventDefault();

    // Validate contribution input
    if (!selectedGoal || !contribution || parseFloat(contribution) <= 0 || !contributionDate) {
      toaster.error("Please select a goal, enter a valid contribution amount, and date.");
      return;
    }

    const foundGoal = goals.find((goal) => goal._id === selectedGoal);

    // Ensure contribution doesn't exceed target amount
    if (foundGoal?.targetAmount < parseFloat(contribution)) {
      toaster.error(
        "Contribution amount cannot be greater than remaining goal amount."
      );
      return;
    }

    // Add contribution to the selected goal
    await addContribution(selectedGoal, {
      amount: parseFloat(contribution),
      contributionDate,
    });
  };

  // delete contribution
  const deleteContributionFromGoal = async (goalId, contributionId) => {
    await deleteContribution(goalId, contributionId);
  };

  // Handle form input changes dynamically
  const handleInput = (name) => (e) => {
    updateInputValues(name, e.target.value);
  };

  return (
    <GoalsStyled>
      <InnerLayout>
        <h1>Set Your Goals</h1>
        <ContentContainer>
          <LeftSide>
            <GoalForm onSubmit={addOrEditGoal}>
              <h2>
                {plus} {editingGoalId ? "Edit Goal" : "Add New Goal"}
              </h2>
              {/* Goal input fields */}
              <input
                type="text"
                placeholder="Goal Name"
                value={goalName}
                onChange={handleInput("goalName")}
                required
                aria-label="Goal Name"
              />
              <input
                type="number"
                placeholder="Target Amount (£)"
                value={targetAmount}
                onChange={handleInput("targetAmount")}
                required
                aria-label="Target Amount in Pounds"
              />
              <input
                type="date"
                value={goalDate}
                onChange={handleInput("goalDate")}
                required
                aria-label="Goal Date"
              />
              <Button
                name={editingGoalId ? "Update" : "Add"}
                icon={plus}
                bPad={".8rem 1.6rem"}
                bRad={"30px"}
                bg={"var(--color-accent)"}
                color={"#fff"}
                aria-label={editingGoalId ? "Update Goal" : "Add Goal"}
              />
            </GoalForm>

            {/* Form for contributing to a goal */}
            <GoalForm onSubmit={contributeToGoal}>
              <h2>{circle} Contribute to Goal</h2>

              {/* Dropdown to select a goal */}
              <select
                value={selectedGoal}
                onChange={handleInput("selectedGoal")}
                required
                aria-label="Select Goal"
              >
                <option value="">Select Goal</option>
                {goals.map((goal) => (
                  <option key={goal._id} value={goal._id}>
                    {goal.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Contribution (£)"
                value={contribution}
                onChange={handleInput("contribution")}
                required
                aria-label="Contribution Amount in Pounds"
              />
              <input
                type="date"
                value={contributionDate}
                onChange={handleInput("contributionDate")}
                required
                aria-label="Contribution Date"
              />
              <Button
                name={"Contribute"}
                icon={plus}
                bPad={".8rem 1.6rem"}
                bRad={"30px"}
                bg={"var(--color-accent)"}
                color={"#fff"}
                aria-label="Make Contribution"
              />
            </GoalForm>
          </LeftSide>

          {/* Display the list of goals */}
          <RightSide>
            <GoalList aria-live="polite">
              <h2>Your Goals</h2>
              {goals.length === 0 ? (
                <p>No goals added yet.</p>
              ) : (
                goals.map((goal) => (
                  <GoalItem key={goal._id} className="goal-item">
                    <h3>{goal.name}</h3>
                    <p>Target: £{goal.targetAmount.toFixed(2)}</p>
                    <p>Contributed: £{goal.contributedAmount.toFixed(2)}</p>
                    <p>
                      Remaining: £
                      {(goal.targetAmount - goal.contributedAmount).toFixed(2)}
                    </p>
                    <p>
                      Progress:{" "}
                      {(
                        (goal.contributedAmount / goal.targetAmount) *
                        100
                      ).toFixed(2)}
                      %
                    </p>
                    <p>
                      Date Added:{" "}
                      {new Date(goal.createdAt).toLocaleDateString()}
                    </p>
                    <p>Goal Date: {new Date(goal.date).toLocaleDateString()}</p>
                    <ButtonContainer>
                      <Button
                        name="Edit"
                        icon={circle}
                        bPad={".4rem 1rem"}
                        bRad={"20px"}
                        bg={"#f0ad4e"}
                        color={"#fff"}
                        onClick={() => startEditingGoal(goal)}
                      />
                      <Button
                        name="Delete"
                        icon={trash}
                        bPad={".4rem 1rem"}
                        bRad={"20px"}
                        bg={"#d9534f"}
                        color={"#fff"}
                        onClick={() => deleteGoalWithId(goal._id)}
                      />
                    </ButtonContainer>

                    {/* Toggle button to view contributions */}
                    <ToggleContributionsButton onClick={() => toggleContributions(goal._id)}>
                      {visibleContributions[goal._id] ? "Hide Contributions" : "View Contributions"}
                    </ToggleContributionsButton>

                    {/* List of contributions */}
                    {visibleContributions[goal._id] && (
                      <ContributionsList>
                        <h4>Contributions:</h4>
                        {goal.contributions.map((contribution, i) => (
                          <ContributionItem key={contribution._id}>
                            {i + 1}. £
                            {formatAmount(contribution.amount.toFixed(2))} on{" "}
                            {new Date(contribution.date).toLocaleDateString()}
                            <DeleteContributionButton
                              onClick={() =>
                                deleteContributionFromGoal(
                                  goal._id,
                                  contribution._id
                                )
                              }
                            >
                              {trash}
                            </DeleteContributionButton>
                          </ContributionItem>
                        ))}
                      </ContributionsList>
                    )}

                    {/* Display progress as a bar chart */}
                    <BarChart
                      progress={
                        (goal.contributedAmount / goal.targetAmount) * 100
                      }
                    />
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

  input,
  select {
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
  background: #fcf6f9;
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

const ContributionsList = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const ContributionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const DeleteContributionButton = styled.button`
  background: none;
  border: none;
  color: #d9534f;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  margin-left: 0.5rem;
`;

const ToggleContributionsButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const BarChart = ({ progress }) => {
  const data = {
    labels: ["Progress"],
    datasets: [
      {
        label: "Contributed (%)",
        data: [progress],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Remaining (%)",
        data: [100 - progress],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
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
    <div style={{ height: "50px", width: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Goals;
