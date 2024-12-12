import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Host, ApiRoutes, ReactRoutes } from "../constants/constants";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [showErr, setShowErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email && password && name && rollNo) {
            const newUser = {
                userName: name,
                mailId: email,
                password: password,
                rollNo: rollNo,
                userStatus: "ACTIVE", // Default status
                userRole: "USER", // Default role
            };

            try {
                const response = await axios.post(`${Host.APIHOST}${ApiRoutes.SIGNUP}`, newUser);
                if (response.status === 201) {
                    alert("User created successfully");
                    navigate(ReactRoutes.LOGIN);
                }
            } catch (error) {
                console.error("Signup Error:", error);
                setErrMsg(error.response?.data?.message || "Failed to create user. Please try again.");
                setShowErr(true);
            }
        } else {
            setErrMsg("All fields are required.");
            setShowErr(true);
        }
    };

    return (
        <div className="w-screen h-screen bg-white text-xl flex flex-col justify-center items-center">
            <form className="flex flex-col justify-start space-y-5" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="Name"> Name</label>
                    <input
                        id="Name"
                        type="text"
                        className="bg-white rounded-2xl p-3 border-2 border-black"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="Email"> Email</label>
                    <input
                        id="Email"
                        type="email"
                        className="bg-white rounded-2xl p-3 border-2 border-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="RollNo"> Roll Number</label>
                    <input
                        id="RollNo"
                        type="text"
                        className="bg-white rounded-2xl p-3 border-2 border-black"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="Password"> Password</label>
                    <input
                        id="Password"
                        type="password"
                        className="bg-white rounded-2xl p-3 border-2 border-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="p-3 w-full bg-blue-500 rounded-2xl">
                    Signup
                </button>
                {showErr && <p className="text-red-500 w-fit">{errMsg}</p>}
            </form>
        </div>
    );
};

export default Signup;
