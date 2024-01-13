function sendMessage() {
    var userInput = document.getElementById('user-input');
    var chatLog = document.getElementById('chat-log');

    var userMessage = userInput.value;
    userInput.value = '';

    // Display user message in the chat log
    appendMessage('user', userMessage);

    // Simulate a response from the system (replace with actual API call)
    var systemResponse = getSystemResponse();
    
    // Display system response in the chat log after a short delay
    setTimeout(function() {
        appendMessage('system', systemResponse);
    }, 500);
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
