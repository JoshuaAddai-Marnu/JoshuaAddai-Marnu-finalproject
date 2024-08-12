import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaMoneyBillWave, FaChartLine, FaPiggyBank, FaBullseye } from 'react-icons/fa';
import { InnerLayout } from '../../Styles/Layouts';

function Home() {
    return (
        <HomeStyled>
            <InnerLayout>
            <WelcomeMessage>
                <h1>Welcome to Your Personal Financial Calculator</h1>
                <p>
                    Manage your finances effectively with our suite of tools. Track your income, monitor your expenses, 
                    manage debts, and set financial goals all in one place.
                </p>
            </WelcomeMessage>
            <Features>
                <FeatureCard>
                    <Link to="/income-tracker">
                        <FaMoneyBillWave size={50} color="#4caf50" />
                        <h2>Income Tracker</h2>
                        <p>Record and manage all your sources of income.</p>
                    </Link>
                </FeatureCard>
                <FeatureCard>
                    <Link to="/expense-tracker">
                        <FaChartLine size={50} color="#f44336" />
                        <h2>Expense Tracker</h2>
                        <p>Keep an eye on your spending and stay within your budget.</p>
                    </Link>
                </FeatureCard>
                <FeatureCard>
                    <Link to="/debt-tracker">
                        <FaPiggyBank size={50} color="#ffc107" />
                        <h2>Debt Tracker</h2>
                        <p>Manage and pay off your debts effectively.</p>
                    </Link>
                </FeatureCard>
                <FeatureCard>
                    <Link to="/goal-tracker">
                        <FaBullseye size={50} color="#2196f3" />
                        <h2>Goal Tracker</h2>
                        <p>Set and achieve your financial goals.</p>
                    </Link>
                </FeatureCard>
            </Features>

            </InnerLayout>
            
        </HomeStyled>
    );
}

const HomeStyled = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
`;

const WelcomeMessage = styled.div`
    h1 {
        font-size: 2.5rem;
        color: #333;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.25rem;
        color: #666;
        max-width: 800px;
        margin: 0 auto;
        margin-bottom: 3rem;
        line-height: 1.6;
    }
`;

const Features = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const FeatureCard = styled.div`
    background: #f9f9f9;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    width: 250px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    h2 {
        font-size: 1.5rem;
        color: #333;
        margin: 1rem 0;
    }

    p {
        font-size: 1rem;
        color: #777;
    }
`;

export default Home;
