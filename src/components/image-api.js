import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://api.unsplash.com/';
const ACCESS_KEY = 'AdcI7TU8-q5oR1xcgJygy_PoHhrRNSl_X2k92caE9HI';

export const fetchImages = async (searchQuery, page) => {
  const response = await axios.get('search/photos', {
    params: {
      query: searchQuery,
      per_page: 12,
      page: page,
      orientation: 'landscape',
      client_id: ACCESS_KEY,
    },
  });
  if (!response.data.total) {
    toast.error('No images found for this query.');
  }

  return {
    data: response.data.results,
    totalPages: response.data.total_pages,
  };
};
