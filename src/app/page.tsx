"use client";

import { useState } from "react";
import { Users, MessageSquare, Bot, Edit, Send } from "lucide-react";
import { Avatar } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function TelegramClone() {
  const [chats] = useState([
    { id: 1, profile: "https://mui.com/static/images/avatar/1.jpg", name: "fn3", msg: "salom", time: "2:46PM" },
    { id: 2, profile: "https://mui.com/static/images/avatar/2.jpg", name: "FullStack FN3", msg: "salom", time: "2:45PM" },
    { id: 3, profile: "https://mui.com/static/images/avatar/3.jpg", name: "Najot Ta'lim", msg: "salom", time: "2:44PM" },
    { id: 4, profile: "https://mui.com/static/images/avatar/1.jpg", name: "Bot", msg: "salom", time: "2:34PM" },
    { id: 5, profile: "https://mui.com/static/images/avatar/3.jpg", name: "Nasriddinov", msg: "salom", time: "2:11PM" },
    { id: 6, profile: "https://mui.com/static/images/avatar/3.jpg", name: "17", msg: "salom", time: "1:23PM" },
  ]);

  const users = [
    { id: 1, name: "User 1", img: "https://mui.com/static/images/avatar/1.jpg" },
    { id: 2, name: "User 2", img: "https://mui.com/static/images/avatar/2.jpg" },
    { id: 3, name: "User 3", img: "https://mui.com/static/images/avatar/3.jpg" },
    { id: 4, name: "User 4", img: "https://mui.com/static/images/avatar/3.jpg" },
  ];

  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = () => {
    if (!inputMessage.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage],
    }));

    setInputMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <div className="w-[350px] bg-gray-800 flex">
        <div className="w-16 bg-gray-700 flex flex-col items-center py-4 space-y-6">
          <button><span className="text-xl">≡</span></button>
          <button className="relative">
            <MessageSquare size={22} />
          </button>
          <Users size={22} />
          <Bot size={22} />
          <Edit size={22} />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-3 border-b border-gray-700 flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="w-[250px] bg-gray-700 text-sm px-3 py-2 rounded-md focus:outline-none"
            />
          </div>

          <div style={{ width: 250 }}>
            <Swiper spaceBetween={10} slidesPerView={3}>
              {users.map((user) => (
                <SwiperSlide key={user.id}>
                  <div style={{ textAlign: "center" }}>
                    <Avatar
                      alt={user.name}
                      src={user.img}
                      sx={{ width: 70, height: 70, margin: "auto" }}
                    />
                    <p style={{ fontSize: 13, marginTop: 5 }}>{user.name}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex-1 w-[285px] overflow-y-auto">
            {chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className="flex items-center justify-between px-4 py-3 border-b border-gray-700 hover:bg-gray-700 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Avatar src={chat.profile} alt={chat.name} />
                  <div>
                    <p className="font-medium">{chat.name}</p>
                    <p className="text-xs text-gray-400 truncate w-40">{chat.msg}</p>
                  </div>
                </div>
                <div className="mr-[50px]">
                  <p className="text-xs text-gray-400">{chat.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gray-900 relative">
        {selectedChat ? (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center border-b border-gray-700 p-4">
              <div className="flex items-center gap-3">
                <Avatar src={selectedChat.profile} alt={selectedChat.name} />
                <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
              </div>
              <button onClick={() => setSelectedChat(null)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {(messages[selectedChat.id] || []).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-xs ${msg.sender === "me"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-200"
                      }`}
                  >
                    <p>{msg.text}</p>
                    <p className="text-xs text-gray-300 text-right">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-700 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Xabar yozing..."
                className="flex-1 bg-gray-700 px-4 py-2 rounded-full focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-blue-600 rounded-full hover:bg-blue-700"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Chat tanlang
          </div>
        )}
      </div>
    </div>
  );
}
