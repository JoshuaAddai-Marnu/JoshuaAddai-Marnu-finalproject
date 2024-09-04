// Importing necessary libraries and components
import React, { useContext, useState } from "react";
import { toast } from "react-toastify"; // Library for showing toast notifications
import { AuthProvider } from "./authContext"; // Authentication provider
import { apiClient } from "../Utils/apiClient"; // API client for making HTTP requests

// Creating a global context for managing application-wide state
const GlobalContext = React.createContext();

// Defining the base URL for API calls
const BASE_URL = "http://localhost:3001/api/v1/";

// GlobalProvider component provides global state and functions to its children
export const GlobalProvider = ({ children }) => {
  // State to hold various application data such as incomes, expenses, debts, etc.
  const [state, setState] = useState({
    incomes: [],
    expenses: [],
    debts: [],
    goals: [],
    categories: [],
    error: null,
  });

  // Utility function to update state based on a key and value
  const updateState = (key, value) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  // Function to handle errors and show error messages using toast notifications
  const handleError = (err) => {
    toast(err.response?.data?.message || "An error occurred", {
      type: "error",
    });
  };

  // Function to create a handler for API calls based on the provided endpoints and state key
  const createApiHandler = (endpoints, stateKey) => {
    // Handler object containing methods for adding, getting, deleting, and updating items
    const handler = {
      add: async (item, query) => {
        try {
          await apiClient
            .post(`${BASE_URL}${endpoints.add}`, item)
            .then((res) => toast(res?.data?.message, { type: "success" }));// Success toast notification

          // If a GET handler is available, retrieve the updated data
          if (handler.get) {
            const response = await handler.get(query);

            return { success: true, data: response };
          }
        } catch (err) {
          handleError(err); // Handle errors
          return { success: false, error: err };
        }
      },
      get: async (query) => {
        try {
          // Fetch data from the API and update state
          const response = await apiClient.get(
            `${BASE_URL}${endpoints.get}${query ? `?${query}` : ""}`
          );
          if (response) {
            updateState(stateKey, response.data); // Update the respective state with fetched data
          }
          return { success: true, data: response };
        } catch (err) {
          handleError(err);
          return { success: false, error: err };
        }
      },
      delete: async (id, childId) => {
        try {
          // Delete an item by ID from the API
          await apiClient
            .delete(`${BASE_URL}${endpoints.delete.replace(":id", id)}`)
            .then((res) => toast(res?.data?.message, { type: "success" }));

          if (handler.get) {
            const response = await handler.get();

            return { success: true, data: response };
          }
        } catch (err) {
          handleError(err);
          return { success: false, error: err };
        }
      },
      update: async (id, data) => {
        console.log(id, data);
        try {
          // Update an item by ID with new data
          await apiClient
            .put(`${BASE_URL}${endpoints.update.replace(":id", id)}`, data)
            .then((res) => toast(res?.data?.message, { type: "success" }));

          if (handler.get) {
            const response = await handler.get();
            return { success: true, data: response };
          }
        } catch (err) {
          handleError(err);
          return { success: false, error: err };
        }
      },
    };
    return handler; // Return the handler object
  };

  const incomeHandler = createApiHandler(
    {
      add: "add-income",
      get: "get-incomes",
      update: "update-income/:id",
      delete: "delete-income/:id",
    },
    "incomes"
  );

  const expenseHandler = createApiHandler(
    {
      add: "add-expense",
      update: "update-expense/:id",
      get: "get-expenses",
      delete: "delete-expense/:id",
    },
    "expenses"
  );

  const debtHandler = createApiHandler(
    {
      add: "add-debt",
      get: "get-debt",
      update: "update-debt/:id",
      delete: "delete-debt/:id",
    },
    "debts"
  );

  const goalHandler = createApiHandler(
    {
      add: "goals",
      get: "goals",
      update: "goals/:id",
      delete: "goals/:id",
    },
    "goals"
  );

  const categoriesHandler = createApiHandler(
    {
      add: "categories",
      get: "categories",
    },
    "categories"
  );

  // Recreating previous functions using new handlers
  const addIncome = incomeHandler.add;
  const updateIncome = incomeHandler.update;
  const getIncomes = incomeHandler.get;
  const deleteIncome = incomeHandler.delete;

  const addExpense = expenseHandler.add;
  const updateExpense = expenseHandler.update;
  const getExpenses = expenseHandler.get;
  const deleteExpense = expenseHandler.delete;

  const addDebt = debtHandler.add;
  const getDebts = debtHandler.get;
  const updateDebt = debtHandler.update;
  const deleteDebt = debtHandler.delete;

  const addGoal = goalHandler.add;
  const getGoals = goalHandler.get;
  const updateGoal = goalHandler.update;
  const deleteGoal = goalHandler.delete;

  const addCategories = categoriesHandler.add;
  const getCategories = categoriesHandler.get;

  // Function to calculate the total amount of incomes or expenses
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.amount, 0); // Summing the amounts of all items
  };

  // Function to format to two decimal places
  const formatToTwoDecimals = (value) => {
    return value.toFixed(2);
  };

  // Function to calculate total income and total expenses, formatted to two decimals
  const totalIncome = () => formatToTwoDecimals(calculateTotal(state.incomes));
  const totalExpenses = () => formatToTwoDecimals(calculateTotal(state.expenses));

  // Function to calculate the total balance (income - expenses)
  const totalBalance = () => formatToTwoDecimals(totalIncome() - totalExpenses());

  // Function to get the most recent transactions (up to 3)
  const transactionHistory = () => {
    const history = [...state.incomes, ...state.expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3); // Return the latest three transactions
  };

  // Providing all the global state and functions to children components
  return (
    <AuthProvider>
      <GlobalContext.Provider
        value={{
          ...state,
          addIncome,
          updateIncome,
          getIncomes,
          deleteIncome,
          addExpense,
          getExpenses,
          updateExpense,
          deleteExpense,
          addDebt,
          getDebts,
          updateDebt,
          deleteDebt,
          addGoal,
          getGoals,
          updateGoal,
          deleteGoal,
          totalIncome,
          totalExpenses,
          totalBalance,
          addCategories,
          getCategories,
          transactionHistory,
          setError: (error) => updateState("error", error),
        }}
      >
        {children}
      </GlobalContext.Provider>
    </AuthProvider>
  );
};

// Custom hook to use the global context in other components
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
