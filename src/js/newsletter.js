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
const addedInfo = document.querySelector('.addedInfo');
const already = document.querySelector('.already');
const submitButton = document.querySelector('.button');

const showModalWindow = () => {
  modal.style.display = 'flex';
};
setTimeout(showModalWindow, 6000);

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

const SUBSCRIBERS_URL = 'http://localhost:8888/subscribers';
const req = new XMLHttpRequest();
const check = [];

req.open('GET', SUBSCRIBERS_URL, true);
req.onload = () => {
  const result = JSON.parse(req.responseText);
  return Array.isArray(result) ? result.map((e) => check.push(e.email)) : [];
};
req.send();

const handleSubmit = (e) => {
  e.preventDefault();
  spinner.classList.add('added');
  radioError.classList.remove('error');
  const data = {
    email: email.value,
    gender: document.querySelector('input[name="gender"]:checked').value,
    'pp-check': checkboxInput.value,
  };

  req.open('POST', SUBSCRIBERS_URL, true);
  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  req.onreadystatechange = () => {
    if (check.includes(email.value)) {
      spinner.classList.remove('added');
      already.classList.add('added');
    } else if (req.readyState === 4 && req.status === 201) {
      already.classList.remove('added');
      spinner.classList.remove('added');
      addedInfo.classList.add('added');
      setTimeout(hideModalWindow, 6000);
    }
  };
  !check.includes(email.value)
    ? req.send(JSON.stringify(data))
    : req.send(null);
};

form.addEventListener('submit', handleSubmit);
