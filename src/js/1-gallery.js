import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { images } from './image-list.js';

const gallery = document.querySelector('.gallery');

  function galleryElements(images) { 
    return images.map(({ preview, original, description }) =>{ 
      return `
    <li class="gallery-item">
      <a class="gallery-link" href="${original}">
        <img
          class="gallery-image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
    `;
}).join('');
}

  gallery.innerHTML = galleryElements(images);

 const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  })