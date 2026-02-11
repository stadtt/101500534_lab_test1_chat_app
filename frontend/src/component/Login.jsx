import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../api/UserApi/UserAPI";
import "bootstrap/dist/css/bootstrap.min.css";


function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loginDetails, setLoginDetails] = useState({ username: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails({ ...loginDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await UserAPI.loginUser(loginDetails);
            console.log("Login successful:", response);
            setError("");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card p-5 shadow" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            value={loginDetails.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={loginDetails.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                    <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => navigate("/signup")}>
                        Don't have an account? Sign up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login