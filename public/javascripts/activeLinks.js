function setActiveLink() {
  const path = window.location.pathname;
  const link = document.querySelector(`a[href="${path}"]`);
  link.classList.add('active');
}

setActiveLink();
