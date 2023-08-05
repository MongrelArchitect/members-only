function validateLogin() {
  const setInvalid = (input, message) => {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    const errorMessage = message;
    errorMessage.className = 'text-danger';
  };

  const setSubmit = () => {
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const submit = document.querySelector('#submit');
    if (email.validity.valid && password.validity.valid) {
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

  const togglePassword = () => {
    const toggle = document.querySelector('#togglePassword');
    toggle.addEventListener('click', () => {
      const password = document.querySelector('#password');
      const image = document.querySelector('#toggleImage');
      const text = document.querySelector('#toggleText');
      if (password.type === 'password') {
        password.type = 'text';
        image.setAttribute('src', '/images/eye-slash.svg');
        text.textContent = 'Hide password';
      } else {
        password.type = 'password';
        image.setAttribute('src', '/images/eye.svg');
        text.textContent = 'Show password';
      }
    });
  };

  const validateEmail = () => {
    const authError = document.querySelector('#authError');
    const email = document.querySelector('#email');
    const emailError = document.querySelector('#emailError');
    email.addEventListener('input', (event) => {
      authError.textContent = '';
      setSubmit();
      const { valid } = event.target.validity;
      if (valid) {
        setValid(email, emailError);
      } else {
        setInvalid(email, emailError);
        if (!email.value.length) {
          emailError.textContent = 'Please enter email';
        } else {
          emailError.textContent = 'Invalid email address';
        }
      }
    });
  };

  const validatePassword = () => {
    const authError = document.querySelector('#authError');
    const password = document.querySelector('#password');
    const passwordError = document.querySelector('#passwordError');
    password.addEventListener('input', (event) => {
      authError.textContent = '';
      setSubmit();
      const { valid } = event.target.validity;
      if (valid) {
        setValid(password, passwordError);
      } else {
        setInvalid(password, passwordError);
        passwordError.textContent = 'Password required';
      }
    });
  };

  togglePassword();
  validateEmail();
  validatePassword();
  setSubmit();
}

validateLogin();
