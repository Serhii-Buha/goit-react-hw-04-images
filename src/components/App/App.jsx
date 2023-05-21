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

  // useEffect(() => {}, []);

  // componentDidUpdate(prevProps, prevState) {
  //   const { searchInputValue, page } = this.state;

  // if (
  //   page !== prevState.page ||
  //   searchInputValue !== prevState.searchInputValue
  // ) {
  // this.setState({ loading: true });

  // axiosGetImg(searchInputValue, page)
  //   .then(response => {
  //     if (response.data.hits.length > 0) {
  //       this.setState(prev => ({
  //         photos: [...prev.photos, ...response.data.hits],
  //         loadMore: prev.page < Math.ceil(response.data.totalHits / 12),
  //       }));
  //     } else {
  //       this.setState({ loadMore: false });
  //     }
  //   })
  //   .catch(error => {
  //     this.setState({ error: error.message });
  //   })
  //   .finally(() => {
  //     this.setState({ loading: false });
  //   });
  //   }
  // }

  useEffect(() => {
    // if (
    //   page !== prevState.page ||
    //   searchInputValue !== prevState.searchInputValue
    // ) {}

    if (!searchInputValue) return;
    //searchInputValue является пустой строкой (''), что интерпретируется как false.
    //!searchInputValue инвертирует это значение, так что пустая строка ('') становится true.
    //Таким образом, !searchInputValue вернет true, если searchInputValue является пустой строкой или другим "falsy" значением, и false в противном случае. В данном контексте, if (!searchInputValue) return; означает "если searchInputValue пустая строка или 'falsy' значение, остановить выполнение функции".

    // if (page !== 1 || searchInputValue !== '') {
    //   this.setState({ loading: true });

    setLoading(true);

    axiosGetImg(searchInputValue, page)
      .then(response => {
        if (response.data.hits.length > 0) {
          setPhotos(prev => [...prev, ...response.data.hits]);
          setLoadMore(page < Math.ceil(response.data.totalHits / 12));
          // this.setState(prev => ({
          //   photos: [...prev.photos, ...response.data.hits],
          //   loadMore: prev.page < Math.ceil(response.data.totalHits / 12),
          // }));
        } else {
          setLoadMore(false);
          // this.setState({ loadMore: false });
        }
      })
      .catch(error => {
        setError(error.message);
        // this.setState({ error: error.message });
      })
      .finally(() => {
        setLoading(false);
        // this.setState({ loading: false });
      });
  }, [page, searchInputValue]);

  // const toggleModal = ({ largeImageURL = '', tags = '' } = {}) => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //     largeImageURL: largeImageURL,
  //     tags: tags,
  //   }));
  // };

  const toggleModal = ({ largeImageURL = '', tags = '' } = {}) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const handleFormSubmit = searchInputValue => {
    setSearchInputValue(searchInputValue);
    setPhotos([]);
    setPage(1);
    // this.setState({ searchInputValue, photos: [], page: 1 });
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
    // this.setState(prev => ({ page: prev.page + 1 }));
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
// loadMore должно быть истинным (true) и loading должно быть ложным (false)

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

// export class App extends Component {
//   static propTypes = {
//     searchInputValue: PropTypes.string,
//     page: PropTypes.number,
//     photos: PropTypes.array,
//     showModal: PropTypes.bool,
//     largeImageURL: PropTypes.string,
//     tags: PropTypes.string,
//     loadMore: PropTypes.bool,
//     loading: PropTypes.bool,
//   };

//   state = {
//     searchInputValue: '',
//     page: 1,
//     photos: [],
//     largeImageURL: '',
//     tags: '',
//     error: null,
//     showModal: false,
//     loadMore: false,
//     loading: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { searchInputValue, page } = this.state;

//     if (
//       page !== prevState.page ||
//       searchInputValue !== prevState.searchInputValue
//     ) {
//       this.setState({ loading: true });

//       axiosGetImg(searchInputValue, page)
//         .then(response => {
//           if (response.data.hits.length > 0) {
//             this.setState(prev => ({
//               photos: [...prev.photos, ...response.data.hits],
//               loadMore: prev.page < Math.ceil(response.data.totalHits / 12),
//             }));
//           } else {
//             this.setState({ loadMore: false });
//           }
//         })
//         .catch(error => {
//           this.setState({ error: error.message });
//         })
//         .finally(() => {
//           this.setState({ loading: false });
//         });
//     }
//   }

//   toggleModal = ({ largeImageURL = '', tags = '' } = {}) => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//       largeImageURL: largeImageURL,
//       tags: tags,
//     }));
//   };

//   handleFormSubmit = searchInputValue => {
//     this.setState({ searchInputValue, photos: [], page: 1 });
//   };

//   handleLoadMore = () => {
//     this.setState(prev => ({ page: prev.page + 1 }));
//   };

//   render() {
//     const { photos, showModal, largeImageURL, loadMore, loading, tags } =
//       this.state;

//     return (
//       <Container>
//         <Searchbar onSubmit={this.handleFormSubmit} />

//         {photos.length > 0 && (
//           <ImageGallery photos={photos} onClick={this.toggleModal} />
//         )}

//         {showModal && (
//           <Modal
//             onClose={this.toggleModal}
//             largeImageURL={largeImageURL}
//             tags={tags}
//           />
//         )}

//         {loading && <Loader />}

//         <Button
//           onLoadMore={this.handleLoadMore}
//           loadMore={loadMore && !loading}
//         />

//         <ToastContainer autoClose={3000} />
//       </Container>
//     );
//   }
// }
