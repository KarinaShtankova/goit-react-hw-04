import css from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { fetchImages } from './image-api';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import Modal from 'react-modal';
import ImageModal from './ImageModal/ImageModal';

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState({});
  const [showBtn, setShowBtn] = useState(false);

  const galleryRef = useRef();
  Modal.setAppElement('#root');

  useEffect(() => {
    handleScroll();
  }, [images]);

  useEffect(() => {
    if (query.trim() === '') {
      return;
    }
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const { data, totalPages } = await fetchImages(query, page);

        setImages(prevImages => {
          return [...prevImages, ...data];
        });
        setShowBtn(totalPages && totalPages !== page);
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [page, query]);

  const handleScroll = () => {
    if (!galleryRef.current) {
      return;
    }

    if (page > 1) {
      const dims = galleryRef.current.getBoundingClientRect();
      const y = dims.height * 3;

      window.scrollTo({
        top: y,
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

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

  const openModal = data => {
    setIsOpen(true);
    setSelectedImg(data);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      {images.length > 0 && (
        <ImageGallery
          ref={galleryRef}
          handleClick={openModal}
          images={images}
        />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {showBtn && <LoadMoreBtn onLoadMoreBtn={handleLoadMore} />}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={css.Modal}
        overlayClassName={css.Overlay}
        contentLabel="Example Modal"
      >
        <ImageModal imageData={selectedImg} />
      </Modal>

      <Toaster position="top-right" />
    </div>
  );
}
