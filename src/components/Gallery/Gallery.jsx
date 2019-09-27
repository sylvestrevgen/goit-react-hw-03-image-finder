import React from 'react';
import PropTypes from 'prop-types';
import styles from './gallery.module.css';
import PhotoCard from '../PhotoCard/PhotoCard';

const Gallery = ({ images, onOpenModal }) => {
  return (
    <ul className={styles.gallery}>
      {images.map(img => (
        <li key={img.id}>
          <PhotoCard
            webformatURL={img.webformatURL}
            largeImageURL={img.largeImageURL}
            likes={img.likes}
            views={img.views}
            comments={img.comments}
            downloads={img.downloads}
            onOpenModal={() => onOpenModal(img.id)}
          />
        </li>
      ))}
    </ul>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default Gallery;
