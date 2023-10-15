const btn = document.querySelector('.btn-submit')

const day =  document.getElementById('day')
const month =  document.getElementById('month')
const year =  document.getElementById('year')

const dayResult = document.getElementById('day-result')
const monthResult = document.getElementById('month-result')
const yearResult = document.getElementById('year-result')

const allErrors = document.querySelectorAll('.error')
const allLabel = document.querySelectorAll('.label')
const allInput = document.querySelectorAll('.input')


btn.addEventListener('click', calculateAge);

day.addEventListener('input', () => {
  if (day.value.length > 2) {
    day.value = day.value.slice(0, 2);
  }
});

month.addEventListener('input', () => {
  if (month.value.length > 2) {
    month.value = month.value.slice(0, 2);
  }
});

year.addEventListener('input', () => {
  if (year.value.length > 4) {
    year.value = year.value.slice(0, 4);
  }
});

function displayError(inputElement, errorElement, labelElement, errorMessage) {
  errorElement.textContent = errorMessage;
  errorElement.classList.add('invalid');
  labelElement.classList.add('invalid');
  inputElement.classList.add('invalid');
}

function removeErrors() {
  allErrors.forEach(errorElement => {
    errorElement.textContent = '';
    errorElement.classList.remove('invalid');
  });

  allLabel.forEach(labelElement => {
    labelElement.classList.remove('invalid');
  });

  allInput.forEach(inputElement => {
    inputElement.classList.remove('invalid');
  });
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function calculateAge(e) {

  e.preventDefault();

  removeErrors();

  const dayValue = parseInt(day.value);
  const monthValue = parseInt(month.value);
  const yearValue = parseInt(year.value);

  const thirtyDayMonths = [4, 6, 9, 11];
  let isValid = true;

  if (!day.value) {
    displayError(day, allErrors[0], allLabel[0], 'This field is required');
    isValid = false;
  } else if (isNaN(dayValue) || dayValue < 1 || dayValue > 31) {
    displayError(day, allErrors[0], allLabel[0], 'Must be a valid day');
    isValid = false;
  } else if ((thirtyDayMonths.includes(monthValue) && dayValue > 30) || (monthValue === 2 && (dayValue > 29 || (dayValue > 28 && !isLeapYear(yearValue))))){
    displayError(day, allErrors[0], allLabel[0], 'Must be a valid date');
    displayError(month, allErrors[1], allLabel[1]);
    displayError(year, allErrors[2], allLabel[2]);
    isValid = false;
  }

  if (!month.value) {
    displayError(month, allErrors[1], allLabel[1], 'This field is required');
    isValid = false;
  } else if (isNaN(monthValue) || monthValue < 1 || monthValue > 12) {
    displayError(month, allErrors[1], allLabel[1], 'Must be a valid month');
    isValid = false;
  }

  if (!year.value) {
    displayError(year, allErrors[2], allLabel[2], 'This field is required');
    isValid = false;
  } else if (isNaN(yearValue) || yearValue < 1000) {
    displayError(year, allErrors[2], allLabel[2], 'Must be a valid year');
    isValid = false;
  } else if (yearValue > new Date().getFullYear()) {
    displayError(year, allErrors[2], allLabel[2], 'Must be in the past');
    isValid = false;
  } else if (yearValue === new Date().getFullYear() && monthValue > new Date().getMonth() + 1) {
    displayError(day, allErrors[0], allLabel[0], 'Must be in the past');
    displayError(month, allErrors[1], allLabel[1]);
    displayError(year, allErrors[2], allLabel[2]);
    isValid = false;
  } else if (yearValue === new Date().getFullYear() && monthValue === new Date().getMonth() + 1 && dayValue > new Date().getDate()) {
    displayError(day, allErrors[0], allLabel[0], 'Must be in the past');
    displayError(month, allErrors[1], allLabel[1]);
    displayError(year, allErrors[2], allLabel[2]);
    isValid = false;
  }


  if (isValid) {

    const birthDate = new Date(yearValue, monthValue - 1, dayValue);

    const ageInMilliseconds = new Date() - birthDate;

    const ageDate = new Date(ageInMilliseconds);
    const ageYears = ageDate.getUTCFullYear() - 1970;
    const ageMonths = ageDate.getUTCMonth();
    const ageDays = ageDate.getUTCDate() - 1; 

    // yearResult.textContent = ageYears;
    // monthResult.textContent = ageMonths;
    // dayResult.textContent = ageDays;

    /**** Animation ****/

    function animateValue(startValue, endValue, duration, element) {
      let startTime;
    
      function updateValue() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
    
        if (elapsedTime < duration) {
          const progress = (elapsedTime / duration);
          const value = Math.round(startValue + progress * (endValue - startValue));
          element.textContent = value;
          requestAnimationFrame(updateValue);
        } else {
          element.textContent = endValue;
        }
      }
    
      startTime = Date.now();
      requestAnimationFrame(updateValue);
    }
    
    const animationDuration = 1000;
    animateValue(0, ageYears, animationDuration, yearResult);
    animateValue(0, ageMonths, animationDuration, monthResult);
    animateValue(0, ageDays, animationDuration, dayResult);

  }
}









