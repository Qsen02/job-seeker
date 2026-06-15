import "swiper/css/bundle";
import { Activity } from "react";
import CompanyItem from "../../commons/company_item/CompanyItem";
import Loader from "../../commons/loader/Loader";
import { useGetAllCompanies } from "../../hooks/useCompanies";
import { useLanguage } from "../../store/language";
import styles from "./Home.module.css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
	const { companies, loading, error } = useGetAllCompanies([]);
	const language = useLanguage((state) => state.language);

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
						<section className={styles.companyWrapper}>
							<h2>{language === "bg" ? "Фирми" : "Companies"}</h2>
							<section className={styles.companies}>
								{companies.length === 0 ? (
									<p>
										{language === "bg"
											? "Няма регистрирани фирми все още"
											: "No registered companies yet"}
									</p>
								) : (
									<Swiper
										modules={[Navigation]}
										navigation={companies.length > 3}
										slidesPerView={
											window.innerWidth > 684 ? 3 : 1
										}
										initialSlide={1}
										loop={true}
										speed={700}
										spaceBetween={0}
										className={styles.swiper}
									>
										{companies.map((el) => (
											<SwiperSlide>
												<CompanyItem
													key={el._id}
													id={el._id}
													name={el.name}
													logo={el.logo.url}
												/>
											</SwiperSlide>
										))}
									</Swiper>
								)}
							</section>
						</section>
					</section>
				</section>
			)}
		</>
	);
}
