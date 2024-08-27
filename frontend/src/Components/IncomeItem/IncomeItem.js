import React, { useState } from 'react';
import styled from 'styled-components';
import { dateFormat } from '../../Utils/dateFormat';
import {
    bitcoin, book, calender, card, circle, clothing, comment, pound, food, freelance, medical, money,
    piggy, stocks, takeaway, trash, tv, users, yt, edit // Added the edit icon
} from '../../Utils/Icons';
import Button from '../Button/Button';
import { useGlobalContext } from '../../Context/globalContext';

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {
    const { updateIncome, updateExpense } = useGlobalContext(); // Import the update functions
    const [isEditing, setIsEditing] = useState(false); // State to track if the item is being edited
    const [editState, setEditState] = useState({ title, amount, date, category, description }); // State to hold the editable fields

    const categoryIcon = () => {
        switch (category) {
            case 'salary':
                return money;
            case 'freelancing':
                return freelance;
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return '';
        }
    };

    const expenseCatIcon = () => {
        switch (category) {
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return '';
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        const updatedItem = {
            id,
            ...editState,
        };
        if (type === 'expense') {
            await updateExpense(id, updatedItem);
        } else {
            await updateIncome(id, updatedItem);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditState({ title, amount, date, category, description });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditState({ ...editState, [name]: value });
    };

    return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className="icon">
                {type === 'expense' ? expenseCatIcon() : categoryIcon()}
            </div>
            <div className="content">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="title"
                            value={editState.title}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="amount"
                            value={editState.amount}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="category"
                            value={editState.category}
                            onChange={handleInputChange}
                        />
                        <input
                            type="date"
                            name="date"
                            value={editState.date}
                            onChange={handleInputChange}
                        />
                        <textarea
                            name="description"
                            value={editState.description}
                            onChange={handleInputChange}
                        />
                    </>
                ) : (
                    <>
                        <h5>{title}</h5>
                        <div className="inner-content">
                            <p className="amount">{pound} {amount}</p>
                            <p className="date">{calender} {dateFormat(date)}</p>
                            <p className="category"><strong>{category}: </strong>{description}</p>
                        </div>
                    </>
                )}
                <div className="btn-con">
                    {isEditing ? (
                        <>
                            <Button
                                name="Save"
                                icon={edit}
                                bPad={'1rem'}
                                bRad={'50%'}
                                bg={'var(--primary-color)'}
                                color={'#fff'}
                                onClick={handleSave}
                            />
                            <Button
                                name="Cancel"
                                icon={trash}
                                bPad={'1rem'}
                                bRad={'50%'}
                                bg={'#d9534f'}
                                color={'#fff'}
                                onClick={handleCancel}
                            />
                        </>
                    ) : (
                        <>
                            <Button
                                icon={edit}
                                bPad={'1rem'}
                                bRad={'50%'}
                                bg={'#f0ad4e'}
                                color={'#fff'}
                                onClick={handleEdit}
                            />
                            <Button
                                icon={trash}
                                bPad={'1rem'}
                                bRad={'50%'}
                                bg={'var(--primary-color)'}
                                color={'#fff'}
                                iColor={'#fff'}
                                hColor={'var(--color-green)'}
                                onClick={() => deleteItem(id)}
                            />
                        </>
                    )}
                </div>
            </div>
        </IncomeItemStyled>
    );
}

const IncomeItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: translateY(-5px);
        .icon {
            transform: scale(1.1);
        }
    }

    .icon {
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        transition: transform 0.3s ease-in-out;

        i {
            font-size: 2.6rem;
        }
    }

    .content {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 1.5rem;
        width: 100%;

        h5 {
            font-size: 1.3rem;
            position: relative;
            margin-right: 1rem;

            &::before {
                content: '';
                position: absolute;
                left: -1rem;
                top: 50%;
                transform: translateY(-50%);
                width: 0.8rem;
                height: 0.8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            flex: 1;
            flex-wrap: wrap;

            .amount, .date, .category {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--primary-color);
                opacity: 0.8;
                white-space: nowrap;
            }

            .category {
                flex: 1;
                white-space: normal;
                word-wrap: break-word;
            }

            .btn-con {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: auto;
                gap: 0.5rem;
            }
        }
    }
`;

export default IncomeItem;
