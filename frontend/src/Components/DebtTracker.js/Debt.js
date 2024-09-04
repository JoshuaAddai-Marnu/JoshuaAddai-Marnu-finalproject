import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { InnerLayout } from "../../Styles/Layouts";
import Button from "../Button/Button";
import { plus, circle, trash } from "../../Utils/Icons";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useGlobalContext } from "../../Context/globalContext";
import { useInput } from "../../Hooks/useInput";
import { toaster } from "../../Utils/toaster";
import { apiClient } from "../../Utils/apiClient";
import { formatAmount } from "../../Utils/formatAmount";

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BASE_URL = "http://localhost:3001/api/v1/";

function DebtTracker() {
  // Manage form inputs using custom hook
  const { inputValues, resetInputVlues, updateInputValues } = useInput({
    debtName: "",
    totalAmount: "",
    debtDate: "",
    paymentAmount: "",
    paymentDate: "",
  });
  const { debtName, totalAmount, debtDate, paymentAmount, paymentDate } = inputValues;

  // Manage component state
  const [selectedDebt, setSelectedDebt] = useState(""); // Manage currently selected debt for payment
  const [editingDebtId, setEditingDebtId] = useState(null); // Track which debt is being edited
  const [visiblePayments, setVisiblePayments] = useState({}); // Track visibility of payments for each debt

  // Get necessary actions and data from global context
  const { debts, getDebts, addDebt, updateDebt, deleteDebt } = useGlobalContext();


  // Fetch debts from the server when the component loads
  useEffect(() => {
    getDebts();
  }, []);

  // Toggle visibility of payments for a specific debt
  const togglePayments = (debtId) => {
    setVisiblePayments((prevState) => ({
      ...prevState,
      [debtId]: !prevState[debtId],
    }));
  };

  // Add a new payment to a debt
  const addPayment = async (debtId, paymentData) => {
    await apiClient
      .post(`${BASE_URL}debt/${debtId}/payments`, paymentData) // Send POST request to add a payment
      .then((res) => {
        resetInputVlues(); // Reset form values
        getDebts(); // Refresh the list of debts
        toaster.success(res?.data?.message || "An error occurred"); // Show success message
      })
      .catch((err) => {
        toaster.error(err.response?.data?.message || "An error occurred"); // Show error message
      });
  };

  // Delete a specific payment from a debt
  const deletePayment = async (debtId, paymentId) => {
    await apiClient
      .delete(`${BASE_URL}debt/${debtId}/payments/${paymentId}`) // Send DELETE request to remove payment
      .then((res) => {
        getDebts(); // Refresh the list of debts
        toaster.success(res?.data?.message || "Successfully deleted payment"); // Show success message
      })
      .catch((err) =>
        toaster.error(err.response?.data?.message || "An error occurred")
      );
  };

  // Handle form input changes
  const handleInput = (name) => (e) => {
    updateInputValues(name, e.target.value); // Update input value in form
  };

  // Add a new debt or update an existing one
  const addOrEditDebt = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!debtName || !totalAmount || parseFloat(totalAmount) <= 0) {
      toaster.error("Please enter a valid debt name, amount, and date.");
      return;
    }

    // Add new debt or update existing debt
    if (!editingDebtId) {
      await addDebt({ name: debtName, totalAmount, debtDate }).then((res) => {
        if (res.success) {
          resetInputVlues(); // Reset form values after adding
        }
      });
    } else {
      await updateDebt(editingDebtId, { name: debtName, totalAmount, debtDate }).then((res) => {
        if (res.success) {
          resetInputVlues(); // Reset form values
          setEditingDebtId(null); // Clear editing state
        }
      });
    }
  };

  // Start editing a specific debt
  const startEditingDebt = (id) => {
    const debtToEdit = debts.find((debt) => debt._id === id); // Find debt by ID
    updateInputValues("debtName", debtToEdit.name); // Populate form with debt data
    updateInputValues("totalAmount", debtToEdit.totalAmount.toString());
    const formattedDate = debtToEdit.date.slice(0, 10); // Format date for form
    updateInputValues("debtDate", formattedDate);
    setEditingDebtId(id); // Set the debt to be edited
  };

  // Make a payment for the selected debt
  const makePayment = async (e) => {
    e.preventDefault();

    // Validate payment inputs
    if (!selectedDebt || !paymentAmount || parseFloat(paymentAmount) <= 0 || !paymentDate) {
      toaster.error("Please select a debt, enter a valid payment amount, and payment date.");
      return;
    }

    // Validate payment amount before adding
    if (selectedDebt) {
      const foundDebt = debts.find((debt) => debt._id === selectedDebt);
      if (foundDebt?.totalAmount < parseFloat(paymentAmount)) {
        toaster.error("Payment amount cannot be greater than total debt amount.");
        return;
      }

      await addPayment(selectedDebt, {
        amount: parseFloat(paymentAmount),
        paymentDate,
      });// Add payment to selected debt
    }
  };

  return (
    <DebtTrackerStyled>
      <InnerLayout>
        <h1>Debt Tracker</h1>
        <ContentContainer>
          {/* Left side: Add/Edit debt form */}
          <LeftSide>
            <DebtForm onSubmit={addOrEditDebt}>
              <h2>
                {plus} {editingDebtId ? "Edit Debt" : "Add New Debt"}
              </h2>

              <input
                type="text"
                placeholder="Debt Name"
                value={debtName}
                onChange={handleInput("debtName")}
                required
                aria-label="Debt Name"
              />
              <input
                type="number"
                placeholder="Total Amount (£)"
                value={totalAmount}
                onChange={handleInput("totalAmount")}
                required
                aria-label="Total Amount in Pounds"
              />
              <input
                type="date"
                value={debtDate}
                onChange={handleInput("debtDate")}
                aria-label="Debt Date"
              />
              {/* Button for adding or updating debt */}
              <Button
                name={editingDebtId ? "Update" : "Add"}
                icon={plus}
                bPad={".8rem 1.6rem"}
                bRad={"30px"}
                bg={"var(--color-accent)"}
                color={"#fff"}
                aria-label={editingDebtId ? "Update Debt" : "Add Debt"}
              />
            </DebtForm>

            {/* Form for making a payment */}
            <DebtForm onSubmit={makePayment}>
              <h2>{circle} Make a Payment</h2>
              <select
                value={selectedDebt}
                onChange={(e) => setSelectedDebt(e.target.value)}
                required
                aria-label="Select Debt"
              >
                <option value="">Select Debt</option>
                {debts.map((debt) => (
                  <option key={debt._id} value={debt._id}>
                    {debt.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Payment (£)"
                value={paymentAmount}
                onChange={handleInput("paymentAmount")}
                required
                aria-label="Payment Amount in Pounds"
              />
              <input
                type="date"
                value={paymentDate}
                onChange={handleInput("paymentDate")}
                required
                aria-label="Payment Date"
              />
              <Button
                name={"Pay"}
                icon={plus}
                bPad={".8rem 1.6rem"}
                bRad={"30px"}
                bg={"var(--color-accent)"}
                color={"#fff"}
                aria-label="Make Payment"
              />
            </DebtForm>
          </LeftSide>

          {/* Right side: Display list of debts and payments */}
          <RightSide>
            <DebtList aria-live="polite">
              <h2>Your Debts</h2>
              {debts.length === 0 ? (
                <p>No debts added yet.</p>
              ) : (
                debts.map((debt) => (
                  <DebtItem key={debt._id} className="debt-item">
                    <h3>{debt.name}</h3>
                    <p>Total: £{formatAmount(debt.totalAmount.toFixed(2))}</p>
                    <p>Paid: £{debt.paidAmount.toFixed(2)}</p>
                    <p>
                      Remaining: £
                      {formatAmount((debt.totalAmount - debt.paidAmount).toFixed(2))}
                    </p>
                    <p>
                      Progress:{" "}
                      {formatAmount(((debt.paidAmount / debt.totalAmount) * 100).toFixed(2))}
                      %
                    </p>
                    <p>
                      Date Added: {new Date(debt.date).toLocaleDateString()}
                    </p>
                    <ButtonContainer>
                      <Button
                        name="Edit"
                        icon={circle}
                        bPad={".4rem 1rem"}
                        bRad={"20px"}
                        bg={"#f0ad4e"}
                        color={"#fff"}
                        onClick={() => startEditingDebt(debt._id)}
                      />
                      <Button
                        name="Delete"
                        icon={circle}
                        bPad={".4rem 1rem"}
                        bRad={"20px"}
                        bg={"#d9534f"}
                        color={"#fff"}
                        onClick={async () => {
                          await deleteDebt(debt._id).then(() =>
                            toaster.success("Successfully deleted debt")
                          );
                        }}
                      />
                    </ButtonContainer>
                    <TogglePaymentsButton onClick={() => togglePayments(debt._id)}>
                      {visiblePayments[debt._id] ? "Hide Payments" : "Show Payments"}
                    </TogglePaymentsButton>
                    {visiblePayments[debt._id] && (
                      <PaymentsList>
                        {debt.payments && debt.payments.length > 0 ? (
                          debt.payments.map((payment, i) => (
                            <PaymentDetail key={payment._id}>
                              {i + 1}. £{formatAmount(payment.amount.toFixed(2))}{" "}
                              on {new Date(payment.date).toLocaleDateString()}
                              <DeletePaymentButton
                                onClick={() => deletePayment(debt._id, payment._id)}
                              >
                                {trash}
                              </DeletePaymentButton>
                            </PaymentDetail>
                          ))
                        ) : (
                          <p>No payments made yet.</p>
                        )}
                      </PaymentsList>
                    )}
                    <BarChart
                      progress={(debt.paidAmount / debt.totalAmount) * 100}
                    />
                  </DebtItem>
                ))
              )}
            </DebtList>
          </RightSide>
        </ContentContainer>
      </InnerLayout>
    </DebtTrackerStyled>
  );
}

// Fade-in animation for Debt Items
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

const PaymentsList = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const PaymentDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const DeletePaymentButton = styled.button`
  background: none;
  border: none;
  color: #d9534f;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  margin-left: 0.5rem;
`;

const DebtTrackerStyled = styled.div`
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

const DebtForm = styled.form`
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

const DebtList = styled.div`
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

const DebtItem = styled.div`
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

const TogglePaymentsButton = styled.button`
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

export default DebtTracker;
