import { useGetCompaniesForOwner } from "../../../../hooks/useCompanies";
import type { UserAttributes } from "../../../../types/users";

interface AdminCompaniesProps {
    curUser: UserAttributes | null;
    language: "bg" | "en";
}

export default function AdminCompanies({ curUser, language }: AdminCompaniesProps) { 
    const { companies } = useGetCompaniesForOwner([], curUser?._id);
    return (
		<>
			<h2>
				{language === "bg"
					? "Компании, които сте регистрирали"
					: "Companies you have registered"}
			</h2>
			<section>
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
			</section>
		</>
	);
}