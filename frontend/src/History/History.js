// Importing necessary modules from React and styled-components
import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../Context/globalContext';

// Functional component to display transaction history
function History() {
    const { transactionHistory } = useGlobalContext(); // Accessing transaction history from global context

    const [...history] = transactionHistory(); // Destructuring the transaction history array

    return (
        // Rendering the history section
        <HistoryStyled>
            <h2>Recent History</h2> {/* Title for the section */}
            {history.map((item) => {
                const { _id, title, amount, type } = item; // Destructuring properties from each transaction item
                return (
                    // Key is set to _id for each item to ensure uniqueness
                    <div key={_id} className="history-item">
                        <p 
                            // Setting color based on whether it's an expense or income
                            style={{ color: type === 'expense' ? 'red' : 'var(--color-green)' }}
                        >
                            {title} {/* Displaying transaction title */}
                        </p>

                        <p 
                            // Setting color based on whether it's an expense or income
                            style={{ color: type === 'expense' ? 'red' : 'var(--color-green)' }}
                        >
                            {/* Formatting the amount with negative or positive sign based on transaction type */}
                            {type === 'expense' 
                                ? `-£${amount <= 0 ? 0 : amount}` 
                                : `+£${amount <= 0 ? 0 : amount}`
                            }
                        </p>
                    </div>
                );
            })}
        </HistoryStyled>
    );
}

// Styled-components for styling the history section
const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item {
        background: #FCF6F9; 
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06); 
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

// Exporting the History component as default
export default History;
