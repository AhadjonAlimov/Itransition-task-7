import React, { useEffect, useState } from 'react';
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
import { Patterns } from "../utils/WinPatterns";
import { GameIcon } from './XO';


export default function Board({ result, setResult, player, setPlayer, turn, setTurn }) {
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", "",]);

    const { channel } = useChannelStateContext();
    const { client } = useChatContext();

    useEffect(() => {
        isDraw();
        checkWinner();
    }, [board]);

    const chooseSquare = async (square) => {
        if (turn === player && board[square] === "") {
            setTurn(player === "X" ? "O" : "X");

            await channel.sendEvent({
                type: "game-move",
                data: { square, player },
            });
            setBoard(
                board.map((val, idx) => {
                    if (idx === square && val === "") {
                        return player;
                    }
                    return val;
                })
            );
        }
    };

    const checkWinner = async () => {
        Patterns.forEach((currentPattern) => {
            const firstPlayer = board[currentPattern[0]];
            if (firstPlayer === "") return;
            let foundWinner = true;
            currentPattern.forEach((idx) => {
                if (board[idx] !== firstPlayer) {
                    foundWinner = false;
                }
            });

            if (foundWinner) {
                setResult({ winner: board[currentPattern[0]], state: "won" });
            }
        })
    }

    const isDraw = () => {
        let filled = true;
        board.forEach((square) => {
            if (square === "") {
                filled = false;
            }
        });

        if (filled) {
            setResult({ winner: "none", state: "draw" });
        }
    };

    channel.on((event) => {
        if (event.type === "game-move" && event.user.id !== client.userID) {
            const currentPlayer = event.data.player === "X" ? "O" : "X";
            setPlayer(currentPlayer);
            setTurn(currentPlayer);
            setBoard(
                board.map((val, idx) => {
                    if (idx === event.data.square && val === "") {
                        return event.data.player;
                    }
                    return val;
                })
            );
        }
    });
    console.log(result.state, result.winner);
    return (
        <div className="game-screen__grid flex flex-col h-full justify-center content-center max-w-xs">
            <div className="self-center ">
                <div className={`${player === turn && result.state === "none" ? "cursor-pointer" : "cursor-not-allowed"} text-3xl max-w-xs`}>
                    <div className="flex -mb-2 gap-2">
                        <div
                            id="0"
                            className="hover:bg-green-900 game-screen__cell flex items-center justify-center w-20 mb-4 h-20 bg-transparent border-white border-2 rounded-xl bg-white bg-opacity-0 hover:bg-opacity-25 duration-300"
                            onClick={() => result.state === "none" && chooseSquare(0)}
                        >
                            <GameIcon gameMove={board[0]} />
                        </div>
                        <div
                            id="1"
                            className="hover:bg-green-900 game-screen__cell flex items-center justify-center w-20 mb-4 h-20 bg-transparent border-white border-2 rounded-xl bg-white bg-opacity-0 hover:bg-opacity-25 duration-300"
                            onClick={() => result.state === "none" && chooseSquare(1)}
                        >
                            <GameIcon gameMove={board[1]} />
                        </div>
                        <div
                            id="2"
                            className="hover:bg-green-900 game-screen__cell flex items-center justify-center w-20 mb-4 h-20 bg-transparent border-white border-2 rounded-xl bg-white bg-opacity-0 hover:bg-opacity-25 duration-300"
                            onClick={() => result.state === "none" && chooseSquare(2)}
                        >
                            <GameIcon gameMove={board[2]} />
                        </div>
                    </div>

                    <div className="flex -mb-2 gap-2">
                        <div
                            id="3"
                            className="hover:bg-green-900 game-screen__cell flex items-center justify-center w-20 mb-4 h-20 bg-transparent border-white border-2 rounded-xl bg-white bg-opacity-0 hover:bg-opacity-25 duration-300"
                            onClick={() => result.state === "none" && chooseSquare(3)}
                        >
                            <GameIcon gameMove={board[3]} />
                        </div>
                        <div
                            id="4"
                            className="hover:bg-green-900 game-screen__cell flex items-center justify-center w-20 mb-4 h-20 bg-transparent border-white border-2 rounded-xl bg-white bg-opacity-0 hover:bg-opacity-25 duration-300"
                            onClick={() => result.state === "none" && chooseSquare(4)}
                        >
                            <GameIcon gameMove={board[4]} />
                        </div>
                        <div
                            id="5"
                            className="hover:bg-green-900 game-screen__cell flex items-center justify-center w-20 mb-4 h-20 bg-transparent border-white border-2 rounded-xl bg-white bg-opacity-0 hover:bg-opacity-25 duration-300"
                            onClick={() => result.state === "none" && chooseSquare(5)}
                        >
                            <GameIcon gameMove={board[5]} />
                        </div>
                    </div>


                    <div className="flex -mb-2 gap-2">
                        <div
                            id="6"
                            className="hover:bg-green-900 game-screen__cell flex items-center justify-center w-20 mb-4 h-20 bg-transparent border-white border-2 rounded-xl bg-white bg-opacity-0 hover:bg-opacity-25 duration-300"
                            onClick={() => result.state === "none" && chooseSquare(6)}
                        >
                            <GameIcon gameMove={board[6]} />
                        </div>
                        <div
                            id="7"
                            className="hover:bg-green-900 game-screen__cell flex items-center justify-center w-20 mb-4 h-20 bg-transparent border-white border-2 rounded-xl bg-white bg-opacity-0 hover:bg-opacity-25 duration-300"
                            onClick={() => result.state === "none" && chooseSquare(7)}
                        >
                            <GameIcon gameMove={board[7]} />
                        </div>
                        <div
                            id="8"
                            className="hover:bg-green-900 game-screen__cell flex items-center justify-center w-20 mb-4 h-20 bg-transparent border-white border-2 rounded-xl bg-white bg-opacity-0 hover:bg-opacity-25 duration-300"
                            onClick={() => result.state === "none" && chooseSquare(8)}
                        >
                            <GameIcon gameMove={board[8]} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
