import ErrorMessage from "../../../commons/error_message/ErrorMessage";
import Loader from "../../../commons/loader/Loader";
import { useGetUserById } from "../../../hooks/useUsers";
import { useLanguage } from "../../../store/language";
import { Activity } from "react";
import { useUser } from "../../../store/user";
import { useGetJobsForUser } from "../../../hooks/useJobs";
import { useGetCompaniesForOwner } from "../../../hooks/useCompanies";
import JobItem from "../../../commons/job_item/JobItem";

export default function Profile() {
	const curUser = useUser((state) => state.user);
	const { user, setUser, loading, error } = useGetUserById(
		null,
		curUser?._id,
	);
	const { jobs } = useGetJobsForUser([], curUser?._id);
	const { companies } = useGetCompaniesForOwner([], curUser?._id);
	const language = useLanguage((state) => state.language);

	return (
		<>
			{loading && !error ? (
				<Loader />
			) : error ? (
				<ErrorMessage />
			) : (
				<section>
					<section>
						<Activity
							mode={
								user?.profileImage.url.trim()
									? "visible"
									: "hidden"
							}
						>
							<img
								src={user?.profileImage.url}
								alt="Профилна снимка"
							/>
						</Activity>
						<Activity
							mode={
								!user?.profileImage.url.trim()
									? "visible"
									: "hidden"
							}
						>
							<i className="fa-solid fa-circle-user"></i>
						</Activity>
						<Activity
							mode={language === "bg" ? "visible" : "hidden"}
						>
							<p>
								Имейл:{" "}
								<a
									className="link"
									href={`mailto:${user?.email}`}
								>
									{user?.email}
								</a>
							</p>
							<p>
								Телефонен номер:{" "}
								<a
									className="link"
									href={`tel:${user?.phoneNumber}`}
								>
									{user?.phoneNumber}
								</a>
							</p>
						</Activity>
						<Activity
							mode={language === "en" ? "visible" : "hidden"}
						>
							<p>
								Email:{" "}
								<a
									className="link"
									href={`mailto:${user?.email}`}
								>
									{user?.email}
								</a>
							</p>
							<p>
								Phone number:{" "}
								<a
									className="link"
									href={`tel:${user?.phoneNumber}`}
								>
									{user?.phoneNumber}
								</a>
							</p>
						</Activity>
						<div className="buttons">
							<button>
								{language === "bg"
									? "Редактирай профил"
									: "Edit Profile"}
							</button>
							<button>
								{language === "bg"
									? "Промени парола"
									: "Change Password"}
							</button>
						</div>
					</section>
					<Activity
						mode={user?.role === "user" ? "visible" : "hidden"}
					>
						<h2>
							{language === "bg"
								? "Обяви по които е кандидатствано"
								: "Jobs applied for"}
						</h2>
						<section>
							{jobs.length > 0 ? (
								jobs.map((job) => (
									<JobItem
										key={job._id}
										id={job._id}
										title={job.title}
										salary={job.salary}
										company={job.companyId}
										createdAt={job.created_at}
										level={job.level}
										language={language}
										type={job.type}
									/>
								))
							) : (
								<p>
									{language === "bg"
										? "Няма обяви, за които сте кандидатствали."
										: "No jobs applied for."}
								</p>
							)}
						</section>
					</Activity>
					<Activity
						mode={user?.role === "admin" ? "visible" : "hidden"}
					>
						<h2>
							{language === "bg"
								? "Компании, които сте регистрирали"
								: "Companies you have registered"}
						</h2>
						{companies.length > 0 ? (
							companies.map((company) => (
								<div key={company._id}>
									<p>{company.name}</p>
								</div>
							))
						) : (
							<p>
								{language === "bg"
									? "Няма регистрирани компании."
									: "No registered companies."}
							</p>
						)}
					</Activity>
				</section>
			)}
		</>
	);
}
