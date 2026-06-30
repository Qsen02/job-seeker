import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetCompanyById } from "../../../hooks/useCompanies";
import ErrorMessage from "../../../commons/error_message/ErrorMessage";
import { Activity } from "react";
import { useLanguage } from "../../../store/language";
import { logoErrorHandler } from "../../../utils/error_images";
import JobItem from "../../../commons/job_item/JobItem";
import { useUser } from "../../../store/user";
import styles from "./CompanyDetails.module.css";
import Loader from "../../../commons/loader/Loader";

export default function CompanyDetails() {
	const { companyId } = useParams();
	const { company, setCompany, loading, error } = useGetCompanyById(
		null,
		companyId,
	);
	const language = useLanguage((state) => state.language);
	const user = useUser((state) => state.user);
	const navigate = useNavigate();

	return (
		<>
			<Outlet context={{ company, setCompany }} />
			{loading && !error ? (
				<Loader />
			) : error ? (
				<ErrorMessage />
			) : (
				<section className={styles.wrapper}>
					<section className={styles.companyInfo}>
						<article className={styles.title}>
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
							<article className={styles.data}>
								<div>
									<p>
										Имейл:{" "}
										<a
											href={`mailto:${company?.email}`}
											className="link"
										>
											{company?.email}
										</a>
									</p>
									<p>
										Телефонен номер:{" "}
										<a
											href={`tel:${company?.phone}`}
											className="link"
										>
											{company?.phone}
										</a>
									</p>
								</div>
								<div>
									<p>Локация: {company?.location}</p>
									<p>Адрес: {company?.address}</p>
								</div>
							</article>
							{user?.role === "admin" && (
								<article className="buttons">
									<button
										onClick={() =>
											navigate(
												`/companies/${company?._id}/edit`,
											)
										}
									>
										Редактирай
									</button>
									<button
										onClick={() =>
											navigate(
												`/companies/${company?._id}/delete`,
											)
										}
									>
										Изтрий
									</button>
								</article>
							)}
						</Activity>
						<Activity
							mode={language === "en" ? "visible" : "hidden"}
						>
							<article className={styles.data}>
								<div>
									<p>
										Email:{" "}
										<a
											href={`mailto:${company?.email}`}
											className="link"
										>
											{company?.email}
										</a>
									</p>
									<p>
										Phone number:{" "}
										<a
											href={`tel:${company?.phone}`}
											className="link"
										>
											{company?.phone}
										</a>
									</p>
								</div>
								<div>
									<p>Location: {company?.location}</p>
									<p>Address: {company?.address}</p>
								</div>
							</article>
							{user?.role === "admin" && (
								<article className="buttons">
									<button
										onClick={() =>
											navigate(
												`/companies/${company?._id}/edit`,
											)
										}
									>
										Edit
									</button>
									<button
										onClick={() =>
											navigate(
												`/companies/${company?._id}/delete`,
											)
										}
									>
										Delete
									</button>
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
								<button
									onClick={() =>
										navigate(
											`/companies/${companyId}/create-job`,
										)
									}
								>
									Добави обява
								</button>
							</Activity>
							<Activity
								mode={language === "en" ? "visible" : "hidden"}
							>
								<button
									onClick={() =>
										navigate(
											`/companies/${companyId}/create-job`,
										)
									}
								>
									Add job
								</button>
							</Activity>
						</>
					)}
					<section className={styles.jobs}>
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
