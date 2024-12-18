import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from "../store/authActions";

export default function Login() {
    const { success, error, loading } = useSelector((state) => state.auth);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (values) => {
        const inputJson = {
            "username": values.userName,
            "password": values.password,
        };
        dispatch(userLogin(inputJson));
    };

    useEffect(() => {
        if (success) {
            message.success("Login Successfully");
            navigate("/notes");
        } else if (error !== null) {
            message.error("Username or Password Incorrect");
        }
    }, [success, error, navigate]);

    return (
        <div className="d-flex px-2 py-2 login_bg  rounded">

            <div className="col-lg-12 col-md-12 d-flex flex-column justify-content-center align-items-center">
                <div className="login-form-wrapper bg-light shadow p-4 rounded">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-dark mt-2">Login</h2>
                        <p className="text-muted">Welcome back! Let's get started.</p>
                    </div>
                    <Form
                        form={form}
                        layout="vertical"
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        autoComplete="off"
                        onFinish={handleLogin}
                    >
                        <Form.Item
                            label="user Name"
                            name="userName"
                            className="fw-6"
                            rules={[
                                { required: true, message: "This field is required!" },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            className="fw-6"
                            rules={[{ required: true, message: "This field is required!" }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Button
                            block
                            className="btn btn-primary"
                            size="large"
                            htmlType="submit"
                            loading={loading}
                        >
                            Login
                        </Button>

                        <p className="fw-6 my-3">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text_primary">
                                Sign Up
                            </Link>
                        </p>
                    </Form>
                </div>
            </div>
        </div>
    );
}
