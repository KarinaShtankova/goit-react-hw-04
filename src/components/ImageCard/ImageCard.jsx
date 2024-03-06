import css from '../ImageCard/ImageCard.module.css';

export default function ImageCard({ image: { urls, alt_description } }) {
  return (
    <div>
      <img className={css.image} src={urls.small} alt={alt_description} />
    </div>
  );
}
