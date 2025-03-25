// Your script here.
const msg = new SpeechSynthesisUtterance(); // Create a new speech synthesis instance
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Populate available voices
function populateVoices() {
  voices = window.speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  restartSpeech();
}

function restartSpeech() {
  window.speechSynthesis.cancel(); // Stop any ongoing speech
  window.speechSynthesis.speak(msg); // Start speaking with updated settings
}

function setOption() {
  msg[this.name] = this.value;
  restartSpeech(); // Restart to apply updated settings
}

function startSpeech() {
  if (msg.text.trim() === '') {
    alert('Please enter text to speak.');
    return;
  }
  window.speechSynthesis.cancel(); // Cancel any ongoing speech
  window.speechSynthesis.speak(msg);
}

function stopSpeech() {
  window.speechSynthesis.cancel(); // Stop speech immediately
}

// Load available voices dynamically
window.speechSynthesis.addEventListener('voiceschanged', populateVoices);

// Update settings dynamically
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', startSpeech);
stopButton.addEventListener('click', stopSpeech);

// Initialize default text and settings
msg.text = document.querySelector('[name="text"]').value;
msg.rate = 1;
msg.pitch = 1;

populateVoices(); // Populate voices on page load
