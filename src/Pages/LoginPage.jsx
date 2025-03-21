import "LoginPage.css";
import React, {useState} from "react";

function LoginPage(){
    const [emails, setEmails] = useState("");
    const [passwords, setPasswords] = useState("");

    return (
        <div>
            <h1>Login Page</h1>
            <form
                onSubmit={(e) => {
                    () => {
                        // Check user credentials
                        // Navigate to Home Page
                    }
                }}>

                <label>Email</label>
                <input 
                    type="email">
                </input>

                <label>Password</label>
                <input
                    type="password">
                </input>

                <button type="submit">
                    Login
                </button>

                <button
                    onClick={() => {
                        // Navigate to Register Page
                    }}>
                    Register
                </button>
            </form>
        </div>
    )
}

export default LoginPage;
