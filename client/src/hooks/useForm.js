import { useState } from "react";

const hookHandleOnChange = ({ e, formData, setFormData }) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value,
  });
};

export const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  return {
    formData,
    setFormData,
    handleOnChange: (e) => {
      hookHandleOnChange({ e, formData, setFormData });
    },
  };

  // return [
  //   formData,
  //   setFormData,
  //   (e) => {
  //     hookHandleOnChange({ e, formData, setFormData });
  //   },
  // ];
};
