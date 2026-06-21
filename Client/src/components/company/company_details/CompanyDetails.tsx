import { useParams } from "react-router-dom";
import { useGetCompanyById } from "../../../hooks/useCompanies";
import ErrorMessage from "../../../commons/error_message/ErrorMessage";
import { Activity } from "react";
import { useLanguage } from "../../../store/language";
import { logoErrorHandler } from "../../../utils/error_images";
import JobItem from "../../../commons/job_item/JobItem";
import { useUser } from "../../../store/user";

export default function CompanyDetails() {
	const { companyId } = useParams();
	const { company, loading, error } = useGetCompanyById(null, companyId);
	const language = useLanguage((state) => state.language);
	const user = useUser((state) => state.user);
	return (
		<>
			{loading && !error ? (
				<span className="loader"></span>
			) : error ? (
				<ErrorMessage />
			) : (
				<section>
					<section>
						<article>
							<img
								src={
									company?.logo.url.trim() ||
									"/images/alt-company-image.jpg"
								}
								alt="Лого на компанията"
								onError={logoErrorHandler}
							/>
							<h1>{company?.name}</h1>
							<p>{company?.description}</p>
						</article>
						<Activity
							mode={language === "bg" ? "visible" : "hidden"}
						>
							<article>
								<div>
									<p>Имейл: {company?.email}</p>
									<p>Телефонен номер: {company?.phone}</p>
								</div>
								<div>
									<p>Локация: {company?.location}</p>
									<p>Адрес: {company?.address}</p>
								</div>
							</article>
							{user?.role === "admin" && (
								<article className="buttons">
									<button>Редактирай</button>
									<button>Изтрий</button>
								</article>
							)}
						</Activity>
						<Activity
							mode={language === "en" ? "visible" : "hidden"}
						>
							<article>
								<div>
									<p>Email: {company?.email}</p>
									<p>Phone number: {company?.phone}</p>
								</div>
								<div>
									<p>Location: {company?.location}</p>
									<p>Address: {company?.address}</p>
								</div>
							</article>
							{user?.role === "admin" && (
								<article className="buttons">
									<button>Edit</button>
									<button>Delete</button>
								</article>
							)}
						</Activity>
					</section>
					<h2>{language === "bg" ? "Обяви" : "Jobs"}</h2>
					{user?.role === "admin" && (
						<>
							<Activity
								mode={language === "bg" ? "visible" : "hidden"}
							>
								<button>Добави обява</button>
							</Activity>
							<Activity
								mode={language === "en" ? "visible" : "hidden"}
							>
								<button>Add job</button>
							</Activity>
						</>
					)}
					<section>
						{company?.jobs.length === 0 ? (
							<p>
								{language === "bg"
									? "Няма обяви все още"
									: "No jobs yet"}
							</p>
						) : (
							company?.jobs.map((el) => (
								<JobItem
									key={el._id}
									id={el._id}
									title={el.title}
									salary={el.salary}
									type={el.type}
									company={company}
									level={el.level}
									language={language}
									createdAt={el.created_at}
								/>
							))
						)}
					</section>
				</section>
			)}
		</>
	);
}
