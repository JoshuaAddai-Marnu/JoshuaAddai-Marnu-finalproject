import { dashboard, expenses, transactions, trend, goal, loan } from '../Utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/transactions",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/income",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/expenses",
    },
    {
        id: 5,
        title: "Goals",
        icon: goal,
        link: "/goals",
    },
    {
        id: 6,
        title: "Debts Tracker",
        icon: loan,
        link: "/debts",
    },
]