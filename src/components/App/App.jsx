import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'components/App/App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import axiosGetImg from 'api/axiosGetImg';
import { Modal } from 'components/Modal/Modal';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export class App extends Component {
  static propTypes = {
    searchInputValue: PropTypes.string,
    page: PropTypes.number,
    photos: PropTypes.array,
    showModal: PropTypes.bool,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
    loadMore: PropTypes.bool,
    loading: PropTypes.bool,
  };

  state = {
    searchInputValue: '',
    page: 1,
    photos: [],
    largeImageURL: '',
    tags: '',
    error: null,
    showModal: false,
    loadMore: false,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchInputValue, page } = this.state;

    if (
      page !== prevState.page ||
      searchInputValue !== prevState.searchInputValue
    ) {
      this.setState({ loading: true });

      axiosGetImg(searchInputValue, page)
        .then(response => {
          if (response.data.hits.length > 0) {
            this.setState(prev => ({
              photos: [...prev.photos, ...response.data.hits],
              loadMore: prev.page < Math.ceil(response.data.totalHits / 12),
            }));
          } else {
            this.setState({ loadMore: false });
          }
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  toggleModal = ({ largeImageURL = '', tags = '' } = {}) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: largeImageURL,
      tags: tags,
    }));
  };

  handleFormSubmit = searchInputValue => {
    this.setState({ searchInputValue, photos: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { photos, showModal, largeImageURL, loadMore, loading, tags } =
      this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {photos.length > 0 && (
          <ImageGallery photos={photos} onClick={this.toggleModal} />
        )}

        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}

        {loading && <Loader />}

        <Button
          onLoadMore={this.handleLoadMore}
          loadMore={loadMore && !loading}
        />

        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
