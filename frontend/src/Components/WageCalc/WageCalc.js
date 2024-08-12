import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { InnerLayout } from '../../Styles/Layouts';
import Button from '../Button/Button';
import { plus } from '../../Utils/Icons';

function WageCalculator() {
    const [annualSalary, setAnnualSalary] = useState('');
    const [estimatedDeductions, setEstimatedDeductions] = useState('');
    const [workingHours, setWorkingHours] = useState('');
    const [grossHourlyWage, setGrossHourlyWage] = useState(null);
    const [netHourlyWage, setNetHourlyWage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const validateInput = (value) => {
        return value > 0;
    };

    const calculateWages = (e) => {
        e.preventDefault();

        const grossAnnualSalary = parseFloat(annualSalary);
        const deductions = parseFloat(estimatedDeductions);
        const totalWorkingHours = parseFloat(workingHours);

        // Input validation
        if (!validateInput(grossAnnualSalary) || !validateInput(deductions) || !validateInput(totalWorkingHours)) {
            setErrorMessage('All values must be positive numbers.');
            return;
        }

        setErrorMessage('');

        const grossHourly = grossAnnualSalary / totalWorkingHours;
        const netAnnualSalary = grossAnnualSalary - deductions;
        const netHourly = netAnnualSalary / totalWorkingHours;

        setGrossHourlyWage(grossHourly.toFixed(2));
        setNetHourlyWage(netHourly.toFixed(2));
    };

    return (
        <WageCalculatorStyled>
            <InnerLayout>
                <CalculatorContainer>
                    <LeftSide>
                        <h1>Wage Calculator</h1>
                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                        <FormStyled onSubmit={calculateWages}>
                            <div className="input-control">
                                <input
                                    type="number"
                                    placeholder="Gross Annual Salary (£)"
                                    value={annualSalary}
                                    onChange={(e) => setAnnualSalary(e.target.value)}
                                    required
                                    aria-label="Gross Annual Salary"
                                />
                            </div>
                            <div className="input-control">
                                <input
                                    type="number"
                                    placeholder="Estimated Deductions (£)"
                                    value={estimatedDeductions}
                                    onChange={(e) => setEstimatedDeductions(e.target.value)}
                                    required
                                    aria-label="Estimated Deductions"
                                />
                            </div>
                            <div className="input-control">
                                <input
                                    type="number"
                                    placeholder="Total Working Hours per Year"
                                    value={workingHours}
                                    onChange={(e) => setWorkingHours(e.target.value)}
                                    required
                                    aria-label="Total Working Hours per Year"
                                />
                            </div>
                            <div className="submit-btn">
                                <Button 
                                    name={'Calculate'}
                                    icon={plus}
                                    bPad={'.8rem 1.6rem'}
                                    bRad={'30px'}
                                    bg={'var(--color-accent'}
                                    color={'#fff'}
                                />
                            </div>
                        </FormStyled>
                    </LeftSide>

                    {grossHourlyWage && netHourlyWage && (
                        <RightSide>
                            <Results aria-live="polite">
                                <ResultCard className="result-card">
                                    <h2>Gross Hourly Wage</h2>
                                    <p>£{grossHourlyWage} per hour</p>
                                </ResultCard>
                                <ResultCard className="result-card">
                                    <h2>Net Hourly Wage</h2>
                                    <p>£{netHourlyWage} per hour</p>
                                </ResultCard>
                            </Results>
                        </RightSide>
                    )}
                </CalculatorContainer>
            </InnerLayout>
        </WageCalculatorStyled>
    );
}

// Fade-in animation for the results
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

const WageCalculatorStyled = styled.div`
    padding: 2rem;
    border-radius: 10px;
    max-width: 800px;
    margin: 2rem auto;
`;

const CalculatorContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 2rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const LeftSide = styled.div`
    flex: 1;
    background: #FCF6F9;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    text-align: center;

    h1 {
        font-size: 2.5rem;
        color: #333;
        margin-bottom: 1.5rem;
    }
`;

const RightSide = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 768px) {
        margin-top: 2rem;
    }
`;

const Results = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const ResultCard = styled.div`
    background: #FCF6F9;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    animation: ${fadeIn} 0.5s ease-in-out;

    h2 {
        font-size: 1.75rem;
        color: #4caf50;
        margin-bottom: 0.5rem;
    }

    p {
        font-size: 1.5rem;
        color: #333;
        font-weight: bold;
    }
`;

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    input {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        background: transparent;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);

        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }

    .input-control {
        input {
            width: 100%;
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 1rem;
    margin-bottom: 1rem;
`;

export default WageCalculator;
