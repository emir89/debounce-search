import React from 'react';
import SearchIcon from "../../icons/SearchIcon";
import styles from './search.module.scss';

interface Props {
    onSearch: Function
}

const Search: React.FC<Props> = ({onSearch}) => {
    /**
     * Handles search text
     *
     * @param e
     */
    function handleSearchText(e: React.FormEvent<HTMLInputElement>): void {
        onSearch(e.currentTarget.value)
    }

    return (
        <div className={styles.SearchFieldContainer}>
            <SearchIcon />
            <input
                type='text'
                placeholder='Search'
                className={styles.Search}
                onChange={handleSearchText}
            />
        </div>
    );
}

export default Search;