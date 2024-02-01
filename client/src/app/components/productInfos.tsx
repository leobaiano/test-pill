import React from 'react';

interface ProductInfosProps {
    name: string;
    barcode: string;
    price: number;
}

const ProductInfos: React.FC<ProductInfosProps> = ({ name, barcode, price }) => {
    return (
        <>
            <h1 className="text-[26px] font-bold text-primary-color mb-[30px] text-end">{name}</h1>
            <p className="text-18 text-000072-light mb-[30px] text-end">
                <strong>EAN:</strong> <span>{barcode}</span>
            </p>
            <p className="text-18 text-000072-light text-end">
                <strong>Preço:</strong> <span>{price}</span>
            </p>
        </>
    );
};

export default ProductInfos;
