import React from 'react';

interface ProductImagerops {
    src: string;
    alt: string;
    className: string;
}

const ProductImage: React.FC<ProductImagerops> = ({ src, alt, className }) => {
    return (
        <>
            <img
                src={src}
                alt={alt}
                className={className}
            />
        </>
    );
};

export default ProductImage;