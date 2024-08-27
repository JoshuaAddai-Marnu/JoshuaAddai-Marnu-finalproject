import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../Context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../Utils/Icons";
import CategoryForm from "../Expenses/CategoryForm";

function Form() {
  const { addIncome, getIncomes, error, setError, getCategories, categories } =
    useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addIncome(inputState);
    getIncomes();
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  useEffect(() => {
    getCategories("type=income");
  }, []);

  // Combine prelisted categories with dynamically fetched categories
  const combinedCategories = [
    ...categories.map((c) => ({ label: c.label, value: c.value })),
    { label: "Salary", value: "salary" },
    { label: "Freelancing", value: "freelancing" },
    { label: "Investments", value: "investments" },
    { label: "Stocks", value: "stocks" },
    { label: "Bitcoin", value: "bitcoin" },
    { label: "Bank Transfer", value: "bank" },
    { label: "YouTube", value: "youtube" },
    { label: "Other", value: "other" },
  ];

  return (
    <FormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="text"
          value={title}
          name={"title"}
          placeholder="Income Title"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          value={amount}
          type="text"
          name={"amount"}
          placeholder={"Income Amount"}
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
            Select Income Category
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
            name={"Add Income"}
            icon={plus}
            bPad={".8rem 1.6rem"}
            bRad={"30px"}
            bg={"var(--color-accent"}
            color={"#fff"}
          />
        </div>
        <p className="note">Note: Scroll down to see income history</p>
      </div>
      <CategoryForm type="income" onCloseModal={onCloseModal} open={open} />
    </FormStyled>
  );
}

const FormStyled = styled.form`
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
      font-size: 0.875rem; /* Slightly smaller font size */
      color: red; /* Pop with red color */
      margin-left: 1rem; /* Add space between button and note */
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

export default Form;
