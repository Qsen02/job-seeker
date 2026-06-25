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
import EditCompany from "./components/company/edit_company/EditCompany";
import CreateJob from "./components/jobs/create_job/CreateJob";
import JobDetails from "./components/jobs/job_details/JobDetails";
import ScrollToTop from "./commons/ScrollToTop";
import DeleteJob from "./components/jobs/delete_job/DeleteJob";

function App() {
	return (
		<>
			<AuthLoader>
				<ScrollToTop />
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
							<Route path="edit" element={<EditCompany />} />
							<Route path="create-job" element={<CreateJob />} />
						</Route>
						<Route path="/jobs/:jobId/*" element={<JobDetails />}>
							<Route path="delete" element={<DeleteJob />} />
						</Route>
					</Routes>
				</main>
				<Footer />
			</AuthLoader>
		</>
	);
}

export default App;
