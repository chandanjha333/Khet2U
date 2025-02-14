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