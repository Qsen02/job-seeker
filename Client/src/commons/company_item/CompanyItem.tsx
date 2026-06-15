import { Link } from "react-router-dom";
import styles from "./CompanyItem.module.css";
import { logoErrorHandler } from "../../utils/error_images";

interface CompanyItemProps {
	id: string;
	logo: string;
	name: string;
}

export default function CompanyItem({ id, logo, name }: CompanyItemProps) {
	return (
		<Link to={`/companies/${id}`}>
			<article className={styles.wrapper}>
				<img
					src={logo.trim() || "/images/alt-company-image.jpg"}
					alt="Лого на фирма"
					onError={logoErrorHandler}
				/>
				<p>{name}</p>
			</article>
		</Link>
	);
}
