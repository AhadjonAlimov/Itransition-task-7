import { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import Login from "./components/Login";
import JoinGame from "./components/JoinGame";


export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const cookies = new Cookies();
  const api_key = "eg4ygffc3kj5";
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);

  const LogOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsLogged(false);
  };

  if (token) {
    client.connectUser(
      {
        id: cookies.get("userId"),
        name: cookies.get("username"),
      },
      token
    ).then((user) => {
      setIsLogged(true);
    })
  }
  return (
    <div>
      {isLogged ? (
        <Chat client={client}>
          <JoinGame logout={LogOut} />
        </Chat>
      ) : (
        <Login setIsLogged={setIsLogged} />
      )}
    </div>
  )
}