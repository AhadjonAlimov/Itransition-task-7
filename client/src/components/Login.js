import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';


export default function Login({setIsLogged}) {
    const cookies = new Cookies()
    const [username, setUsername] = useState("");

    const login = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            username
        })
        .then((res) => {
            const { token, userId, username } = res.data;
            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("username", username);
            setIsLogged(true);
        })
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center customBg py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover">
            <div className="absolute inset-0 z-0"></div>
            <div className="mt-2 items-center z-10">
                <div className="p-14 bg-white max-w-sm mx-auto rounded-xl shadow-xl overflow-hidden space-y-10">
                    <h2 className="text-4xl font-bold text-center customColor">Login</h2>
                    <div className="f-outline px-2 relative border rounded-lg focus-within:border-[#10b981]">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <button
                            className="px-6 py-2 font-semibold cursor-pointer text-center focus:outline-none transition hover:shadow-lg shadow hover:bg-[#10ab77] rounded-full text-white customBg"
                            onClick={login}
                        >
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
