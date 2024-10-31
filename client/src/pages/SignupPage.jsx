import React, { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { CustomInputField } from "../components/CustomInputField";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [email, setEmail] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    comfirmPassword: "",
  });

  const handleOnChange = (e) => {
    // const tempFormData = {
    //   ...formData
    // }

    // tempFormData[e.target.name] = e.target.value
    // setFormData(tempFormData);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    if (formData.password === formData.comfirmPassword) {
      // signup axios call
      toast.success("SIGNUP SUCCESS");
    } else {
      toast.error("PASSWORD MISMATCH!!");
    }
  };

  const inputFields = [
    {
      type: "text",
      name: "username",
      labelName: "User Name",
      placeholder: "Enter User Name",
      value: formData.username,
      onChange: handleOnChange,
      required: true,
    },

    {
      type: "email",
      name: "email",
      labelName: "Enter Emaill",
      placeholder: "Enter Email address",
      value: formData.email,
      onChange: handleOnChange,
      required: true,
    },

    {
      type: "password",
      name: "password",
      labelName: "Password",
      placeholder: "Enter Password",
      value: formData.password,
      onChange: handleOnChange,
    },

    {
      type: "password",
      name: "comfirmPassword",
      labelName: "Confirm Password",
      placeholder: "Confirm Password",
      value: formData.comfirmPassword,
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
                Signup
              </Button>
              <Link to="/login">
                <Button className="ms-2" variant="primary" type="submit">
                  Login
                </Button>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignupPage;
