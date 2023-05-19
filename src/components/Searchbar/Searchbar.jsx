import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import {
  SearchbarHeader,
  SearchForm,
  SearchButton,
  SearchButtonSpan,
  SearchButtonInput,
} from 'components/Searchbar/Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchInputValue, setSearchInputValue] = useState('');

  const handleInputChange = e => {
    setSearchInputValue(e.currentTarget.value.toLowerCase());
    // this.setState({ searchInputValue: e.currentTarget.value.toLowerCase() });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchInputValue.trim() === '') {
      toast.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    onSubmit(searchInputValue);

    setSearchInputValue('');

    // this.setState({ searchInputValue: '' });
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchButtonSpan>Search</SearchButtonSpan>
        </SearchButton>

        <SearchButtonInput
          type="text"
          name="searchInputValue"
          value={searchInputValue}
          onChange={handleInputChange}
          // value={this.state.searchInputValue}
          // onChange={this.handleInputChange}
          // autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// export class Searchbar extends Component {
//   static propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//   };

//   state = {
//     searchInputValue: '',
//   };

//   handleInputChange = e => {
//     this.setState({ searchInputValue: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     if (this.state.searchInputValue.trim() === '') {
//       toast.error(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       return;
//     }

//     this.props.onSubmit(this.state.searchInputValue);

//     this.setState({ searchInputValue: '' });
//   };

//   render() {
//     return (
//       <SearchbarHeader>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <SearchButton type="submit">
//             <SearchButtonSpan>Search</SearchButtonSpan>
//           </SearchButton>

//           <SearchButtonInput
//             type="text"
//             name="searchInputValue"
//             value={this.state.searchInputValue}
//             onChange={this.handleInputChange}
//             autocomplete="off"
//             // autofocus
//             placeholder="Search images and photos"
//           />
//         </SearchForm>
//       </SearchbarHeader>
//     );
//   }
// }
