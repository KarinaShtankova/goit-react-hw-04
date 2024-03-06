import css from '../LoadMoreBtn/LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onLoadMoreBtn }) {
  return (
    <button className={css.button} onClick={onLoadMoreBtn} type="button">
      Load more
    </button>
  );
}
