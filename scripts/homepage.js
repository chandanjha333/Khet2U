function scrollCards(direction) {
  const container = document.querySelector('.card-container');
  const scrollAmount = 320; // card width + gap
  
  if (direction === 'left') {
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  } else {
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
}

const header = document.querySelector('.header');
  
// Function to update header style on scroll
function updateHeader() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Add scroll event listener
window.addEventListener('scroll', updateHeader);

// Initial check (in case page is refreshed while scrolled)
updateHeader();

document.querySelector('.login-button-js').onclick = () => {
  window.location.href = 'login-page.html'
}

document.querySelector('.signup-button-js').onclick = () => {
  window.location.href = 'signup.html'
}