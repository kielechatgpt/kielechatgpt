
//Listeners for buttons clicked on the HTML pages.
document.addEventListener("DOMContentLoaded", function () {
    var sendButton = document.getElementById("sendButton");

    if (sendButton) {
        sendButton.addEventListener("click", sendMessage);
    }
});


//Function to send output to the chat interace on the KieleChatGPT page
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

//Helper function to simulate as if the answer was 'live generated'.
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

//Helper function to append to the chat output of this session.
function appendMessage(sender, message) {
    var chatLog = document.getElementById('chat-log');
    var messageContainer = document.createElement('div');
    messageContainer.className = sender;
    messageContainer.textContent = "Wa gij zei: " + message;
    chatLog.appendChild(messageContainer);

    // Scroll to the bottom of the chat log
    chatLog.scrollTop = chatLog.scrollHeight;
}

function getSystemResponse() {
    // Simulate a system response (replace with actual API call)
    var responses;
    if(fixedSet){
        responses = fixed;
    }
    else{
        responses = random;
    }
    console.log('Random: ' + random);
    console.log('fixed: ' + fixed);
    console.log('fixedSet ' + fixedSet);

    // var responses = [
    //     "Wa denkte zelf? Zoek het ff zelf uit!",
    //     "Vraog oe moeder maar ff.",
    //     "Ja, wit ik veul.",
    //     "Het ken mij eigenlijk niks schelen.",
    //     "Geen idee!"
    // ];
    // responses = random;

    var randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}



import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, onValue, ref, set} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyBRZvz3wQDePA2-NMXsU0gNqGpA2qNtVd0",
    authDomain: "kielechatgpt.firebaseapp.com",
    projectId: "kielechatgpt",
    storageBucket: "kielechatgpt.appspot.com",      
    messagingSenderId: "1059150846305",
    appId: "1:1059150846305:web:9f8185a96f834da32c0d20",
    databaseURL: "https://kielechatgpt-default-rtdb.europe-west1.firebasedatabase.app",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

// Reference to the data in Firebase Realtime Database
// Listen for Random Answer changes in the data in Firebase at /chat/random/<here>.
let random = '';
let fixed = '';
let fixedSet = false; 

const randomRef = ref(db, 'chat/' + "random/message");
onValue(randomRef, (snapshot) => {
    const randomData = snapshot.val();
    const randomArray = randomData.split('\n');
    // Convert the data in firebase into an array (1 element per line)
    random = randomArray;

    // Update the Random Answer Textarea with the options for each line.
    //randomAnswersTextArea.value = stringArray.join('\n') || '';
});

const fixedRef = ref(db, 'chat/' + "fixed/message");
onValue(fixedRef, (snapshot) => {
    const fixedData = snapshot.val();
    if(fixedData.trim().length > 0){
        fixedSet = true;
    }
    else{
        fixedSet = false;
    }
    // Convert the fixed value in firebase into an array (with only 1 element).
    fixed = fixedData.split();
});