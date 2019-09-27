import React from 'react';
import PropTypes from 'prop-types';
import styles from './photoCard.module.css';

const PhotoCard = ({
  webformatURL,
  likes,
  views,
  comments,
  downloads,
  onOpenModal,
}) => (
  <div className={styles.photoCard}>
    <img className={styles.img} src={`${webformatURL}`} alt="" />

    <div className={styles.stats}>
      <p className={styles.statsItem}>
        <i className="material-icons">thumb_up</i>
        {likes}
      </p>
      <p className={styles.statsItem}>
        <i className="material-icons">visibility</i>
        {views}
      </p>
      <p className={styles.statsItem}>
        <i className="material-icons">comment</i>
        {comments}
      </p>
      <p className={styles.statsItem}>
        <i className="material-icons">cloud_download</i>
        {downloads}
      </p>
    </div>

    <button
      onClick={onOpenModal}
      type="button"
      className={styles.fullscreenButton}
    >
      <i className="material-icons">zoom_out_map</i>
    </button>
  </div>
);

PhotoCard.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  views: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  downloads: PropTypes.number.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default PhotoCard;
