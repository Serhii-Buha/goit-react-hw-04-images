import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { LoaderBlock } from 'components/Loader/Loader.styled';

export const Loader = () => (
  <LoaderBlock>
    <ThreeDots color="#3f51b5" height={80} width={80} />
  </LoaderBlock>
);
