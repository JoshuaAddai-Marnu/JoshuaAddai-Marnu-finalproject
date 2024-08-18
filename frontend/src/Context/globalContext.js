import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthProvider } from "./authContext";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3001/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [debts, setDebts] = useState([]); // New state for debts
    const [goals, setGoals] = useState([]); // New state for goals
    const [error, setError] = useState(null);

    useEffect(() => {
        error && toast(error, { type: "error" });
    }, [error]);

    // Incomes
    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JB_TOKEN")}`,
                },
            });
            getIncomes();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("JB_TOKEN")}`,
            },
        });
        setIncomes(response.data);
    };

    const deleteIncome = async (id) => {
        await axios.delete(`${BASE_URL}delete-income/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("JB_TOKEN")}`,
            },
        });
        getIncomes();
    };

    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    // Expenses
    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JB_TOKEN")}`,
                },
            });
            getExpenses();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("JB_TOKEN")}`,
            },
        });
        setExpenses(response.data);
    };

    const deleteExpense = async (id) => {
        await axios.delete(`${BASE_URL}delete-expense/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("JB_TOKEN")}`,
            },
        });
        getExpenses();
    };

    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    // Debts
    const addDebt = async (debt) => {
        try {
            await axios.post(`${BASE_URL}create-debt`, debt, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JB_TOKEN")}`,
                },
            });
            getDebts();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const getDebts = async () => {
        const response = await axios.get(`${BASE_URL}get-user-debts`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("JB_TOKEN")}`,
            },
        });
        setDebts(response.data);
    };

    const updateDebt = async (debtId, paymentAmount) => {
        try {
            await axios.put(
                `${BASE_URL}update-debt`,
                { debtId, paymentAmount },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("JB_TOKEN")}`,
                    },
                }
            );
            getDebts();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const deleteDebt = async (debtId) => {
        try {
            await axios.delete(`${BASE_URL}delete-debt/${debtId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JB_TOKEN")}`,
                },
            });
            getDebts();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    // Goals
    const addGoal = async (goal) => {
        try {
            await axios.post(`${BASE_URL}create-goal`, goal, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JB_TOKEN")}`,
                },
            });
            getGoals();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const getGoals = async () => {
        const response = await axios.get(`${BASE_URL}get-goals`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("JB_TOKEN")}`,
            },
        });
        setGoals(response.data);
    };

    const updateGoal = async (goalId, updatedGoal) => {
        try {
            await axios.put(`${BASE_URL}update-goal/${goalId}`, updatedGoal, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JB_TOKEN")}`,
                },
            });
            getGoals();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const deleteGoal = async (goalId) => {
        try {
            await axios.delete(`${BASE_URL}delete-goal/${goalId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JB_TOKEN")}`,
                },
            });
            getGoals();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    // Calculate total balance
    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    // Recent transaction history (incomes and expenses)
    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    return (
        <AuthProvider>
            <GlobalContext.Provider
                value={{
                    addIncome,
                    getIncomes,
                    incomes,
                    deleteIncome,
                    expenses,
                    totalIncome,
                    addExpense,
                    getExpenses,
                    deleteExpense,
                    totalExpenses,
                    totalBalance,
                    transactionHistory,
                    error,
                    setError,
                    // New debt-related functions
                    addDebt,
                    getDebts,
                    updateDebt,
                    deleteDebt,
                    debts,
                    // New goal-related functions
                    addGoal,
                    getGoals,
                    updateGoal,
                    deleteGoal,
                    goals,
                }}
            >
                {children}
            </GlobalContext.Provider>
        </AuthProvider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
