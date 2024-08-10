import React, { useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/Layouts';
import { plus, circle } from '../../Utils/Icons'; // Assuming you have Icons.js set up

function DebtTracker() {
    const [debts, setDebts] = useState([]);
    const [debtName, setDebtName] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [payment, setPayment] = useState('');
    const [selectedDebt, setSelectedDebt] = useState('');

    // Function to add a new debt
    const addDebt = (e) => {
        e.preventDefault();
        const newDebt = {
            id: Date.now(),
            name: debtName,
            totalAmount: parseFloat(totalAmount),
            paidAmount: 0
        };
        setDebts([...debts, newDebt]);
        setDebtName('');
        setTotalAmount('');
    };

    // Function to make a payment towards a debt
    const makePayment = (e) => {
        e.preventDefault();
        const updatedDebts = debts.map(debt => {
            if (debt.id === parseInt(selectedDebt)) {
                return {
                    ...debt,
                    paidAmount: debt.paidAmount + parseFloat(payment)
                };
            }
            return debt;
        });
        setDebts(updatedDebts);
        setPayment('');
    };

    return (
        <DebtTrackerStyled>
            <InnerLayout>
                <h1>Track Your Debts</h1>

                <DebtForm onSubmit={addDebt}>
                    <h2>{plus} Add New Debt</h2>
                    <input
                        type="text"
                        placeholder="Debt Name"
                        value={debtName}
                        onChange={(e) => setDebtName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Total Amount (£)"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        required
                    />
                    <button type="submit">Add Debt</button>
                </DebtForm>

                <DebtForm onSubmit={makePayment}>
                    <h2>{circle} Make a Payment</h2>
                    <select
                        value={selectedDebt}
                        onChange={(e) => setSelectedDebt(e.target.value)}
                        required
                    >
                        <option value="">Select Debt</option>
                        {debts.map(debt => (
                            <option key={debt.id} value={debt.id}>{debt.name}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Payment (£)"
                        value={payment}
                        onChange={(e) => setPayment(e.target.value)}
                        required
                    />
                    <button type="submit">Make Payment</button>
                </DebtForm>

                <DebtList>
                    <h2>Your Debts</h2>
                    {debts.map(debt => (
                        <div key={debt.id} className="debt-item">
                            <h3>{debt.name}</h3>
                            <p>Total: £{debt.totalAmount.toFixed(2)}</p>
                            <p>Paid: £{debt.paidAmount.toFixed(2)}</p>
                            <p>Remaining: £{(debt.totalAmount - debt.paidAmount).toFixed(2)}</p>
                            <p>Progress: {((debt.paidAmount / debt.totalAmount) * 100).toFixed(2)}%</p>
                            <ProgressBar progress={(debt.paidAmount / debt.totalAmount) * 100} />
                        </div>
                    ))}
                </DebtList>
            </InnerLayout>
        </DebtTrackerStyled>
    );
}

const DebtTrackerStyled = styled.div`
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

const DebtForm = styled.form`
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

const DebtList = styled.div`
    h2 {
        margin-bottom: 1rem;
        font-size: 1.5rem;
        color: var(--primary-color); // Use global primary color
    }

    .debt-item {
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

export default DebtTracker;
