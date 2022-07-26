import throttle from "lodash.throttle";

const STORAGE_KEY = "feedback-form-state";

const formEl = document.querySelector(".feedback-form");
populateInput();

formEl.addEventListener("submit", onFormSend);
formEl.addEventListener("input", throttle(onMessageSave, 500))

function onFormSend(evt) {
    evt.preventDefault();
    const formData = new FormData(formEl);
    formData.forEach((value, name) => 
        console.log(value, name)
    )
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);   
    
}

function onMessageSave(evt) {
    let persistedFilters = localStorage.getItem(STORAGE_KEY);
    persistedFilters = persistedFilters ? JSON.parse(persistedFilters) : {};
    persistedFilters[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedFilters));   
}

function populateInput() {
    let persistedFilters = localStorage.getItem(STORAGE_KEY); 
  if (persistedFilters) {
      persistedFilters = JSON.parse(persistedFilters);
      Object.entries(persistedFilters).forEach(([name, value]) => {
          formEl.elements[name].value = value;
      })
   }
}
