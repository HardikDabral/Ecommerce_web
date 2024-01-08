import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Auth.module.css'

function Auth() {
    const navigate = useNavigate();
    const [userFields, setUserFields] = useState({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const handleFieldChange = (event) => {
        setUserFields({ ...userFields, [event.target.name]: event.target.value });
    };

    const handleLogin = (event) => {
        if (!userFields.username || !userFields.password) {
            setErrorMessage("Please enter both username and password.");
            return;
        }

        fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: userFields.username,
                password: userFields.password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("authToken", data.token);
                    console.log("Token saved:", data.token);
                    navigate("/home"); 
                } else {
                    setErrorMessage("Invalid username or password. Please try again.");
                }
            })
            .catch((err) => {
                console.error(err);
                setErrorMessage("An error occurred. Please try again.");
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <section className={["border p-4 rounded shadow", styles['Box']].join(" ")}>
                <h2 className="text-center mb-4">Login</h2>

                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}

                <div className="mb-3">
                    <label htmlFor="username" className={["form-label", styles['icon']].join(" ")}>
                        Username<i class="ph ph-user-circle mx-1"></i>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        onChange={handleFieldChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className={["form-label", styles['icon']].join(" ")}>
                        Password<i class="ph ph-password mx-2"></i>
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleFieldChange}
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="btn btn-primary w-100"
                >
                    Submit
                </button>
            </section>
        </div>
    );
}

export default Auth;
