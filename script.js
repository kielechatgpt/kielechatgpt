function sendMessage() {
    var userInput = document.getElementById('user-input');
    var chatLog = document.getElementById('chat-log');

    var userMessage = userInput.value;
    userInput.value = '';

    // Display user message in the chat log
    appendMessage('user', userMessage);

    // Simulate a response from the system (replace with actual API call)
    var systemResponse = getSystemResponse();
    
    // Display system response with typing effect
    simulateTyping('system', systemResponse);
}

function simulateTyping(sender, message) {
    var chatLog = document.getElementById('chat-log');
    var messageContainer = document.createElement('div');
    messageContainer.className = sender;
    chatLog.appendChild(messageContainer);

    var index = 0;

    function type() {
        messageContainer.textContent += message[index];
        index++;

        if (index < message.length) {
            setTimeout(type, Math.floor(Math.random() * 100) + 50); // Adjust typing speed here
        } else {
            // Scroll to the bottom of the chat log after typing is complete
            chatLog.scrollTop = chatLog.scrollHeight;
        }
    }

    type();
}

function appendMessage(sender, message) {
    var chatLog = document.getElementById('chat-log');
    var messageContainer = document.createElement('div');
    messageContainer.className = sender;
    messageContainer.textContent = message;
    chatLog.appendChild(messageContainer);

    // Scroll to the bottom of the chat log
    chatLog.scrollTop = chatLog.scrollHeight;
}

function getSystemResponse() {
    // Simulate a system response (replace with actual API call)
    var responses = [
        "Wa denkte zelf? Zoek het ff zelf uit!",
        "Vraog oe moeder maar ff.",
        "Ja, wit ik veul.",
        "Het ken mij eigenlijk niks schelen.",
        "Geen idee!"
    ];

    var randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}
