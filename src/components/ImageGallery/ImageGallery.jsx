import ImageCard from '../ImageCard/ImageCard';
import css from '../ImageGallery/ImageGallery.module.css';
import { forwardRef } from 'react';

const ImageGallery = forwardRef(({ images, handleClick }, ref) => {
  return (
    <ul className={css.gallery} ref={ref}>
      {images.map(image => (
        <li
          key={image.id}
          onClick={() => {
            handleClick(image);
          }}
        >
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
});

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;
