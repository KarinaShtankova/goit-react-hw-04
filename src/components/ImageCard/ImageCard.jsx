import css from '../ImageCard/ImageCard.module.css';

export default function ImageCard({ image: { urls, description } }) {
  return (
    <div>
      <img className={css.image} src={urls.small} alt={description} />
    </div>
  );
}
