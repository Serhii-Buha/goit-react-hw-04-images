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
