import { useGetCompaniesForOwner } from "../../../../hooks/useCompanies";
import type { UserAttributes } from "../../../../types/users";
import styles from "./AdminCompanies.module.css";
import CompanyItem from "../../../../commons/company_item/CompanyItem";

interface AdminCompaniesProps {
	curUser: UserAttributes | null;
	language: "bg" | "en";
}

export default function AdminCompanies({
	curUser,
	language,
}: AdminCompaniesProps) {
	const { companies } = useGetCompaniesForOwner([], curUser?._id);
	return (
		<>
			<h2>
				{language === "bg"
					? "Компании, които сте регистрирали"
					: "Companies you have registered"}
			</h2>
			<section className={styles.wrapper}>
				{companies.length > 0 ? (
					companies.map((company) => (
						<CompanyItem
							key={company._id}
							id={company._id}
							logo={
								company.logo.url
							}
							name={company.name}
						/>
					))
				) : (
					<p>
						{language === "bg"
							? "Няма регистрирани компании."
							: "No registered companies."}
					</p>
				)}
			</section>
		</>
	);
}
