import PropTypes from 'prop-types';
import { ButtonLoader } from 'components/Button/Button.styled';

export const Button = ({ onLoadMore, loadMore }) => {
  return loadMore ? (
    <ButtonLoader type="button" onClick={onLoadMore}>
      Load more
    </ButtonLoader>
  ) : null;
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};
