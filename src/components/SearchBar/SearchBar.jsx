import css from './SearchBar.module.css';
import { IoSearchSharp } from 'react-icons/io5';
import toast from 'react-hot-toast';

export default function SearchBar({ onSubmit }) {
  const handleSearch = e => {
    e.preventDefault();
    const form = e.target;
    const search = form.elements.search.value;
    form.reset();
    if (search.trim() === '') {
      toast.error('Enter text to search for images.');
    }
    onSubmit(search);
  };

  return (
    <header className={css.header}>
      <form className={css.searchBar} onSubmit={handleSearch}>
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
