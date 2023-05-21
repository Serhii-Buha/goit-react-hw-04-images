import axios from 'axios';
import { toast } from 'react-toastify';

const API_KEY = '34776092-e1ad4760d698a403538ddbaea';

const axiosOptions = {
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  },
};

const axiosGetImg = async (currentSearchValue, page = 1) => {
  try {
    const response = await axios.get(
      `?q=${currentSearchValue}&page=${page}`,
      axiosOptions
    );

    const totalHits = response.data.totalHits;
    const currentHits = response.data.hits.length;

    if (totalHits > 0) {
      if (page === 1) {
        if (totalHits <= 12) {
          toast.info(
            `We found ${totalHits} images, and you've reached the end of search results.`
          );
        } else {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }
      } else if (currentHits < 12) {
        toast.info(
          `We found ${currentHits} images, and you've reached the end of search results.`
        );
      }
      return response;
    } else {
      toast.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export default axiosGetImg;
