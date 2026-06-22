import { Route, Routes } from "react-router-dom";
import AuthLoader from "./commons/auth_loader/AuthLoader";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Register from "./components/user/register/Register";
import Login from "./components/user/login/Login";
import Logout from "./components/user/logout/Logout";
import NotFound from "./components/not_found/NotFound";
import RegisterCompany from "./components/company/register_company/RegisterCompany";
import CompanyDetails from "./components/company/company_details/CompanyDetails";
import DeleteCompany from "./components/company/delete_company/DeleteCompany";

function App() {
	return (
		<>
			<AuthLoader>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/logout" element={<Logout />} />
						<Route
							path="/company-register"
							element={<RegisterCompany />}
						/>
						<Route path="*" element={<NotFound />} />
						<Route
							path="/companies/:companyId/*"
							element={<CompanyDetails />}
						>
							<Route path="delete" element={<DeleteCompany />} />
						</Route>
					</Routes>
				</main>
				<Footer />
			</AuthLoader>
		</>
	);
}

export default App;
