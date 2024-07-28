const formData = {
  email: " ", 
  message: " " 
};

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageTextarea = form.elements.message;

function saveToLocalStorage() {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};


function loadFromLocalStorage() {
  const storedData = localStorage.getItem('feedback-form-state');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    formData.email = parsedData.email || "";
    formData.message = parsedData.message || "";
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
};

form.addEventListener('input', (event) => {
  const { name, value } = event.target;
  formData[name] = value.trim(); 
  saveToLocalStorage();
});

document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  
  console.log(formData);
  
  localStorage.removeItem('feedback-form-state');
  formData.email = "";
  formData.message = "";
  form.reset();
});



