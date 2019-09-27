import React, { Component } from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './app.module.css';
import SearchForm from '../SearchForm/SearchForm';
import Gallery from '../Gallery/Gallery';
import Modal from '../Modal/Modal';
import * as imagesAPI from '../../services/images-api';

const LoadButton = styled.button`
  padding: 8px 16px;
  border-radius: 3px;
  background-color: #3884ff;
  transition: all 200ms ease;
  text-align: center;
  display: inline-block;
  color: #fff;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
  min-width: 180px;
  margin-left: auto;
  margin-right: auto;

  &:hover,
  &:focus {
    background-color: #1f65d6;
  }
`;

const ErrorText = styled.p`
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  color: #474545;
`;

export default class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isModalOpen: false,
    checkedImageId: null,
    isLoading: false,
    isError: false,
  };

  componentDidMount() {
    const { currentPage, searchQuery } = this.state;
    this.showLoader();
    imagesAPI
      .getImages(currentPage, searchQuery)
      .then(data => {
        this.setState({
          images: [...data.hits],
        });
      })
      .catch(() => {
        this.setState({
          isError: true,
        });
      })
      .finally(() => {
        this.hideLoader();
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.showLoader();
      imagesAPI
        .getImages(currentPage, searchQuery)
        .then(data => {
          this.setState({
            images: [...data.hits],
          });
        })
        .catch(() => {
          this.setState({
            isError: true,
          });
        })
        .finally(() => {
          this.hideLoader();
        });
    }

    if (
      prevState.currentPage !== currentPage &&
      prevState.currentPage < currentPage
    ) {
      imagesAPI
        .getImages(currentPage, searchQuery)
        .then(data => {
          this.setState(state => ({
            images: [...state.images, ...data.hits],
          }));
        })
        .finally(() => {
          window.scrollBy({ top: 550, behavior: 'smooth' });
        });
    }
  }

  showLoader = () => {
    this.setState({
      isLoading: true,
    });
  };

  hideLoader = () => {
    this.setState({
      isLoading: false,
    });
  };

  handleSearchSubmit = query => {
    this.setState({
      currentPage: 1,
      searchQuery: query,
    });
  };

  handleLoadMore = () => {
    this.setState(state => ({
      currentPage: state.currentPage + 1,
    }));
  };

  handleOpenModal = id => {
    this.setState({
      checkedImageId: id,
      isModalOpen: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const loaderStyles = { margin: 'auto' };
    const {
      images,
      isModalOpen,
      checkedImageId,
      isLoading,
      isError,
    } = this.state;
    const checkedImage = images.find(image => image.id === checkedImageId);

    return (
      <div className={styles.app}>
        <SearchForm onSearchSubmit={this.handleSearchSubmit} />
        {isError && (
          <ErrorText>Something went wrong! Please try later!</ErrorText>
        )}
        {isLoading ? (
          <Loader
            type="Oval"
            color="#00BFFF"
            height={100}
            width={100}
            style={loaderStyles}
          />
        ) : (
          <>
            <Gallery images={images} onOpenModal={this.handleOpenModal} />
            <LoadButton onClick={this.handleLoadMore}>Load more</LoadButton>
            {isModalOpen && (
              <Modal onClose={this.handleCloseModal}>
                <img src={checkedImage.largeImageURL} alt="" />
              </Modal>
            )}
          </>
        )}
      </div>
    );
  }
}
