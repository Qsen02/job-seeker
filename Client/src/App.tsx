import { Route, Routes } from "react-router-dom";
import AuthLoader from "./commons/auth_loader/AuthLoader";
import Header from "./components/header/Header";
import Home from "./components/home/Home";

function App() {
	return (
		<>
			<AuthLoader>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</main>
			</AuthLoader>
		</>
	);
}

export default App;
