import "./App.css";
import BrandsForm from "./components/Brands/BrandsForm/BrandsForm";
import BrandsList from "./components/Brands/BrandsList/BrandsList";

function App() {
	return (
		<div className="wrapper">
			<BrandsForm />
			<BrandsList />
		</div>
	);
}

export default App;
