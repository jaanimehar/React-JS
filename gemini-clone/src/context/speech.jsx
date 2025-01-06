import  useState from "react";
import assets from "./assets"; // Adjust import based on your asset paths

const ChatInput = () => {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Initialize SpeechRecognition
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "en-US"; // Set language
  recognition.interimResults = false; // Wait for final results

  // Start listening function
  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  // Stop listening function
  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  // Handle recognition results
  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");
    setInput((prev) => `${prev} ${transcript}`.trim()); // Append new speech
  };

  // Handle recognition end
  recognition.onend = () => {
    setIsListening(false);
  };

  // Handle recognition errors
  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    setIsListening(false);
  };

  const onSent = () => {
    console.log("Message sent:", input);
    setInput(""); // Clear input field after sending
  };

  return (
    <div>
      <img src={assets.gallery_icon} alt="Gallery Icon" />
      <img
        src={assets.mic_icon}
        alt="Mic Icon"
        onClick={isListening ? stopListening : startListening}
        style={{ cursor: "pointer", color: isListening ? "red" : "black" }}
      />
      {input ? (
        <img
          onClick={onSent}
          src={assets.send_icon}
          alt="Send Icon"
          style={{ cursor: "pointer" }}
        />
      ) : null}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message or use the mic..."
        style={{ marginTop: "10px", width: "100%" }}
      />
    </div>
  );
};

export default ChatInput;
