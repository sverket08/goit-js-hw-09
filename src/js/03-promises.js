import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
const form = document.querySelector('form');


function hendleStartCreatePromise(e) {
  e.preventDefault()

  const firstDelay = Number(e.target.elements.delay.value);
  const stepDelay = Number(e.target.elements.step.value);
  const amount = Number(e.target.elements.amount.value);

  let secondStep = firstDelay;

  for (let num = 1; num <= amount; num += 1) {
    createNewPromise(num, secondStep)
      .then((answer) => Notify.success(answer))
      .catch((answer) => Notify.failure(answer));
    secondStep += stepDelay;
  };
};

function createPromise(num, secondStep) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${num} in ${secondStep}ms`)
  } else {
    reject(`❌ Rejected promise ${num} in ${secondStep}ms`)
  }
  }, secondStep)
})
};

form.addEventListener('submit', hendleStartCreatePromise);