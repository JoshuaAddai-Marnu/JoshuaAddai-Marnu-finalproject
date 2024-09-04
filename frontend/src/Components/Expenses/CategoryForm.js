import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import { useState } from "react";
import { useGlobalContext } from "../../Context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../Utils/Icons";
import { toaster } from "../../Utils/toaster";

// CategoryForm component for adding categories
const CategoryForm = ({ open, onCloseModal, type }) => {
  const { addCategories } = useGlobalContext(); // Get addCategories function from global context
  const [label, setLabel] = useState(""); // State for managing the input value for category label

  // Handle input change in the form
  const handleInput = (e) => setLabel(e.target.value);

  // Handle form submission for adding a category
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    e.stopPropagation(); // Prevent event propagation

    // Add category by sending the label and type to the global context function
    await addCategories({ label, type }, `type=${type}`).then((res) => {
      if (res.success) {
        onCloseModal(); // Close the modal on successful category creation
        toaster.success("Successfully created category"); // Show success notification
      }
    });
  };

  return (
    <Modal
      classNames={{
        modal: "customModal",
      }}
      open={open} // Control modal visibility using open prop
      onClose={() => {
        setLabel(""); // Reset label input when modal is closed
        onCloseModal(); // Trigger onCloseModal callback to close the modal
      }}
      center // Center the modal on the screen
    >
      <FormStyled onSubmit={handleSubmit}>
        <div className="input-control">
          <input
            type="text"
            value={label}
            name={"title"}
            placeholder="Category Label"
            onChange={handleInput}
          />
        </div>
        <div className="submit-container">
          <div className="submit-btn">
            <Button
              name={"Add Category"}
              icon={plus}
              bPad={".8rem 1.6rem"}
              bRad={"30px"}
              bg={"var(--color-accent"}
              color={"#fff"}
            />
          </div>
        </div>
      </FormStyled>
    </Modal>
  );
};

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

export default CategoryForm;
