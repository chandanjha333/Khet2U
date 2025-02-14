document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    item.classList.toggle('active');
  });
});

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // Here you would typically handle the form submission
  alert('Thank you for your message. We will get back to you soon!');
  e.target.reset();
});

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