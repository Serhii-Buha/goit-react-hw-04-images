import PropTypes from 'prop-types';
import { ButtonLoader } from 'components/Button/Button.styled';

export const Button = ({ onLoadMore, loadMore }) => {
  return loadMore ? (
    <ButtonLoader type="button" onClick={onLoadMore}>
      Load more
    </ButtonLoader>
  ) : null;
};
// Компонент Button возвращает ButtonLoader, если значение loadMore истинно (true). В противном случае, компонент возвращает null, что означает, что ничего не будет отображаться. Когда пользователь кликает на ButtonLoader, функция onLoadMore (то есть handleLoadMore) вызывается, увеличивая значение состояния page на 1

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};
