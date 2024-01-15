// Reference to the Random Answers TextArea element on the backend config page 
const randomAnswersTextArea = document.getElementById('userTextarea');

// Reference to the Fixed Answer Input element on the backend config page 
const fixedAnswerInput = document.getElementById('userInput');

//Listeners for buttons clicked on the HTML pages.
document.addEventListener("DOMContentLoaded", function () {
    var updateButton = document.getElementById("updateButton");
    var updateRandom = document.getElementById("updateRandom");
    var clearButton = document.getElementById("clearButton");

    if (updateButton) {
        updateButton.addEventListener("click", updateChatOutput);
    }

    if (updateRandom) {
        updateRandom.addEventListener("click", updateRandomMessages);
    }

    if (clearButton) {
        clearButton.addEventListener("click", clearChatOutput);
    }
});


//Updates the Fixed Answer in firebase.
function updateChatOutput() {
    setMessage("fixed", fixedAnswerInput.value.trim());
}

//Update the Fixec Answer in firebase.
//Also clear the input field.
function clearChatOutput() {
    setMessage("fixed", "");
    fixedAnswerInput.value = '';
}

//Updates the Random Answers in firebase.
function updateRandomMessages(){
    setMessage("random", randomAnswersTextArea.value);
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

// Store data from the backend website into firebase.
function setMessage(type, message) {
    //type = 'fixed' of 'random'
    set(ref(db, 'chat/' + type), {
        message: message
    });
}

function getData(type){
    const ref = ref(db, 'chat/' + type);
    onValue(ref, (snapshot) => {
        const data = snapshot.val();
    })
}

// Reference to the random data in Firebase Realtime Database
const dataRef = ref(db, 'chat/' + "random/message");
// Listen for Random Answer changes in the data in Firebase at /chat/random/message. Update the textarea accordingly. 
onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    // Convert the data in firebase into an array (1 element per line)
    const stringArray = data.split('\n');
    // Update the Random Answer Textarea with the options for each line.
    randomAnswersTextArea.value = stringArray.join('\n') || '';
});

// Reference to the fixed data in Firebase Realtime Database
const fixedDataRef = ref(db, 'chat/' + "fixed/message");
// Listen for Fixed Answer changes in the data in Firebase at /chat/fixed/message. Update the inputfield accordingly. 
onValue(fixedDataRef, (snapshot) => {
    const fdata = snapshot.val();
    // Update the Random Answer Textarea with the options for each line.
    fixedAnswerInput.value = fdata;
});