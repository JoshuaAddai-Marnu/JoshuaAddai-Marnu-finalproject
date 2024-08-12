import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { InnerLayout } from '../../Styles/Layouts';
import Button from '../Button/Button';
import { plus, circle } from '../../Utils/Icons';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DebtTracker() {
    const [debts, setDebts] = useState([]);
    const [debtName, setDebtName] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [payment, setPayment] = useState('');
    const [selectedDebt, setSelectedDebt] = useState('');
    const [debtDate, setDebtDate] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [editingDebtId, setEditingDebtId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [paymentError, setPaymentError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Function to add or edit a debt
    const addOrEditDebt = (e) => {
        e.preventDefault();

        if (!debtName || !totalAmount || parseFloat(totalAmount) <= 0 || !debtDate) {
            setErrorMessage('Please enter a valid debt name, amount, and date.');
            setSuccessMessage('');
            return;
        }

        const newDebt = {
            id: editingDebtId || Date.now(),
            name: debtName,
            totalAmount: parseFloat(totalAmount),
            paidAmount: editingDebtId
                ? debts.find(debt => debt.id === editingDebtId).paidAmount
                : 0,
            dateAdded: debtDate,
            payments: editingDebtId
                ? debts.find(debt => debt.id === editingDebtId).payments
                : [],
            showPayments: false,
        };

        if (editingDebtId) {
            // Update existing debt
            setDebts(debts.map(debt => (debt.id === editingDebtId ? newDebt : debt)));
            setEditingDebtId(null);
            setSuccessMessage('Debt updated successfully!');
        } else {
            // Add new debt
            setDebts([...debts, newDebt]);
            setSuccessMessage('Debt added successfully!');
        }

        setDebtName('');
        setTotalAmount('');
        setDebtDate('');
        setErrorMessage('');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    // Function to delete a debt
    const deleteDebt = (id) => {
        setDebts(debts.filter(debt => debt.id !== id));
        setSuccessMessage('Debt deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    // Function to edit a debt
    const startEditingDebt = (id) => {
        const debtToEdit = debts.find(debt => debt.id === id);
        setDebtName(debtToEdit.name);
        setTotalAmount(debtToEdit.totalAmount.toString());
        setDebtDate(debtToEdit.dateAdded);
        setEditingDebtId(id);
    };

    const makePayment = (e) => {
        e.preventDefault();

        if (!selectedDebt || !payment || parseFloat(payment) <= 0 || !paymentDate) {
            setPaymentError('Please select a debt, enter a valid payment amount, and select a payment date.');
            setSuccessMessage('');
            return;
        }

        const updatedDebts = debts.map(debt => {
            if (debt.id === parseInt(selectedDebt)) {
                const newPaidAmount = debt.paidAmount + parseFloat(payment);
                if (newPaidAmount > debt.totalAmount) {
                    setPaymentError('Payment exceeds the total debt amount.');
                    setSuccessMessage('');
                    return debt;
                }
                const newPayment = {
                    amount: parseFloat(payment),
                    date: paymentDate
                };
                return {
                    ...debt,
                    paidAmount: newPaidAmount,
                    payments: [...debt.payments, newPayment],
                };
            }
            return debt;
        });
        setDebts(updatedDebts);
        setPayment('');
        setPaymentDate('');
        setSelectedDebt('');
        setPaymentError('');
        setSuccessMessage('Payment made successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const togglePayments = (id) => {
        setDebts(debts.map(debt =>
            debt.id === id ? { ...debt, showPayments: !debt.showPayments } : debt
        ));
    };

    return (
        <DebtTrackerStyled>
            <InnerLayout>
                <h1>Debt Tracker</h1>
                <ContentContainer>
                    <LeftSide>
                        <DebtForm onSubmit={addOrEditDebt}>
                            <h2>{plus} {editingDebtId ? 'Edit Debt' : 'Add New Debt'}</h2>
                            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
                            <input
                                type="text"
                                placeholder="Debt Name"
                                value={debtName}
                                onChange={(e) => setDebtName(e.target.value)}
                                required
                                aria-label="Debt Name"
                            />
                            <input
                                type="number"
                                placeholder="Total Amount (£)"
                                value={totalAmount}
                                onChange={(e) => setTotalAmount(e.target.value)}
                                required
                                aria-label="Total Amount in Pounds"
                            />
                            <input
                                type="date"
                                value={debtDate}
                                onChange={(e) => setDebtDate(e.target.value)}
                                required
                                aria-label="Debt Date"
                            />
                            <Button
                                name={editingDebtId ? 'Update' : 'Add'}
                                icon={plus}
                                bPad={'.8rem 1.6rem'}
                                bRad={'30px'}
                                bg={'var(--color-accent)'}
                                color={'#fff'}
                                aria-label={editingDebtId ? 'Update Debt' : 'Add Debt'}
                            />
                        </DebtForm>

                        <DebtForm onSubmit={makePayment}>
                            <h2>{circle} Make a Payment</h2>
                            {paymentError && <ErrorMessage>{paymentError}</ErrorMessage>}
                            <select
                                value={selectedDebt}
                                onChange={(e) => setSelectedDebt(e.target.value)}
                                required
                                aria-label="Select Debt"
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
                                aria-label="Payment Amount in Pounds"
                            />
                            <input
                                type="date"
                                value={paymentDate}
                                onChange={(e) => setPaymentDate(e.target.value)}
                                required
                                aria-label="Payment Date"
                            />
                            <Button
                                name={'Pay'}
                                icon={plus}
                                bPad={'.8rem 1.6rem'}
                                bRad={'30px'}
                                bg={'var(--color-accent)'}
                                color={'#fff'}
                                aria-label="Make Payment"
                            />
                        </DebtForm>
                    </LeftSide>

                    <RightSide>
                        <DebtList aria-live="polite">
                            <h2>Your Debts</h2>
                            {debts.length === 0 ? (
                                <p>No debts added yet.</p>
                            ) : (
                                debts.map(debt => (
                                    <DebtItem key={debt.id} className="debt-item">
                                        <h3>{debt.name}</h3>
                                        <p>Total: £{debt.totalAmount.toFixed(2)}</p>
                                        <p>Paid: £{debt.paidAmount.toFixed(2)}</p>
                                        <p>Remaining: £{(debt.totalAmount - debt.paidAmount).toFixed(2)}</p>
                                        <p>Progress: {((debt.paidAmount / debt.totalAmount) * 100).toFixed(2)}%</p>
                                        <p>Date Added: {debt.dateAdded}</p>
                                        <ButtonContainer>
                                            <Button
                                                name="Edit"
                                                icon={circle}
                                                bPad={'.4rem 1rem'}
                                                bRad={'20px'}
                                                bg={'#f0ad4e'}
                                                color={'#fff'}
                                                onClick={() => startEditingDebt(debt.id)}
                                            />
                                            <Button
                                                name="Delete"
                                                icon={circle}
                                                bPad={'.4rem 1rem'}
                                                bRad={'20px'}
                                                bg={'#d9534f'}
                                                color={'#fff'}
                                                onClick={() => deleteDebt(debt.id)}
                                            />
                                        </ButtonContainer>
                                        <TogglePaymentsButton onClick={() => togglePayments(debt.id)}>
                                            {debt.showPayments ? 'Hide Payment Details' : 'Show Payment Details'}
                                        </TogglePaymentsButton>
                                        {debt.showPayments && debt.payments.map((payment, index) => (
                                            <PaymentDetail key={index}>
                                                {index + 1}. Payment of £{payment.amount.toFixed(2)} on {payment.date}
                                            </PaymentDetail>
                                        ))}
                                        <BarChart progress={(debt.paidAmount / debt.totalAmount) * 100} />
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

const PaymentDetail = styled.div`
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

export default DebtTracker;
