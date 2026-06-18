import "swiper/css/bundle";
import { Activity, useState } from "react";
import Loader from "../../commons/loader/Loader";
import { useGetAllCompanies } from "../../hooks/useCompanies";
import { useLanguage } from "../../store/language";
import styles from "./Home.module.css";
import Companies from "./companies/Companies";
import { useGetAllJobs } from "../../hooks/useJobs";
import Jobs from "./jobs/Jobs";
import ErrorMessage from "../../commons/error_message/ErrorMessage";

export default function Home() {
	const { companies, loadingCompanies, errorCompanies } = useGetAllCompanies(
		[],
	);
	const language = useLanguage((state) => state.language);
	const [filter, setFilter] = useState<"type" | "level" | "">("");
	const [value, setValue] = useState("");
	const { jobs, loadingJobs, errorJobs, page, setPage, maxPages } =
		useGetAllJobs([], filter, value);

	function changeFilter(filter: "type" | "level" | "", value: string) {
		setFilter(filter);
		setValue(value);
	}

	return (
		<>
			{(loadingCompanies || loadingJobs) &&
			!(errorCompanies || errorJobs) ? (
				<Loader />
			) : errorCompanies || errorJobs ? (
				<ErrorMessage />
			) : (
				<section className={styles.wrapper}>
					<section className={styles.companyContainer}>
						<Activity
							mode={language === "bg" ? "visible" : "hidden"}
						>
							<h1>
								Добре дошли в <span>Job Seeker</span>. Намерете
								своята работа сега!
							</h1>
						</Activity>
						<Activity
							mode={language === "en" ? "visible" : "hidden"}
						>
							<h1>
								Wellcome to <span>Job Seeker</span>. Find your
								job now!
							</h1>
						</Activity>
						<Companies language={language} companies={companies} />
					</section>
					<h2>{language === "bg" ? "Обяви" : "Jobs"}</h2>
					<section className={styles.jobsWrapper}>
						<aside className={styles.filters}>
							<h3>
								{language === "bg" ? "Филтри:" : "Filters:"}
							</h3>
							<Activity
								mode={language === "bg" ? "visible" : "hidden"}
							>
								<div>
									<p>Тип</p>
									<div className={styles.buttons}>
										<button
											className={
												filter === "type" &&
												value === "remote"
													? styles.active
													: ""
											}
											onClick={() => {
												changeFilter("type", "remote");
												setPage(1);
											}}
										>
											Онлайн
										</button>
										<button
											className={
												filter === "type" &&
												value === "hybrid"
													? styles.active
													: ""
											}
											onClick={() => {
												changeFilter("type", "hybrid");
												setPage(1);
											}}
										>
											Хибрид
										</button>
										<button
											className={
												filter === "type" &&
												value === "on-site"
													? styles.active
													: ""
											}
											onClick={() => {
												changeFilter("type", "on-site");
												setPage(1);
											}}
										>
											На място
										</button>
									</div>
								</div>
								<div>
									<p>Ниво</p>
									<div className={styles.buttons}>
										<button
											className={
												filter === "level" &&
												value === "junior"
													? styles.active
													: ""
											}
											onClick={() => {
												changeFilter("level", "junior");
												setPage(1);
											}}
										>
											Младши
										</button>
										<button
											className={
												filter === "level" &&
												value === "mid"
													? styles.active
													: ""
											}
											onClick={() => {
												changeFilter("level", "mid");
												setPage(1);
											}}
										>
											Средно
										</button>
										<button
											className={
												filter === "level" &&
												value === "senior"
													? styles.active
													: ""
											}
											onClick={() => {
												changeFilter("level", "senior");
												setPage(1);
											}}
										>
											Старши
										</button>
									</div>
									<button
										onClick={() => {
											changeFilter("", "");
											setPage(1);
										}}
										id={styles.removeFilters}
									>
										{language === "bg"
											? "Изчисти филтри"
											: "Remove filters"}
									</button>
								</div>
							</Activity>
							<Activity
								mode={language === "en" ? "visible" : "hidden"}
							>
								<div>
									<p>Type</p>
									<div className={styles.buttons}>
										<button
											className={
												filter === "type" &&
												value === "remote"
													? styles.active
													: ""
											}
											onClick={() => {
												changeFilter("type", "remote");
												setPage(1);
											}}
										>
											Online
										</button>
										<button
											className={
												filter === "type" &&
												value === "hybrid"
													? styles.active
													: ""
											}
											onClick={() => {
												changeFilter("type", "hybrid");
												setPage(1);
											}}
										>
											Hybrid
										</button>
										<button
											className={
												filter === "type" &&
												value === "on-site"
													? styles.active
													: ""
											}
											onClick={() => {
												changeFilter("type", "on-site");
												setPage(1);
											}}
										>
											On site
										</button>
									</div>
								</div>
								<div>
									<p>Level</p>
									<div className={styles.buttons}>
										<button
											className={
												filter === "level" &&
												value === "junior"
													? styles.active
													: ""
											}
											onClick={() => {
												changeFilter("level", "junior");
												setPage(1);
											}}
										>
											Junior
										</button>
										<button
											className={
												filter === "level" &&
												value === "mid"
													? styles.active
													: ""
											}
											onClick={() => {
												changeFilter("level", "mid");
												setPage(1);
											}}
										>
											Mid
										</button>
										<button
											className={
												filter === "level" &&
												value === "senior"
													? styles.active
													: ""
											}
											onClick={() => {
												changeFilter("level", "senior");
												setPage(1);
											}}
										>
											Senior
										</button>
									</div>
									<button
										onClick={() => {
											changeFilter("", "");
											setPage(1);
										}}
									>
										{language === "bg"
											? "Изчисти филтри"
											: "Remove filters"}
									</button>
								</div>
							</Activity>
						</aside>
						<Jobs jobs={jobs} language={language} />
					</section>
					<Activity mode={jobs.length > 20 ? "visible" : "hidden"}>
						<section className={styles.pagination}>
							<button onClick={() => setPage(1)}>
								<i className="fa-solid fa-angles-left"></i>
							</button>
							<button
								onClick={() => setPage((prev) => prev - 1)}
								disabled={page <= 1}
								className={page <= 1 ? styles.disabled : ""}
							>
								<i className="fa-solid fa-angle-left"></i>
							</button>
							<p>
								{page} - {maxPages}
							</p>
							<button
								onClick={() => setPage((prev) => prev + 1)}
								disabled={page >= maxPages}
								className={
									page >= maxPages ? styles.disabled : ""
								}
							>
								<i className="fa-solid fa-angle-right"></i>
							</button>
							<button onClick={() => setPage(maxPages)}>
								<i className="fa-solid fa-angles-right"></i>
							</button>
						</section>
					</Activity>
				</section>
			)}
		</>
	);
}
