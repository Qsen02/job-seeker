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
import EditJob from "./components/jobs/edit_job/EditJob";
import CreateCandidature from "./components/candidatures/create_candidature/CreateCandidature";
import JobCandidatures from "./components/candidatures/job_candidatures/JobCandidatures";
import CandidatureDetails from "./components/candidatures/candidature_details/CandidatureDetails";
import DeleteCandidature from "./components/candidatures/delete_candidature/DeleteCandidature";
import Profile from "./components/user/profile/Profile";
import EditUser from "./components/user/edit_user/EditUser";
import ChangePassword from "./components/user/change_password/ChangePassword";
import GuestGuard from "./gurads/GuestGuard";
import AdminGuard from "./gurads/AdminGuard";
import UserGuard from "./gurads/UserGuard";

function App() {
	return (
		<>
			<AuthLoader>
				<ScrollToTop />
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route element={<GuestGuard />}>
							<Route path="/register" element={<Register />} />
							<Route path="/login" element={<Login />} />
						</Route>
						<Route path="/logout" element={<Logout />} />
						<Route element={<AdminGuard />}>
							<Route
								path="/company-register"
								element={<RegisterCompany />}
							/>
						</Route>
						<Route
							path="/companies/:companyId/*"
							element={<CompanyDetails />}
						>
							<Route element={<AdminGuard />}>
								<Route
									path="delete"
									element={<DeleteCompany />}
								/>
								<Route path="edit" element={<EditCompany />} />
								<Route
									path="create-job"
									element={<CreateJob />}
								/>
							</Route>
						</Route>
						<Route path="/jobs/:jobId/*" element={<JobDetails />}>
							<Route element={<AdminGuard />}>
								<Route path="delete" element={<DeleteJob />} />
								<Route path="edit" element={<EditJob />} />
							</Route>
							<Route element={<UserGuard />}>
								<Route
									path="apply"
									element={<CreateCandidature />}
								/>
							</Route>
							<Route element={<AdminGuard />}>
								<Route
									path="candidatures"
									element={<JobCandidatures />}
								/>
							</Route>
						</Route>
						<Route element={<UserGuard />}>
							<Route
								path="/candidatures/:candidatureId/*"
								element={<CandidatureDetails />}
							>
								<Route
									path="delete"
									element={<DeleteCandidature />}
								/>
							</Route>
						</Route>
						<Route element={<UserGuard />}>
							<Route path="/profile/*" element={<Profile />}>
								<Route path="edit" element={<EditUser />} />
								<Route
									path="change-password"
									element={<ChangePassword />}
								/>
							</Route>
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</main>
				<Footer />
			</AuthLoader>
		</>
	);
}

export default App;
