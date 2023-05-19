import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from 'components/Modal/Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImageURL, tags, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={largeImageURL} alt={tags} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};

// export class Modal extends Component {
//   static propTypes = {
//     onClose: PropTypes.func.isRequired,
//     largeImageURL: PropTypes.string.isRequired,
//     tags: PropTypes.string,
//   };

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <Overlay onClick={this.handleBackdropClick}>
//         <ModalWindow>
//           <img src={this.props.largeImageURL} alt={this.props.tags} />
//         </ModalWindow>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }
