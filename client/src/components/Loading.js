import React from 'react';


export default function Loading() {
    return (
        <section className="loading-screen flex flex-col h-screen duration-700 p-6 items-center customBg">
            <div className="lobby-title flex flex-row justify-center">
                <p className="loading-screen__text font-normal text-3xl text-gray-600 animate-pulse pt-10 text-center"></p>
            </div>
            <h2 className="text-white text-2xl font-bold text-center ">Waiting for other player to join...</h2>
            <div className="loading-screen__container flex flex-col h-full justify-center bg-">
                <div className="oading-screen__indicator self-center animate-bounce">
                    <svg width="120" height="120" viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg" fill="#FFF">
                        <circle cx="12.5" cy="12.5" r="12.5" fillOpacity=".7">
                            <animate attributeName=" fillOpacity" begin="0s" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                        <circle cx="12.5" cy="52.5" r="12.5" fillOpacity=".7">
                            <animate attributeName=" fillOpacity" begin="100ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                        <circle cx="52.5" cy="12.5" r="12.5" fillOpacity=".7">
                            <animate attributeName=" fillOpacity" begin="300ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                        <circle cx="52.5" cy="52.5" r="12.5" fillOpacity=".7">
                            <animate attributeName=" fillOpacity" begin="600ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                        <circle cx="92.5" cy="12.5" r="12.5" fillOpacity=".7">
                            <animate attributeName=" fillOpacity" begin="800ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                        <circle cx="92.5" cy="52.5" r="12.5" fillOpacity=".7">
                            <animate attributeName=" fillOpacity" begin="400ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                        <circle cx="12.5" cy="92.5" r="12.5" fillOpacity=".7">
                            <animate attributeName=" fillOpacity" begin="700ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                        <circle cx="52.5" cy="92.5" r="12.5" fillOpacity=".7">
                            <animate attributeName=" fillOpacity" begin="500ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                        <circle cx="92.5" cy="92.5" r="12.5" fillOpacity=".7">
                            <animate attributeName=" fillOpacity" begin="200ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                    </svg>
                </div>
            </div>

            {/* <button  className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-xl mb-10">
                    Cancel
                </button> */}

        </section>
    )
}
