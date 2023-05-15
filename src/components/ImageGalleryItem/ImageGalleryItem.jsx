import PropTypes from 'prop-types';
import { Li, Img } from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onClick,
}) => {
  return (
    <Li onClick={() => onClick({ largeImageURL, tags })}>
      <Img src={webformatURL} alt={tags} />
    </Li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
