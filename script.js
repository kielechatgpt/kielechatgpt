
//Listeners for buttons clicked on the HTML pages.
document.addEventListener("DOMContentLoaded", function () {
    var sendButton = document.getElementById("sendButton");

    if (sendButton) {
        sendButton.addEventListener("click", sendMessage);
    }
});

// Add an event listener for the Enter key
document.getElementById('user-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
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

    // Add confetti effect
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
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
    /*
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
    */

    // Simulate a system response (replace with actual API call)
    var responses = [
        "Wa denkte zelf? Zoek het uit!",
        "Vraog oe moeder maar ffkes.",
        "Ja, wit ik veul. Di is pas dun eerste versie van deze Eey Aai chatbot. Probeer ut later nog mar effekes.",
        "'T ken me eigenluk niks schelen.",
        "Kheb g' woon gin idee!",
        "Ben ff pissen, en da kan wel effekes duren want: er is maar 1 wc en we moeten met z'n 2.",
        "Wat zitte te mouwen, ga 's bier halen",
        "Wa? Ik ben alaaf gehaakt!",
        "Een antwoord? Kende gij rekenen? Reken d'r dan maor nie op!",
        "Voor een kusje zeg ik ut!",
        "Ga eerst maor ens bier haluh voor munne maten!",
        "Doar laot ik me nie over uit. Maar ik zeg maar zo: beter schuin d’r in dan recht d’r neffe!",
        "Ons moeder zeej nog, doe da nou nie!",
        "Ja hoe’ist, staot er een paard in de gang ofzo!",
        "Kek maor uit, want Mien heej ur feestmuts op!",
        "Alleen ‘s-nachts na tweejuh..want die Brabantse zijn al zo lang!",
        "Ho ffkes, nou eerst al die hendjes de lucht in!",
        "Gin idee, ben ffekes de confetti ut m'n bier aan ut halen!"
    ];
    //responses = random;

    var randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}


/*

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

*/