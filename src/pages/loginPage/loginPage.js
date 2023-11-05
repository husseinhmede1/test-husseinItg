import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../../reducers/userSlice.js";
import LoaderComponent from "../../components/LoaderComponent.js";
import "./loginPage.css";


export default function SignIn() {
    const { REACT_APP_API_ENDPOINT } = process.env;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const user = useSelector((state) => state.userSlice.user);

    // useEffect to redirect to institutionPage if user is already logged in
    useEffect(() => {
        if (user) {
            navigate("/institutionPage");
        }
    }, [user])

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setLoader(true);

        try {
            // Sending a POST request to authenticate user
            const response = await axios.post(
                `${REACT_APP_API_ENDPOINT}/authenticate`,
                {
                    password: formData.get('password'),
                    username: formData.get('username'),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // Extracting JWT token from the response headers
            const jwtToken = response.headers['jwttoken'];

            // Dispatching a Redux action to log in the user
            dispatch(
                login({
                    username: formData.get('username'),
                    loggedIn: true,
                    token: jwtToken,
                })
            );

            // Resetting the loader state and redirecting to institutionPage
            setLoader(false);
            navigate("/institutionPage");
        } catch (error) {
            setLoader(false);
            alert(error);
        }
    };


    return (
        <div>
            {/* Loader component that displays a loading indicator */}
            <LoaderComponent loader={loader} />
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" id="username" name="username" placeholder='&#128100; Username' required />
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" name="password" placeholder='&#128274; Password' required />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>

    );
}