// Main JavaScript for Mukund's Portfolio
    // Sidebar toggle for mobile
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    sidebarToggle && sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking a link
    document.querySelectorAll('#sidebar .sidebar-link').forEach(el => {
      el.addEventListener('click', () => sidebar.classList.remove('active'));
    });

    // Gallery lightbox opener
    function openLightbox(el){
      const src = el.getAttribute('data-src') || el.querySelector('img').src;
      const lb = new bootstrap.Modal(document.getElementById('lightboxModal'));
      document.getElementById('lightboxImage').src = src;
      lb.show();
    }

    // Contact form (localStorage)
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(e){
      e.preventDefault();

      const name = document.getElementById('cname').value.trim();
      const email = document.getElementById('cemail').value.trim();
      const phone = document.getElementById('cphone').value.trim();
      const message = document.getElementById('cmessage').value.trim();

      if(!name || !email || !phone || !message){
        alert('Please fill all fields.');
        return;
      }

      const entry = { name, email, phone, message, date: new Date().toISOString() };
      // read existing list
      const stored = JSON.parse(localStorage.getItem('mukund_contacts') || '[]');
      stored.push(entry);
      localStorage.setItem('mukund_contacts', JSON.stringify(stored));

      // show modal success
      const m = new bootstrap.Modal(document.getElementById('sentModal'));
      document.getElementById('sentText').textContent = `Thanks, ${name}! Your message has been saved locally.`;
      m.show();

      form.reset();
      console.log('Saved contact submission to localStorage:', entry);
    });

    // Optional: expose a quick debug function to view saved submissions in console
    window.viewMukundContacts = function(){
      const saved = JSON.parse(localStorage.getItem('mukund_contacts') || '[]');
      console.table(saved);
      alert('Open console to view saved submissions (or call viewMukundContacts()).');
    };

    // small UX: close sidebar on outside click (mobile)
    document.addEventListener('click', function(e){
      if(!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && sidebar.classList.contains('active')){
        sidebar.classList.remove('active');
      }
    });
 