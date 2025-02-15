
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { socket } from "@/config/socket";
import { useAuth } from "@/context/auth";
import { Input } from "./input";

interface Message {
  sender: string;
  text: string;
}

const ChatPageComponent: React.FC = () => {
  const { user } = useAuth();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [joinRoomId, setJoinRoomId] = useState<string>("");

  useEffect(() => {
    socket.on("sendMessageServer", (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("sendMessageServer");
    };
  }, []);

  const randomAlphaNumeric = (length: number): string => {
    let s = "";
    Array.from({ length }).some(() => {
      s += Math.random().toString(36).slice(2);
      return s.length >= length;
    });
    return s.slice(0, length);
  };

  const handleCreateRoom = () => {
    const newRoomId = randomAlphaNumeric(5);
    setRoomId(newRoomId);
    socket.emit("joinRoom", { roomId: newRoomId });
  };

  const handleJoinRoom = () => {
    setRoomId(joinRoomId);
    socket.emit("joinRoom", { roomId: joinRoomId });
    setJoinRoomId("");
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = { sender: user?.userId || "", text: message };
      // setMessages([...messages, newMessage]);
      socket.emit("sendMessage", { room: roomId, message: newMessage });
      setMessage("");
    }
  };

  console.log(messages)
  return (
    <div className="container mx-auto shadow-lg rounded-lg shadow-teal-400">
      <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
        <div className="font-semibold text-2xl">
          KhwopaChat {roomId && `- ${roomId}`}
        </div>
        {/* <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
          {user?.name
            ?.split(" ")
            .map((n) => n[0])
            .join(".")}
        </div> */}
      </div>
      {!roomId ? (
        <div className="flex items-center justify-center gap-4 my-6">
          <Button onClick={handleCreateRoom}>Create Room</Button>
          <div className="flex items-center justify-center my-6">
            <Input
              className="w-28 border-black rounded-r-none"
              placeholder="Room id here..."
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
            ></Input>
            <Button onClick={handleJoinRoom} className="rounded-l-none">
              Join Room
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full px-5 flex flex-col justify-between h-[calc(100vh-120px)]">
          <div className="flex flex-col py-4 px-2 h-[calc(100vh-200px)] overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-4 ${
                  msg.sender === user?.userId ? "justify-end" : "justify-start"
                }`}
              >
                {/* {msg.sender !== user?.userId && (
                  <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
                    {msg.sender
                      ?.split(" ")
                      .map((n) => n[0])
                      .join(".")}
                  </div>
                )} */}
                <div
                  className={`ml-2 py-3 px-4 max-w-2xl rounded-xl text-white ${
                    msg.sender === user?.userId ? "bg-teal-400" : "bg-gray-400"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="py-5 flex items-center">
            <input
              className="w-full bg-gray-300 py-3 px-3 rounded-xl"
              type="text"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button className="ml-2" onClick={handleSendMessage}>
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPageComponent;