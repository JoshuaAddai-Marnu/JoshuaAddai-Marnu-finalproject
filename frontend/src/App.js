import React, { useMemo } from "react";
import styled from "styled-components";
import bg from "./Img/bg.png";
import { MainLayout } from "./Styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./Context/globalContext";
import { BrowserRouter as Router, Route, Routes, useLocation, } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import Goals from "./Components/Goals/Goal";
import DebtTracker from "./Components/DebtTracker.js/Debt";
import WageCalculator from "./Components/WageCalc/WageCalc";
import Home from "./Components/Home/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import IncomeTrackerGuide from './Components/Guides/IncomeTrackerGuide';
import ExpenseTrackerGuide from './Components/Guides/ExpenseTrackerGuide';
import DebtTrackerGuide from './Components/Guides/DebtTrackerGuide';
import GoalTrackerGuide from './Components/Guides/GoalTrackerGuide';
import WageCalculatorGuide from './Components/Guides/WageCalculatorGuide';
import DashboardGuide from './Components/Guides/DashboardGuide';

function App() {
  const [active, setActive] = React.useState(1);
  const location = useLocation();

  const global = useGlobalContext(); // Ensure this works correctly

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled bg={bg} className="App">
      <ToastContainer />
      {orbMemo}
      <MainLayout>
        {!["/signup", "/login"].includes(location.pathname) && <Navigation />}
        <main>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="goals" element={<Goals />} />
            <Route path="debts" element={<DebtTracker />} />
            <Route path="wageCalc" element={<WageCalculator />} />

            <Route path="/income-tracker-guide" element={<IncomeTrackerGuide />} />
            <Route path="/expense-tracker-guide" element={<ExpenseTrackerGuide />} />
            <Route path="/debt-tracker-guide" element={<DebtTrackerGuide />} />
            <Route path="/goal-tracker-guide" element={<GoalTrackerGuide />} />
            <Route path="/wage-calculator-guide" element={<WageCalculatorGuide />} />
            <Route path="/dashboard-guide" element={<DashboardGuide />} />
          </Routes>
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
