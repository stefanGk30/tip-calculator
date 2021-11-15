const form = document.querySelector('form');
const btns = document.querySelectorAll('.perc-btn');
const billInput = document.querySelector('#bill-amount');
const customPercInput = document.querySelector('#custom-perc');
const peopleInput = document.querySelector('#people-amount');
const warningText = document.querySelector('.warning-text');
//
const tipAmount = document.querySelector('.tip-amount');
const billTotal = document.querySelector('.bill-total');
const totalPerson = document.querySelector('.total-person');
const tipPerson = document.querySelector('.tip-person');
const resetBtn = document.querySelector('.reset-btn');

let tipPercentage = 0;

//
btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    btns.forEach((btn) => btn.classList.remove('active'));
    customPercInput.value = null;
    tipPercentage = parseInt(btn.value.slice(0, -1));
    btn.classList.add('active');
  });
});

//
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const billAmount = parseFloat(billInput.value);
  const peopleAmount = parseInt(peopleInput.value);
  if (peopleAmount === 0) {
    warningText.classList.remove('warning');
    peopleInput.classList.add('warning-input');
    setTimeout(() => {
      warningText.classList.add('warning');
      peopleInput.classList.remove('warning-input');
    }, 2000);
    return;
  }
  const customPerc = parseInt(customPercInput.value);
  tipPercentage = customPerc || tipPercentage;

  if (!isNaN(billAmount) && !isNaN(peopleAmount) && tipPercentage >= 0) {
    calcTipAmount(billAmount, tipPercentage, peopleAmount);
    tipPercentage = 0;
    btns.forEach((btn) => btn.classList.remove('active'));
    peopleInput.blur();
    form.reset();
  }
});

resetBtn.addEventListener('click', resetAll);

billInput.addEventListener('keyup', () => {
  check(billInput);
});
peopleInput.addEventListener('keyup', () => {
  check(peopleInput);
});

//====================================================================

function calcTipAmount(amount, percentage, people) {
  const tip = parseFloat(((amount / 100) * percentage).toFixed(2));
  const totalAmount = parseFloat((amount + tip).toFixed(2));
  const personAmount = parseFloat((totalAmount / people).toFixed(2));
  //
  tipAmount.textContent = `$${tip}`;
  totalPerson.textContent = `$${personAmount}`;
  tipPerson.textContent = `$${tip / people}`;
  tipPerson.textContent = `$${parseFloat((tip / people).toFixed(2))}`;
  billTotal.textContent = `$${amount}`;
}

function resetAll() {
  tipPercentage = 0;
  btns.forEach((btn) => btn.classList.remove('active'));
  form.reset();
  tipAmount.textContent = '$0.00';
  totalPerson.textContent = '$0.00';
  tipPerson.textContent = '$0.00';
}

function check(input) {
  const value = input.value;
  const pattern = /[0-9.]$/;
  let check = pattern.test(value);
  if (!check && value) {
    input.classList.add('warning-input');
  } else {
    input.classList.remove('warning-input');
  }
}
