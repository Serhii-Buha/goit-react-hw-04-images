import React, { useState, useEffect } from 'react';
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

export const App = () => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchInputValue) return;

    setLoading(true);

    axiosGetImg(searchInputValue, page)
      .then(response => {
        if (response.data.hits.length > 0) {
          setPhotos(prev => [...prev, ...response.data.hits]);
          setLoadMore(page < Math.ceil(response.data.totalHits / 12));
        } else {
          setLoadMore(false);
        }
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, searchInputValue]);

  const toggleModal = ({ largeImageURL = '', tags = '' } = {}) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const handleFormSubmit = searchInputValue => {
    setSearchInputValue(searchInputValue);
    setPhotos([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />

      {photos.length > 0 && (
        <ImageGallery photos={photos} onClick={toggleModal} />
      )}

      {showModal && (
        <Modal
          onClose={toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}

      {loading && <Loader />}

      <Button onLoadMore={handleLoadMore} loadMore={loadMore && !loading} />

      <ToastContainer autoClose={3000} />
    </Container>
  );
};

App.propTypes = {
  searchInputValue: PropTypes.string,
  page: PropTypes.number,
  photos: PropTypes.array,
  showModal: PropTypes.bool,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  error: PropTypes.string,
  loadMore: PropTypes.bool,
  loading: PropTypes.bool,
};
