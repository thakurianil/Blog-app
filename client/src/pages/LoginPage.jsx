import React, { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../utils/AuthContext";
import { CustomInputField } from "../components/CustomInputField";
import { useForm } from "../hooks/useForm";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // use custom hooks
  const { formData, handleOnChange } = useForm({
    email: "",
    password: "",
  });

  // const customData = useForm({});

  // const formData =  customData[0];
  // const setFormData = customData[1];
  // const handleOnChange = customData[2];

  // const [formData, setFormData, handleOnChange] = useForm({

  // });

  // const temp = useState(1000);
  // const data = temp[0];
  // const setData = temp[1];

  // const [data, setData] = useState(1000);

  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleOnChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    await login(formData);

    navigate("/");
  };

  const inputFields = [
    {
      type: "email",
      name: "email",
      labelName: "Enter Emaill",
      placeholder: "Enter Email address",
      value: formData.email,
      onChange: handleOnChange,
    },

    {
      type: "password",
      name: "password",
      labelName: "Password",
      placeholder: "Enter Password",
      value: formData.password,
      onChange: handleOnChange,
    },
  ];

  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Row>
          <Col>
            <Form
              className="border p-4 rounded shadow"
              onSubmit={handleOnSubmit}
            >
              <Form.Group className="mb-3 d-flex align-items-center justify-content-center">
                <Link to="/">
                  <Image
                    style={{ width: "50px", height: "auto" }}
                    src="/logo.png"
                    fluid
                  />
                </Link>
              </Form.Group>
              <hr />
              {inputFields.map((field, index) => {
                return <CustomInputField key={index} {...field} />;
              })}

              <Button variant="success" type="submit">
                Login
              </Button>
              <Link to="/signup">
                <Button className="ms-2" variant="primary" type="submit">
                  Signup
                </Button>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
