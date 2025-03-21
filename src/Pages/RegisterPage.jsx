import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(""); 

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setMessage("Password must be at least 6 characters");
            return;
        }
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        setMessage(data.msg);

        // Navigate only if registration is successful
        if (response.ok) {
            setTimeout(() => navigate("/HomePage"), 1000);
        }
    };

    return (
        <div>
            <h1>Registration Page</h1>
            <form onSubmit={handleRegistration}>
                <label>Email</label>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label>Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <p>{message}</p>

                <button type="button" onClick={() => navigate("/LoginPage")}>
                    Back
                </button>
                
                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;
