import { dashboard, expenses, transactions, trend, goal, loan, wage } from '../Utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: "Home",
        icon: transactions,
        link: "/Home",
    },
    {
        id: 2,
        title: 'Money Master (Dashboard)',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 3,
        title: "Income Stream",
        icon: trend,
        link: "/income",
    },
    {
        id: 4,
        title: "Spending Snapshot",
        icon: expenses,
        link: "/expenses",
    },
    {
        id: 5,
        title: "Future Focus (Goals Tracker)",
        icon: goal,
        link: "/goals",
    },
    {
        id: 6,
        title: " Debt Defender",
        icon: loan,
        link: "/debts",
    },
    {
        id: 7,
        title: "Wage Calculator",
        icon: wage,
        link: "/wageCalc",
    },
]