import { Swiper, SwiperSlide } from "swiper/react";
import CompanyItem from "../../../commons/company_item/CompanyItem";
import { Navigation } from "swiper/modules";
import type { Company } from "../../../types/companies";
import styles from "./Companies.module.css"

interface CompaniesProps { 
    language: "bg" | "en";
    companies: Company[];
}

export default function Companies({ language,companies}:CompaniesProps) { 
    return (
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
						navigation={true}
						slidesPerView={window.innerWidth > 684 ? 3 : 1}
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
	);
}