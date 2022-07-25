import throttle from "lodash.throttle";

const STORAGE_KEY = "feedback-form-state";

const inputEl = document.querySelector("input");
const textareaEl = document.querySelector("textarea");
const formEl = document.querySelector(".feedback-form");

let formData = {};

formEl.addEventListener("submit", onFormSend);
formEl.addEventListener("input", throttle(onMessageSave, 500))

populateInput();

function onMessageSave(evt) {
    formData[evt.target.name] = evt.target.value;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));   
}

function onFormSend(evt) {
    evt.preventDefault();
    console.log(formData);
    evt.currentTarget.reset();
   
    localStorage.removeItem(STORAGE_KEY);   
}

function populateInput() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    const parsedSavedMessage = JSON.parse(savedMessage);
    
  if (savedMessage) {
      
      inputEl.value = parsedSavedMessage.email;
      textareaEl.value = parsedSavedMessage.message;
      formData = {email: parsedSavedMessage.email, message: parsedSavedMessage.message}
   }
}
