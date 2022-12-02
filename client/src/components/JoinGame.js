import React, { useState } from 'react';
import { useChatContext, Channel } from 'stream-chat-react';
import TicTacToe from './TicTacToe';


export default function JoinGame({ logout }) {
    const [rivalUsername, setRivalUsername] = useState("");
    const [channel, setChannel] = useState(null);
    const { client } = useChatContext();

    const createChannel = async () => {
        const res = await client.queryUsers({ name: { $eq: rivalUsername } });
        if (res.users.length === 0) {
            alert("User not found");
            return;
        }
        const newChannel = await client.channel("messaging", {
            members: [client.userID, res.users[0].id],
        })
        await newChannel.watch()
        setChannel(newChannel);
    }

    return (
        <section className="lobby-screen flex flex-col justify-center h-screen duration-700 p-6 items-center customBg opacity-1">
            {channel ? (
                <Channel channel={channel}>
                    <TicTacToe channel={channel} setChannel={setChannel} />
                </Channel>
            ) : (
                <div className="mt-2 items-center z-10 w-[350px]">
                    <button
                        className="px-6 w-full py-2 font-semibold cursor-pointer text-center focus:outline-none transition hover:shadow-lg shadow hover:bg-green-200 rounded-full customColor bg-white"
                        onClick={logout}
                    >
                        Logout
                    </button>
                    <div className="p-8 customBg max-w-sm mx-auto rounded-xl shadow-xl overflow-hidden space-y-10">
                        <h2 className="text-4xl font-bold text-center text-white">Type Name</h2>
                        <div className="f-outline px-2 relative border rounded-lg focus-within:border-[#10b931] bg-white">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="block p-2 w-full text-lg appearance-none focus:outline-none bg-white"
                                onChange={(e) => setRivalUsername(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <button
                                className="px-6 py-2 font-semibold cursor-pointer text-center focus:outline-none transition hover:shadow-lg shadow hover:bg-green-100 rounded-full customColor bg-white"
                                onClick={createChannel}
                            >
                                FIND
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </section>
    )
}
