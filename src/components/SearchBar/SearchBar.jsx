import css from './SearchBar.module.css';
import { IoSearchSharp } from 'react-icons/io5';

export default function SearchBar({ onSubmit }) {
  return (
    <header className={css.header}>
      <form className={css.searchBar} onSubmit={onSubmit}>
        <input
          className={css.input}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit">
          <IoSearchSharp size={'22px'} />
        </button>
      </form>
    </header>
  );
}
