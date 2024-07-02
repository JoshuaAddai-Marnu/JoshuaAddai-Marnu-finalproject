import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../Styles/Layouts';

function Dashboard() {
    return (
        <DashboardStyled>
            <InnerLayout>
            <h1>All Transactions</h1>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`

`;

export default Dashboard