import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../Context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../Utils/Icons";
import CategoryForm from "./CategoryForm";

function ExpenseForm() {
  const { addExpense, error, setError, getCategories, categories } =
    useGlobalContext();
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExpense(inputState);
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  useEffect(() => {
    getCategories("type=expense");
  }, []);

  // Combine prelisted categories with dynamically fetched categories
  const combinedCategories = [
    ...categories.map((c) => ({ label: c.label, value: c.value })),
    { label: "Education", value: "education" },
    { label: "Groceries", value: "groceries" },
    { label: "Health", value: "health" },
    { label: "Subscriptions", value: "subscriptions" },
    { label: "Takeaways", value: "takeaways" },
    { label: "Clothing", value: "clothing" },
    { label: "Travelling", value: "travelling" },
    { label: "Other", value: "other" },
  ];

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="text"
          value={title}
          name={"title"}
          placeholder="Expense Title"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          value={amount}
          type="text"
          name={"amount"}
          placeholder={"Expense Amount"}
          onChange={handleInput("amount")}
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Enter A Date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
        />
      </div>
      <div className="selects input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={(e) => {
            const value = e.target.value;
            if (value === "add_new") {
              onOpenModal();
            } else {
              setInputState({ ...inputState, category: value });
            }
          }}
        >
          <option value="" disabled>
            Select Expense Category
          </option>
          {combinedCategories.map((c, index) => (
            <option key={index} value={c.value}>
              {c.label}
            </option>
          ))}
          <option value="add_new">Add New</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Add A Reference"
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput("description")}
        ></textarea>
      </div>
      <div className="submit-container">
        <div className="submit-btn">
          <Button
            name={"Add Expense"}
            icon={plus}
            bPad={".8rem 1.6rem"}
            bRad={"30px"}
            bg={"var(--color-accent"}
            color={"#fff"}
          />
        </div>
        <p className="note">Note: Scroll down to see expense history</p>
      </div>
      <CategoryForm type="expense" onCloseModal={onCloseModal} open={open} />
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
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

  .selects {
    display: flex;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .note {
      font-style: italic;
      font-size: 0.875rem;
      color: red;
      margin-left: 1rem;
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

export default ExpenseForm;
