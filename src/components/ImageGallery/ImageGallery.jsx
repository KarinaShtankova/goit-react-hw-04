import ImageCard from '../ImageCard/ImageCard';
import css from '../ImageGallery/ImageGallery.module.css';


export default function ImageGallery({ images, handleClick }) {
  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <li key={image.id} onClick={() => { handleClick(image) }}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
}








