const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentIndex = 0;
let visibleItems = Array.from(galleryItems); // initial state = all items

// Open lightbox
function showLightbox(src) {
  lightboxImg.src = src;
  lightbox.style.display = 'flex';
}

// Update visible items based on filtering
function updateVisibleItems() {
  visibleItems = Array.from(document.querySelectorAll('.gallery-item'))
    .filter(item => item.style.display !== 'none');
}


// Lightbox open on image click
galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    updateVisibleItems(); // refresh visibleItems on click
    currentIndex = visibleItems.indexOf(item);
    if (currentIndex !== -1) {
      showLightbox(visibleItems[currentIndex].querySelector('img').src);
    }
  });
});

// Lightbox close
lightboxClose.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Lightbox navigation
nextBtn.addEventListener('click', () => {
  if (visibleItems.length > 0) {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    showLightbox(visibleItems[currentIndex].querySelector('img').src);
  }
});

prevBtn.addEventListener('click', () => {
  if (visibleItems.length > 0) {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    showLightbox(visibleItems[currentIndex].querySelector('img').src);
  }
});

// Filtering by category
filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const selectedCategory = btn.getAttribute('data-category');

    galleryItems.forEach((item) => {
      const itemCategory = item.getAttribute('data-category');

      if (selectedCategory === 'all' || itemCategory === selectedCategory) {
        item.style.display = 'block'; // show matching items
      } else {
        item.style.display = 'none'; // hide non-matching items
      }
    });

    // After filtering, update the list of currently visible items
    updateVisibleItems();
  });
});
