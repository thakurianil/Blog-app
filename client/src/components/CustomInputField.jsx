import React from "react";
import { Form } from "react-bootstrap";

export const CustomInputField = ({ labelName, ...rest }) => {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>{labelName}</Form.Label>
        <Form.Control {...rest} />
      </Form.Group>
    </>
  );
};
