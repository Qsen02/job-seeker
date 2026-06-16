import "swiper/css/bundle";
import { Activity, useState } from "react";
import Loader from "../../commons/loader/Loader";
import { useGetAllCompanies } from "../../hooks/useCompanies";
import { useLanguage } from "../../store/language";
import styles from "./Home.module.css";
import Companies from "./companies/Companies";
import { useGetAllJobs } from "../../hooks/useJobs";
import Jobs from "./jobs/Jobs";

export default function Home() {
	const { companies, loading, error } = useGetAllCompanies([]);
	const language = useLanguage((state) => state.language);
	const [filter, setFilter] = useState<"type" | "level" | "">("");
	const [value, setValue] = useState("");
	const { jobs } = useGetAllJobs([],filter,value);

	function changeFilter(filter: "type" | "level", value: string) {
		setFilter(filter);
		setValue(value);
	}

	return (
		<>
			{loading && !error ? (
				<Loader />
			) : error ? (
				<p>Сървърът не отговаря моля опитайте по късно!</p>
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
						<h2>{language === "bg" ? "Обяви" : "Jobs"}</h2>
						<section className={styles.jobsWrapper}>
							<aside className={styles.filters}>
								<h3>
									{language === "bg" ? "Филтри:" : "Filters:"}
								</h3>
								<Activity
									mode={
										language === "bg" ? "visible" : "hidden"
									}
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
												onClick={() =>
													changeFilter(
														"type",
														"remote",
													)
												}
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
												onClick={() =>
													changeFilter(
														"type",
														"hybrid",
													)
												}
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
												onClick={() =>
													changeFilter(
														"type",
														"on-site",
													)
												}
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
												onClick={() =>
													changeFilter(
														"level",
														"junior",
													)
												}
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
												onClick={() =>
													changeFilter("level", "mid")
												}
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
												onClick={() =>
													changeFilter(
														"level",
														"senior",
													)
												}
											>
												Старши
											</button>
										</div>
									</div>
								</Activity>
								<Activity
									mode={
										language === "en" ? "visible" : "hidden"
									}
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
												onClick={() =>
													changeFilter(
														"type",
														"remote",
													)
												}
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
												onClick={() =>
													changeFilter(
														"type",
														"hybrid",
													)
												}
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
												onClick={() =>
													changeFilter(
														"type",
														"on-site",
													)
												}
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
												onClick={() =>
													changeFilter(
														"level",
														"junior",
													)
												}
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
												onClick={() =>
													changeFilter("level", "mid")
												}
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
												onClick={() =>
													changeFilter(
														"level",
														"senior",
													)
												}
											>
												Senior
											</button>
										</div>
									</div>
								</Activity>
							</aside>
							<Jobs jobs={jobs} language={language} />
						</section>
					</section>
				</section>
			)}
		</>
	);
}
