'use client';

import { useState } from "react";
import { ReceiverMessage } from "./components/ReceiverMessage";
import { SenderMessage } from "./components/SenderMessage";


interface Message {
  message: string;
  type: "sender" | "receiver";
}

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }

  const onEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleQuestionSent();
    }
  }

  const handleQuestionSent = () => {
    const endpoint = process.env.NEXT_PUBLIC_BASE_URL + "/chatgpt/query";
    setIsLoading(true);
    setError(false);
    fetch(endpoint , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: message }),
    })
    .then((res) => res.json())
    .then((data) => {
      setMessages([...messages, { message, type: "sender" }, { message: data.response, type: "receiver" }]);
      setMessage("");
    })
    .catch((error) => {
      setError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24" onKeyDown={onEnterPress}>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-neutral-100">
          ChatGPT Experience
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-5xl gap-4 mt-16 mb-4">
        { messages.length > 0 && messages.map((message, index) => {
          if (message.type === "sender") {
            return <SenderMessage key={index} message={message.message} />
          } else {
            return <ReceiverMessage key={index} message={message.message} />
          }
        })}
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
      </div>
      <div className="w-full flex justify-center">
        <input type="text" value={message} onChange={handleMessageChange}  placeholder="Ask me anything" className="p-4 border w-11/12 border-gray-300 rounded-lg dark:border-neutral-800 dark:text-gray-700" />
        <button className="p-4 ml-2 bg-gray-100 rounded-lg dark:bg-neutral-800/30" onClick={handleQuestionSent}>{isLoading ? "..." : "Send"}</button>
        <div className="text-red-500 mt-2">{error && "An error occurred"}</div>
      </div>
      <div>
        <p className="m-0 text-sm text-center text-gray-500 dark:text-neutral-500">
          Developed by Cesar Rodriguez, backed by ChatGPT 4.o
        </p>
      </div>
    </main>
  );
}
