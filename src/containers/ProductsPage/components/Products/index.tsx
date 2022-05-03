import React from 'react';
import ProductCard from '../ProductCard';
import NoResults from '../../../../componentsCommon/NoResults';
import styles from './products.module.scss';
import Loader from "../../../../componentsCommon/Loader";

export interface Product {
    name: string,
    image: string,
}

interface Props {
    products: Product[],
    onLoadMore: Function,
    hasMoreData: Boolean,
    isSearchRequestInProgress: Boolean
}

const Products: React.FC<Props> = ({
   products,
   onLoadMore,
   hasMoreData,
   isSearchRequestInProgress}) => {
    const productsToShow = products.map(product => {
        return <ProductCard key={`${product.name}${product.image}`} product={product} />
    });

    return (
        <div>
            {productsToShow.length ?
                <>
                    <div className={styles.Products}>{productsToShow}</div>
                    {hasMoreData &&
                    <div>
                        {isSearchRequestInProgress && <Loader />}
                        <button className={styles.LoadMoreButton} onClick={() => onLoadMore()}>Load more</button>
                    </div>
                    }
                </> :
               <NoResults />
            }
        </div>
    );
}

export default Products;