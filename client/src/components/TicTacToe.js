import React, { useState } from 'react';
import Loading from './Loading';
import Board from './Board';


export default function TicTacToe({ channel, setChannel }) {
    const [result, setResult] = useState({ winner: "none", state: "none" });
    const [player, setPlayer] = useState("X");
    const [turn, setTurn] = useState("X");
    const [joinedPlayers, setJoinedPlayers] = useState(channel.state.watcher_count === 2);

    channel.on("user.watching.start", (e) => {
        setJoinedPlayers(e.watcher_count === 2)
    });

    if (!joinedPlayers) {
        return <Loading />
    }
    console.log(joinedPlayers);
    console.log(channel.state.watcher_count);
    return (
        <section className="game-screen flex flex-col h-screen duration-700 p-6 customBg  items-center opacity-1">
            <div className="game-screen__title flex max-w-xs mt-10">
                <h1 className="game-screen__title-text text-3xl text-white">{player === turn ? "Your" : turn} turn</h1>
            </div>
            {result.state === "won" && <h2 className="game-screen__title-text text-3xl text-white"> {result.winner} Won The Game</h2>}
            {result.state === "draw" && <h2 lassName="game-screen__title-text text-3xl text-white"> Draw</h2>}
            <Board result={result} setResult={setResult} player={player} setPlayer={setPlayer} turn={turn} setTurn={setTurn} />
            <div className="game-screen__bottom-panel flex justify-center w-full max-w-xs gap-3 h-24">
                <button
                    className="bg-transparent hover:bg-white text-white font-semibold hover:text-green-500 py-2 px-4 border border-white hover:border-transparent rounded-xl mb-10 w-2/3"
                    onClick={async () => {
                        await channel.stopWatching();
                        setChannel(null);
                    }}
                >
                    Exit
                </button>
            </div>
        </section>
    )
}
