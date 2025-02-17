'use strict';

const body = document.querySelector('body');
const imgSrc = [
  'https://cdn.freecodecamp.org/curriculum/labs/stonehenge-thumbnail.jpg',
  'https://cdn.freecodecamp.org/curriculum/labs/storm-thumbnail.jpg',
  'https://cdn.freecodecamp.org/curriculum/labs/trees-thumbnail.jpg',
];

function gallerySetup() {
  const galleryContainer = document.createElement('div');

  galleryContainer.classList.add('gallery');
  body.append(galleryContainer);

  imgSrc.forEach(src => {
    const galleryItem = document.createElement('img');

    galleryItem.classList.add('gallery-item');
    galleryItem.setAttribute('src', src);
    galleryContainer.append(galleryItem);
  });
}

function lightboxSetup() {
  const lightboxContainer = document.createElement('div');

  lightboxContainer.classList.add('lightbox');
  lightboxContainer.style.display = 'none';

  const close = document.createElement('span');

  close.id = 'close';
  close.textContent = '×';
  lightboxContainer.append(close);

  const lightboxImg = document.createElement('img');

  lightboxImg.id = 'lightbox-image';
  lightboxContainer.append(lightboxImg);

  body.prepend(lightboxContainer);
}

gallerySetup();
lightboxSetup();

const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const gallery = document.querySelector('.gallery');

function show(img) {
  const thumbnailSrc = img.getAttribute('src');
  const bigImgSrc = thumbnailSrc.replace('-thumbnail', '');

  lightboxImage.setAttribute('src', bigImgSrc);
  lightbox.style.display = 'flex';
  gallery.style.display = 'none';
}

gallery.addEventListener('click', function(e) {
  if (e.target.tagName === 'IMG') {
    show(e.target);
  }
});

lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox || e.target.id === 'close') {
    lightbox.style.display = 'none';
    gallery.style.display = '';
  }
});

const style = document.createElement('style');

style.textContent = `
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .gallery-item {
    width: 100%;
    height: 300px;
    border-radius: 8px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.1s ease, box-shadow 0.1s ease, opacity 0.1s ease;
    object-fit: cover;
    cursor: pointer;
    overflow: hidden;
  }

  .gallery-item:hover {
    transform: scale(1.05);
  }

  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #lightbox-image {
    max-width: 80%;
    max-height: 80%;
    z-index: 2;
  }

  #close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 32px;
    color: white;
    cursor: pointer;
  }
    @media (max-width: 600px) {
  .gallery {
    grid-template-columns: 1fr;
  }
}
`;
document.head.append(style);
