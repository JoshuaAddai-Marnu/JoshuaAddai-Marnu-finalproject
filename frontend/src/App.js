import React, { useMemo } from 'react';
import styled from 'styled-components';
import bg from './Img/bg.png';
import { MainLayout } from './Styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './Context/globalContext';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Login/Signup';
import Goals from './Components/Goals/Goal';
import DebtTracker from './Components/DebtTracker.js/Debt';
import WageCalculator from './Components/WageCalc/WageCalc';
import Home from './Components/Home/Home';


function App() {
  const [active, setActive] = React.useState(1);
  const location = useLocation()

  const global = useGlobalContext(); // Ensure this works correctly

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled bg={bg} className="App">
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
            <Route path="home" element={<Home />} />
            <Route path="goals" element={<Goals />} />
            <Route path="debts" element={<DebtTracker />} />
            <Route path="wageCalc" element={<WageCalculator />} />

          </Routes>
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
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
