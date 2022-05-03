import React from 'react';
import {ReactComponent as SearchSvg} from './search.svg';
import classNames from 'classnames';
import styles from './searchIcon.module.scss';

interface Props {
    height?: number,
    width?: number,
    className?: string
}

const SearchIcon: React.FC<Props> = ({height, width, className}) => {
    return (
        <SearchSvg
            style={{width, height}}
            className={classNames(styles.Icon, className)}
        />
    );
}

export default SearchIcon;
