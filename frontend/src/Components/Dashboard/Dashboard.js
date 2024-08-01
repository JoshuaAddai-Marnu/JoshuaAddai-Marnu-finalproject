import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../Context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../Styles/Layouts';
import { pound } from '../../Utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p className="income-amount">
                                    {pound} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p className="expense-amount">
                                    {pound} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p className={`balance-amount ${totalBalance() < 0 ? 'negative' : 'positive'}`}>
                                    {pound} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Income</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                £{Math.min(...incomes.map(item => item.amount))}
                            </p>
                            <p>
                                £{Math.max(...incomes.map(item => item.amount))}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                £{Math.min(...expenses.map(item => item.amount))}
                            </p>
                            <p>
                                £{Math.max(...expenses.map(item => item.amount))}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con {
            grid-column: 1 / 4;
            height: 290px;
            .amount-con {
                display: grid;
                grid-template-columns: repeat(1, 1fr);
                gap: 0rem;
                margin-top: 1rem;
                .income, .expense {
                    grid-column: span 2;
                }
                .income, .expense, .balance {
                    background: #f9f9f9;
                    border: 1px solid #e0e0e0;
                    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
                    border-radius: 10px;
                    padding: 1rem;
                    text-align: center;
                    
                    h2 {
                        font-size: 1.2rem;
                        margin-bottom: 1rem;
                        color: #333;
                    }

                    p {
                        font-size: 2rem;
                        font-weight: bold;
                        color: #333;
                    }

                    .income-amount {
                        color: green;
                    }

                    .expense-amount {
                        color: red;
                    }

                    .balance-amount {
                        &.positive {
                            color: green;
                        }
                        &.negative {
                            color: red;
                        }
                    }
                }

                .balance {
                    background: #e6f7ff;
                    border: 1px solid #b3e5fc;
                }
            }
        }

        .history-con {
            grid-column: 4 / -1;
            h2 {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title {
                font-size: 1.2rem;
                span {
                    font-size: 1.8rem;
                }
            }
            .salary-item {
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p {
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Dashboard;
