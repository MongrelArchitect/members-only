function validateSignup() {
  const setInvalid = (input, message) => {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    const errorMessage = message;
    errorMessage.className = 'text-danger';
  };

  const setPasswordRequirements = (password) => {
    const minimumChar = document.querySelector('#minimumChar');
    const uppercase = document.querySelector('#uppercase');
    const lowercase = document.querySelector('#lowercase');
    const number = document.querySelector('#number');
    const symbol = document.querySelector('#symbol');

    if (password.length >= 8) {
      minimumChar.className = 'text-success';
      minimumChar.setAttribute('style', 'list-style-type:disc;');
    } else {
      minimumChar.className = 'text-danger';
      minimumChar.setAttribute('style', 'list-style-type:circle;');
    }

    if (password.match(/[A-Z]/)) {
      uppercase.className = 'text-success';
      uppercase.setAttribute('style', 'list-style-type:disc;');
    } else {
      uppercase.className = 'text-danger';
      uppercase.setAttribute('style', 'list-style-type:circle;');
    }

    if (password.match(/[a-z]/)) {
      lowercase.className = 'text-success';
      lowercase.setAttribute('style', 'list-style-type:disc;');
    } else {
      lowercase.className = 'text-danger';
      lowercase.setAttribute('style', 'list-style-type:circle;');
    }

    if (password.match(/\d/)) {
      number.className = 'text-success';
      number.setAttribute('style', 'list-style-type:disc;');
    } else {
      number.className = 'text-danger';
      number.setAttribute('style', 'list-style-type:circle;');
    }

    if (password.match(/[^a-zA-Z0-9]/)) {
      symbol.className = 'text-success';
      symbol.setAttribute('style', 'list-style-type:disc;');
    } else {
      symbol.className = 'text-danger';
      symbol.setAttribute('style', 'list-style-type:circle;');
    }
  };

  const setSubmit = () => {
    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const passwordConfirm = document.querySelector('#passwordConfirm');
    const submit = document.querySelector('#submit');
    if (
      firstName.validity.valid
      && lastName.validity.valid
      && email.validity.valid
      && password.validity.valid
      && passwordConfirm.validity.valid
    ) {
      submit.classList.remove('btn-secondary');
      submit.classList.add('btn-primary');
    } else {
      submit.classList.remove('btn-primary');
      submit.classList.add('btn-secondary');
    }
  };

  const setValid = (input, message) => {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    const errorMessage = message;
    errorMessage.textContent = '';
    errorMessage.className = 'text-success';
  };

  const validateFirstName = () => {
    const firstName = document.querySelector('#firstName');
    const firstNameError = document.querySelector('#firstNameError');
    firstName.addEventListener('input', (event) => {
      setSubmit();
      const { valid } = event.target.validity;
      if (valid) {
        setValid(firstName, firstNameError);
      } else {
        setInvalid(firstName, firstNameError);
        if (!firstName.value.length) {
          firstNameError.textContent = 'First name required';
        } else {
          firstNameError.textContent = '255 characters maximum';
        }
      }
    });
  };

  const validateLastName = () => {
    const lastName = document.querySelector('#lastName');
    const lastNameError = document.querySelector('#lastNameError');
    lastName.addEventListener('input', (event) => {
      setSubmit();
      const { valid } = event.target.validity;
      if (valid) {
        setValid(lastName, lastNameError);
      } else {
        setInvalid(lastName, lastNameError);
        if (!lastName.value.length) {
          lastNameError.textContent = 'Last name required';
        } else {
          lastNameError.textContent = '255 characters maximum';
        }
      }
    });
  };

  const validateEmail = () => {
    const email = document.querySelector('#email');
    const emailError = document.querySelector('#emailError');
    email.addEventListener('input', (event) => {
      setSubmit();
      const { valid } = event.target.validity;
      if (valid) {
        setValid(email, emailError);
      } else {
        setInvalid(email, emailError);
        if (!email.value.length) {
          emailError.textContent = 'Please enter email';
        } else if (email.value.length > 254) {
          emailError.textContent = '254 characters maximum';
        } else {
          emailError.textContent = 'Invalid email address';
        }
      }
    });
  };

  const validatePassword = () => {
    const password = document.querySelector('#password');
    const passwordError = document.querySelector('#passwordError');
    password.addEventListener('input', (event) => {
      setSubmit();

      // this will affect the validation of the "confirm password" field
      const passwordConfirm = document.querySelector('#passwordConfirm');
      const confirmError = document.querySelector('#passwordConfirmError');
      if (
        event.target.value.length
        && event.target.value === passwordConfirm.value
      ) {
        passwordConfirm.setCustomValidity('');
        passwordConfirm.classList.remove('is-valid');
        setValid(passwordConfirm, confirmError);
        confirmError.textContent = '';
      } else if (passwordConfirm.value.length) {
        passwordConfirm.setCustomValidity('Passwords do not match');
        setInvalid(passwordConfirm, confirmError);
        confirmError.textContent = 'Passwords do not match';
      } else {
        passwordConfirm.classList.remove('is-valid');
      }

      setPasswordRequirements(event.target.value);
      const { valid } = event.target.validity;
      if (valid) {
        setValid(password, passwordError);
      } else {
        setInvalid(password, passwordError);
        if (!password.value.length) {
          passwordError.textContent = 'Password required';
        } else {
          passwordError.textContent = 'Password does not meet requirements';
        }
      }
    });
  };

  const validatePasswordConfirm = () => {
    const passwordConfirm = document.querySelector('#passwordConfirm');
    const passwordConfirmError = document.querySelector(
      '#passwordConfirmError',
    );
    passwordConfirm.addEventListener('input', (event) => {
      const password = document.querySelector('#password');
      if (event.target.value === password.value) {
        event.target.setCustomValidity('');
      } else {
        event.target.setCustomValidity('Passwords do not match');
      }

      setSubmit();

      const { valid } = event.target.validity;
      if (valid) {
        setValid(passwordConfirm, passwordConfirmError);
      } else {
        setInvalid(passwordConfirm, passwordConfirmError);
        if (!passwordConfirm.value.length) {
          passwordConfirmError.textContent = 'Confirmation required';
        } else {
          passwordConfirmError.textContent = 'Passwords do not match';
        }
      }
    });
  };

  setSubmit();
  validateFirstName();
  validateLastName();
  validateEmail();
  validatePassword();
  validatePasswordConfirm();
}

validateSignup();
