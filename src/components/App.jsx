import css from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { fetchImages } from './image-api';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageModal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImgUrl, setSelectedImgUrl] = useState('');

  // const imgRef = useRef();

  useEffect(() => {
ImageModal.setAppElement('#root');

    if (query.trim() === '') {
      return;
    }
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchImages(query, page);

        setImages(prevImages => {
          return [...prevImages, ...data];
        });
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [page, query]);

  const handleSearch = e => {
    e.preventDefault();

    const form = e.target;
    const search = form.elements.search.value;
    setQuery(search);
    if (search.trim() === '') {
      toast.error('Enter text to search for images.');
    }
    form.reset();
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal =(data) => {
    setIsOpen(true);
    setSelectedImgUrl(data.urls.regular);
    // console.log(data);
    
  }

  const closeModal = () => {
    setIsOpen(false);
      setSelectedImgUrl('');
  }
  

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      {images.length > 0 && (
        <ImageGallery
          // ref={imgRef}
          handleClick={openModal}
          images={images}
        />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onLoadMoreBtn={handleLoadMore} />
      )}

      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className={css.Modal}
        overlayClassName={css.Overlay}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2> */}
        <button onClick={closeModal}>close</button>
        <div>
          <img className={css.img} src={selectedImgUrl} />
        </div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </ImageModal>

      <Toaster position="top-right" />
    </div>
  );
}


