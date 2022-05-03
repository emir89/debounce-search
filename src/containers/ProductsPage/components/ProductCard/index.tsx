import React from "react";
import { Product } from "../Products";
import styles from "./productCard.module.scss";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { name, image } = product;

  return (
    <div className={styles.ProductCard}>
      <img
        src={image}
        alt="Product Img"
        width="100"
        height="100"
        loading="lazy"
      />
      <p>{name}</p>
    </div>
  );
};

export default ProductCard;
