import { useEffect, useState } from "react";
import axios from "axios";
import { Host, ApiRoutes } from "../constants/constants";

const Dashboard = () => {
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const userId = sessionStorage.getItem("userId"); // Retrieve user ID from sessionStorage
        if (!userId) {
            setError("User ID is missing. Please log in again.");
            return;
        }

        const fetchGoals = async () => {
            try {
                // http://localhost:8080/Dashboard/?id=1

                // const response = await axios.get(Host.APIHOST + ApiRoutes.DASHBOARD +`?id=${userId}`);
                const response = await axios.get(ApiRoutes.DASHBOARD);

                if (response.status === 200) {
                    setGoals(response.data);
                }
            } catch (err) {
                setError(err.response?.data || "Failed to fetch goals");
            }
        };

        fetchGoals();
    }, []);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {error && <p className="text-red-500">{error}</p>}
            {goals.length === 0 && !error ? (
                <p>Loading goals...</p>
            ) : (
                <div className="space-y-5">
                    {goals.map((goal) => (
                        <div
                            key={goal.gid}
                            className="border rounded-lg p-4 shadow-lg bg-gray-100"
                        >
                            <h2 className="text-xl font-semibold">{goal.goalTitle}</h2>
                            <p>{goal.goalDesc}</p>
                            <p>
                                <strong>Type:</strong> {goal.goalType}
                            </p>
                            <p>
                                <strong>Status:</strong> {goal.goalStatus}
                            </p>
                            <p>
                                <strong>Priority:</strong> {goal.goalPriority}
                            </p>
                            <p>
                                <strong>Start Date:</strong>{" "}
                                {new Date(goal.goalStartDate).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>End Date:</strong>{" "}
                                {new Date(goal.goalEndDate).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Reference:</strong> {goal.goalRef}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
