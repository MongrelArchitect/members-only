function validateJoin() {
  const setInvalid = (input, message) => {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    const errorMessage = message;
    errorMessage.className = 'text-danger';
  };

  const setSubmit = () => {
    const password = document.querySelector('#password');
    const submit = document.querySelector('#submit');
    if (password.validity.valid) {
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

  const validatePassword = () => {
    const password = document.querySelector('#password');
    const passwordError = document.querySelector('#passwordError');
    password.addEventListener('input', (event) => {
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

  setSubmit();
  validatePassword();
  togglePassword();
}

validateJoin();
