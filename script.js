// main.js
// Ensure DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navUl = document.querySelector('.nav ul');
  if (mobileToggle && navUl) {
    mobileToggle.addEventListener('click', () => {
      navUl.classList.toggle('open');
    });
  }

  // Scroll-Spy
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (pageYOffset >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link =>
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`)
    );
  });

  // Reveal on Scroll
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealEls.forEach(el => observer.observe(el));

  // Counters Animation
  const counters = document.querySelectorAll('.counter h3');
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / 200;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });

  // Project Filtering
  const filterBtns = document.querySelectorAll('.filter-buttons button');
  const projects = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      projects.forEach(p => {
        p.style.display = (cat === 'all' || p.dataset.category === cat) ? 'block' : 'none';
      });
    });
  });

  // Modal Preview with Project Description
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const viewButtons = document.querySelectorAll('.view-btn');

  const projectDetails = {
    "1": {
      title: "Psychological Support Chatbot",
      description: `
        <ul>
          <li>Developed an AI-powered chatbot that provides emotional and psychological support to individuals who may not have someone to talk to.</li>
          <li>Offers virtual companionship, encourages positive mental health practices, and refers users to professional consultation if needed.</li>
          <li>Created as a college project to address a real-world problem.</li>
        </ul>`,
      techStack: "Python, NLP, TensorFlow, Flask, MongoDB",
      sourceCode: "https://github.com/sankrdeep/mental-health-chatbot"
    },
    "2": {
      title: "Personal Portfolio Website",
      description: `
        <ul>
          <li>Designed and built a personal portfolio showcasing my profile, projects, resume, and contact information.</li>
          <li>Sections include About Me, Projects, Resume, and Contact.</li>
        </ul>`,
      techStack: "HTML, CSS, JavaScript",
      sourceCode: "https://github.com/sandeepkr0209/Portfolio"
    }
  };

  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      const details = projectDetails[id];

      if (details) {
        modalBody.innerHTML = `
          <h3>${details.title}</h3>
          ${details.description}
          <p><strong>Tech Stack:</strong> ${details.techStack}</p>
          <p><strong>Source Code:</strong> <a href="${details.sourceCode}" target="_blank">${details.sourceCode}</a></p>
        `;
      } else {
        modalBody.innerHTML = `<p>Details not found for project ${id}.</p>`;
      }

      modal.style.display = 'flex';
    });
  });

  // Close Modal
  const modalClose = document.getElementById('modal-close');
  if (modalClose) {
    modalClose.addEventListener('click', () => { modal.style.display = 'none'; });
  }
  window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

  // Testimonials Slider Drag
  const slider = document.querySelector('.testimonials-slider');
  if (slider) {
    let isDown = false, startX, scrollLeft;
    slider.addEventListener('mousedown', (e) => {
      isDown = true; startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => isDown = false);
    slider.addEventListener('mouseup', () => isDown = false);
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  }

  // Magnet Effect
  document.querySelectorAll('.magnet').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
});
