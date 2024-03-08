import css from './ImageModal.module.css';
import Modal from 'react-modal';

export default function ImageModal({
  isOpen,
  onRequestClose,
  imageData: {
    alt_description,
    urls: { regular },
  },
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.Modal}
      overlayClassName={css.Overlay}
    >
      <div className={css.box}>
        <img className={css.img} alt={alt_description} src={regular} />
      </div>
    </Modal>
  );
}
