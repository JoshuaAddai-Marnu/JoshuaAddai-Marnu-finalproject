import { useCallback, useState } from "react";

export const useInput = (initialParams) => {
  const [inputValues, setInputValues] = useState(initialParams);

  const updateInputValues = useCallback((name, value) => {
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const resetInputVlues = useCallback(() => {
    setInputValues(initialParams);
  }, [initialParams]);

  return {
    inputValues,
    updateInputValues,
    resetInputVlues,
  };
};
