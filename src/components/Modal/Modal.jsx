import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

export default class Modal extends Component {
  backdropRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.code !== 'Escape') return;

    this.props.onClose();
  };

  handleBackdropClick = e => {
    const { current } = this.backdropRef;

    if (current && e.target !== current) {
      return;
    }

    this.props.onClose();
  };

  render() {
    const { children } = this.props;
    return (
      <div
        role="presentation"
        className={styles.overlay}
        ref={this.backdropRef}
        onClick={this.handleBackdropClick}
      >
        <div className={styles.modal}>{children}</div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
};
