// Select the mic icon and transcription display area
const micIcon = document.querySelector('.mic-icon');
const transcriptionDiv = document.querySelector('.transcription');

// Initialize SpeechRecognition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Set recognition properties
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.continuous = false;

// Event listener for mic icon click
micIcon.addEventListener('click', () => {
  if (micIcon.classList.contains('active')) {
    stopListening();
  } else {
    startListening();
  }
});

// Start listening function
function startListening() {
  micIcon.classList.add('active');
  transcriptionDiv.textContent = "Listening...";
  recognition.start();
}

// Stop listening function
function stopListening() {
  micIcon.classList.remove('active');
  transcriptionDiv.textContent = "Stopped listening.";
  recognition.stop();
}

// Process speech results
recognition.addEventListener('result', (event) => {
  const transcript = Array.from(event.results)
    .map(result => result[0].transcript)
    .join('');
  transcriptionDiv.textContent = `You said: "${transcript}"`;
});

// Handle recognition errors
recognition.addEventListener('error', (event) => {
  transcriptionDiv.textContent = `Error: ${event.error}`;
  micIcon.classList.remove('active');
});

// Handle end of recognition
recognition.addEventListener('end', () => {
  micIcon.classList.remove('active');
});
