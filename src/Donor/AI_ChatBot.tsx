import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './ChatBotUI.css';// Make sure to create this CSS file


//const genAIKey = process.env.GENAIKEY + '';// Access your API key
const genAIKey2 = import.meta.env.VITE_GENAIKEY + '';
const genAI = new GoogleGenerativeAI(genAIKey2);

const ChatBotUI = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(genAIKey2);
        const processedInput = input.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        setMessages([...messages, { sender: 'user', text: processedInput }]);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(processedInput);
        const generatedResponse = await result.response;
        const text = generatedResponse.text();
        // Also process the bot's response
        const processedText = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        setMessages([...messages, { sender: 'user', text: input }, { sender: 'bot', text }]);
        setInput('');
    };

    return (
        <div className="chat-container">
            <h1>Generative AI Chatbot</h1>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-bubble ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="input-form">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Enter your message..."
                    className="input-box"
                />
                <input type="submit" value="Send" className="submit-button" />
            </form>
        </div>
    );
};

export default ChatBotUI;
