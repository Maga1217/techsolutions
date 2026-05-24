import { useState } from "react";

// hook simples para gerir erros de formulário
const useFormErrors = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const setFormErrors = (newErrors: string[]) => {
    setErrors(newErrors);
  };

  const clearErrors = () => {
    setErrors([]);
  };

  return { errors, setFormErrors, clearErrors };
};

export default useFormErrors;
