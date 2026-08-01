/* ==========================================================================
   DECORT MELAMINE (DM PERÚ) - INTERACTIVIDAD JS (VANILLA JS)
   Funcionalidades: Filtro de Catálogo, WhatsApp Inteligente, Modal y Menú Móvil
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCategoryFilters();
  initSmartWhatsAppLinks();
  initImageModal();
  initHeaderScroll();
});

/* --------------------------------------------------------------------------
   1. MENÚ HAMBURGUESA RESPONSIVO PARA DISPOSITIVOS MÓVILES
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Cerrar el menú al hacer clic en cualquier enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   2. FILTRO DINÁMICO POR CATEGORÍAS (Cocinas, Dormitorios, Salas, Oficinas)
   -------------------------------------------------------------------------- */
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  if (!filterBtns.length || !galleryCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Cambiar clase activa en los botones
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. BOTONES DE WHATSAPP INTELIGENTES CON MENSAJE PRE-ARMADO
   -------------------------------------------------------------------------- */
function initSmartWhatsAppLinks() {
  const whatsappNumber = '51953207392';
  const whatsappBtns = document.querySelectorAll('[data-whatsapp-product]');

  whatsappBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productName = btn.getAttribute('data-whatsapp-product') || 'un mueble a medida';
      const customMessage = `Hola Decort Melamine! Estaba viendo su web y deseo cotizar un *${productName}* a medida para mi espacio en Lima/Ate.`;
      
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(customMessage)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  });
}

/* --------------------------------------------------------------------------
   4. MODAL / VISTA PREVIA DE IMÁGENES AL HACER CLIC EN EL CATÁLOGO
   -------------------------------------------------------------------------- */
function initImageModal() {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTag = document.getElementById('modal-tag');
  const modalWhatsappBtn = document.getElementById('modal-whatsapp-btn');
  const modalClose = document.querySelector('.modal-close');

  if (!modal) return;

  const galleryImages = document.querySelectorAll('.gallery-card .gallery-image-wrapper');

  galleryImages.forEach(wrapper => {
    wrapper.style.cursor = 'pointer';
    wrapper.addEventListener('click', () => {
      const card = wrapper.closest('.gallery-card');
      const img = wrapper.querySelector('img');
      const title = card.querySelector('h3') ? card.querySelector('h3').textContent : 'Mueble a Medida';
      const desc = card.querySelector('p') ? card.querySelector('p').textContent : '';
      const tag = card.querySelector('.tag') ? card.querySelector('.tag').textContent : 'DM Perú';

      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalTag.textContent = tag;

      // Configurar enlace de WhatsApp personalizado para la foto del modal
      const customMessage = `Hola Decort Melamine! Me interesó el mueble *${title}* de su catálogo. Deseo cotizarlo para mi espacio.`;
      modalWhatsappBtn.href = `https://wa.me/51953207392?text=${encodeURIComponent(customMessage)}`;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
    });
  });

  // Cerrar modal al hacer clic en el botón X o fuera del contenido
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/* --------------------------------------------------------------------------
   5. EFECTO DE NAVEGACIÓN AL HACER SCROLL (HEADER COMPACTO)
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}
