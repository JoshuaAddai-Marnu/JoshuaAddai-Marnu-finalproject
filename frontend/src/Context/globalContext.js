import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthProvider } from "./authContext";
import { apiClient } from "../Utils/apiClient";

const GlobalContext = React.createContext();

const BASE_URL = "http://localhost:3001/api/v1/";

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
    incomes: [],
    expenses: [],
    debts: [],
    goals: [],
    categories: [],
    error: null,
  });

  const updateState = (key, value) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleError = (err) => {
    toast(err.response?.data?.message || "An error occurred", {
      type: "error",
    });
  };

  const createApiHandler = (endpoints, stateKey) => {
    const handler = {
      add: async (item, query) => {
        try {
          await apiClient
            .post(`${BASE_URL}${endpoints.add}`, item)
            .then((res) => toast(res?.data?.message, { type: "success" }));
          const response = await handler.get(query);

          return { success: true, data: response };
        } catch (err) {
          handleError(err);
          return { success: false, error: err };
        }
      },
      get: async (query) => {
        try {
          const response = await apiClient.get(
            `${BASE_URL}${endpoints.get}${query ? `?${query}` : ""}`
          );
          if (response) {
            updateState(stateKey, response.data);
          }
          return { success: true, data: response };
        } catch (err) {
          handleError(err);
          return { success: false, error: err };
        }
      },
      delete: async (id) => {
        try {
          await apiClient
            .delete(`${BASE_URL}${endpoints.delete.replace(":id", id)}`)
            .then((res) => toast(res?.data?.message, { type: "success" }));

          const response = await handler.get();
          return { success: true, data: response };
        } catch (err) {
          handleError(err);
          return { success: false, error: err };
        }
      },
      update: async (id, data) => {
        try {
          await apiClient
            .put(`${BASE_URL}${endpoints.update.replace(":id", id)}`, data)
            .then((res) => toast(res?.data?.message, { type: "success" }));

          const response = await handler.get();
          return { success: true, data: response };
        } catch (err) {
          handleError(err);
          return { success: false, error: err };
        }
      },
    };
    return handler;
  };

  const incomeHandler = createApiHandler(
    {
      add: "add-income",
      get: "get-incomes",
      delete: "delete-income/:id",
    },
    "incomes"
  );

  const expenseHandler = createApiHandler(
    {
      add: "add-expense",
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
  const getIncomes = incomeHandler.get;
  const deleteIncome = incomeHandler.delete;

  const addExpense = expenseHandler.add;
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

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.amount, 0);
  };

  const totalIncome = () => calculateTotal(state.incomes);
  const totalExpenses = () => calculateTotal(state.expenses);

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...state.incomes, ...state.expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  return (
    <AuthProvider>
      <GlobalContext.Provider
        value={{
          ...state,
          addIncome,
          getIncomes,
          deleteIncome,
          addExpense,
          getExpenses,
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

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
