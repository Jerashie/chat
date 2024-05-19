

const apiKey = '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'; // Replace with your actual API key
const chat = document.getElementById('chat');
const userMessageInput = document.getElementById('user-message');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
userMessageInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const userMessage = userMessageInput.value;

  if (userMessage.trim() === '') {
    return;
  }

  // Display user message in the chat
  displayMessage(userMessage, 'user');

  // Send user message to GPT-3
  fetchGPTResponse(userMessage)
    .then((response) => {
      const gptResponse = response.choices[0].text;
      // Display GPT response in the chat
      displayMessage(gptResponse ,'bot');
    })
    .catch((error) => {
      console.error('Error fetching GPT response:', error);
    });

  // Clear user input field
  userMessageInput.value = '';
}

function fetchGPTResponse(userMessage) {
  const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions'; // Update with the appropriate GPT model and endpoint

  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: userMessage,
      max_tokens: 2000, // Adjust as needed
    }),
  })
    .then(response => response.json());
}

function displayMessage(message, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  messageDiv.textContent = message;
  chat.appendChild(messageDiv);

  // Scroll to the bottom of the chat
  chat.scrollTop = chat.scrollHeight;
}
