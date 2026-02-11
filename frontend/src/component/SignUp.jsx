import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../api/UserApi/UserAPI";
import "bootstrap/dist/css/bootstrap.min.css";


function SignUp() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ username: "", password: "", firstname:"",lastname:""});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await UserAPI.SignUpUser(formData);
            console.log("Signup successful:", response);
            setError("");
        } catch (error) {
            console.log(error);
            setError(error.message || "Signup failed");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card p-5 shadow" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                            type="firstname"
                            name="firstname"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                            type="Last Name"
                            name="Last Name"
                            className="form-control"
                            value={formData.email}
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
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <button type="submit" className="btn btn-primary w-100">
                        Sign Up
                    </button>
                    <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => navigate("/login")}>
                        Already have an account? Login
                    </button>
                </form>
            </div>
        </div>
    );
}



export default SignUp