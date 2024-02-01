import Header from "./components/header";
import Footer from "./components/footer";
import ProductInfos from "./components/productInfos";
import ProductImage from "./components/productImage";

export default function Home() {
	return (
		<main>
			<Header />

			<div className="container mx-auto px-[30px] py-[50px]">
				<div className="flex space-x-50">
					<div className="flex-1">
						<ProductImage
							src="https://product-data.raiadrogasil.io/images/3559287.webp"
							alt="Descrição da imagem"
							className="w-full h-auto"
						/>
					</div>
					<div className="flex-1">
						<ProductInfos
							name="Dipirona Monoidratada 500mg 10 comprimidos Medley Genérico"
							barcode="123456789"
							price={25.0} 
						/>
					</div>
				</div>
			</div>

			<Footer />
		</main>
	);
}
