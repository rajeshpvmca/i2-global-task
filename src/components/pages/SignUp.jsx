import React, { useState, useEffect } from "react";
import { Button, Input, Form, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from "../store/authActions";

export default function SignUp() {
    const { success1, error1, loading1 } = useSelector((state) => state.auth);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const passwordPattern =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const handleSubmit = (val) => {
        let inputJson = {
            "name": val.fullname,
            "email": val.email,
            "password": val.password,
        };
        console.log("inputJson", inputJson);
        dispatch(userRegister(inputJson));
        form.resetFields();
    };

    const validateConfirmPassword = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
            }
            return Promise.reject(
                new Error("The two passwords that you entered do not match!")
            );
        },
    });

    useEffect(() => {
        if (success1) {
            message.success("User Created Successfully");
            navigate('/login');
        } else if (error1 !== null) {
            message.error("User Already Exists");
            navigate('/signup');
        }
    }, [success1, error1, navigate]);

    return (
        <>
            <div className="d-flex px-2 py-2 login_bg  rounded">
                <div className="col-lg-12 col-md-12 d-flex flex-column justify-content-center align-items-center">
                    <div className="login-form-wrapper bg-light shadow p-4 rounded ">
                        <div className="text-center mb-4">
                            <h2 className="text-center text-black mt-2">SignUp</h2>
                        </div>
                        <Form
                            form={form}
                            layout="vertical"
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            autoComplete="off"
                            onFinish={handleSubmit}
                        >
                            <Form.Item
                                label="Name"
                                name="fullname"
                                className="fw-6 "
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                className="fw-6 mb-2"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required!",
                                    },
                                    {
                                        type: "email",
                                        message: "Enter valid email address",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                key={Math.random()}
                                label="Password"
                                name="password"
                                className="w-100 fw-6 mb-2"
                                rules={[
                                    {
                                        required: true,
                                        message: "Password is required",
                                    },
                                    {
                                        pattern: passwordPattern,
                                        message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character'
                                    }
                                ]}
                            >
                                <Input.Password autoComplete="new-password" />
                            </Form.Item>

                            <Form.Item
                                validateTrigger="onChange"
                                label="Confirm Password"
                                name="confirmpassword"
                                className="w-100 fw-6 mb-2"
                                rules={[
                                    {
                                        required: true,
                                        message: "Confirm password is required",
                                    },
                                    validateConfirmPassword,
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Button
                                block
                                className="btn btn-primary my-4 "
                                size="large"
                                htmlType="submit"
                                loading={loading1}
                            >
                                Registration
                            </Button>
                            <div className="d-flex">
                                <p className="fw-6">
                                    Already have an account?{" "}
                                    <Link to="/login" className="text_primary">
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}
