
import axios from "axios";
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { ReactRoutes,ApiRoutes, Host } from "../constants/constants";



const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [showErr, setShowErr] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.length !== 0 && password.length !== 0) {
            try {
                const response = await axios.get(Host.APIHOST + ApiRoutes.LOGIN + `?email=${email}&password=${password}`);
                console.log(response);
                if (response.status === 200) {
                    const user = response.data; // Assuming response.data contains user details
                    const { id } = user; // Extract user ID
                    if (!id) throw new Error("User ID is missing in the response");

                    sessionStorage.setItem("userId", id); // Store user ID in sessionStorage

                    navigate(ReactRoutes.DASHBOARD); // Redirect to Dashboard
                }
            } catch (error) {
                console.log(error);
                setErrMsg("Invalid Credentials");
                setShowErr(true);
            }
        } else {
            setErrMsg("Email and Password are required");
            setShowErr(true);
        }
    };

    return (
        <div className="w-screen h-screen bg-white  text-xl flex flex-col justify-center items-center">
            <div className="flex flex-col justify-start space-y-5">
                <div className="flex flex-col">

                    <label htmlFor="Email"> Email</label>
                    <input id="Email" type="text"
                           className="bg-white rounded-2xl p-3 border-2 border-black"
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="flex flex-col">

                    <label htmlFor="password"> Password</label>
                    <input id="password" type="text" className="bg-white rounded-2xl p-3 border-2 border-black"
                           onChange={(e) => setPassword(e.target.value)}/>

                </div>
                <button className="p-3 w-full bg-red-500 rounded-2xl"
                        onClick={(e) => handleSubmit(e)}>Submit
                </button>
                {showErr && <p className="text-black w-fit">{errMsg}</p>}
                <p className="text-center mt-4">
                    Don&#39;t have an account? <a href="/signup" className="text-blue-500 underline">Signup here</a>
                </p>
            </div>

        </div>
    )
}

export default Login
