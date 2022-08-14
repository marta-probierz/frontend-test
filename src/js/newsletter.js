const modal = document.getElementById('modal-overlay');
const closeModalButton = document.getElementById('close-modal');
const inputEmail = document.querySelector('.email');
const email = document.querySelector('input[type=email]');
const textError = document.querySelector('.textError');
const checkboxInput = document.getElementById('terms');
const checkError = document.querySelector('.checkError');
const radioInputs = document.getElementsByTagName('input');
const radioError = document.querySelector('.radioError');
const spinner = document.querySelector('.spinner');
const form = document.querySelector('form');
const submitButton = document.querySelector('.button');

const showModalWindow = () => {
  modal.style.display = 'flex';
};
setTimeout(showModalWindow, 1000);

const hideModalWindow = () => {
  modal.style.display = 'none';
};
closeModalButton.addEventListener('click', hideModalWindow);

const validateEmail = (str) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(str).toLowerCase());
};

submitButton.addEventListener('click', () => {
  if (validateEmail(email.value)) {
    textError.classList.remove('error');
    inputEmail.classList.remove('errorInt');
  } else {
    textError.classList.add('error');
    inputEmail.classList.add('errorInt');
  }
  if (!checkboxInput.checked) {
    checkError.classList.add('error');
  } else {
    checkError.classList.remove('error');
  }
  for (let i = 0; i < radioInputs.length; i++) {
    return radioInputs[i].type === 'radio' && radioInputs[i].checked
      ? radioError.classList.remove('error')
      : radioError.classList.add('error');
  }
});

function handleSubmit(event) {
  event.preventDefault();
  spinner.classList.add('added');
  radioError.classList.remove('error');
  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());
  console.log({ value });
}

form.addEventListener('submit', handleSubmit);
