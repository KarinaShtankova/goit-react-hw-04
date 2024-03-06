import css from './ImageModal.module.css';

export default function ImageModal({
  imageData: {
    alt_description,
    urls: { regular },
  },
}) {
  return (
    <div className={css.box}>
      <img className={css.img} src={regular} alt={alt_description} />
    </div>
  );
}
