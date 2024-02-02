'use client'

import { useState, useEffect } from 'react'

import Header from "./components/header";
import Footer from "./components/footer";
import ProductInfos from "./components/productInfos";
import Image from "next/image";
import Error from "./components/error";

type ProductType = {
	name: string;
	barcode: string;
	brand: string;
	image: string;
	price: string | number;
};

export default function Home() {
	const [product, setProduct] = useState<ProductType | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const urlParamValue = urlParams.get('url');

		if (urlParamValue) {
			fetch(`http://localhost:7000/api/product?url=${urlParamValue}`)
				.then((res) => res.json())
				.then((response) => {
					setProduct(response.data);
				})
				.catch((error) => {
					console.log("teste")
					setError(error.message);
				});
		} else {
			setError('É preciso informar a URL');
		}
	}, []);

	return (
		<main className="justify-between">
			<Header />

			<div className="container mx-auto px-[30px] py-[50px]">
				<div className="flex space-x-50">
					{product ? (
						<>
							<div className="flex-1">
								<Image
									src={product.image}
									alt={product.name}
									className=""
									priority
									width={500}
									height={0}
								/>
							</div>
							<div className="flex-1">
								<ProductInfos
									name={product.name}
									barcode={product.barcode}
									price={
										typeof product.price === 'string'
											? parseFloat(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
											: Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
									}
								/>
							</div>
						</>
					) : (
						<Error message={error} />
					)}
				</div>
			</div>

			<Footer />
		</main>
	);
}

