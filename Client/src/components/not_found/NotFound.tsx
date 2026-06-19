import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../store/language";
import styles from "./NotFound.module.css";

export default function NotFound() {
	const language = useLanguage((state) => state.language);
	const navigate = useNavigate();

	return (
		<section className={styles.wrapper}>
			<h1>404</h1>
			<p>
				{language === "bg"
					? "Страницата, която търсите не е намерена"
					: "Page that you are looking for not found"}
			</p>
			<div className="buttons">
				<button onClick={() => navigate("/")}>
					{language === "bg" ? "Начало" : "Home"}
				</button>
			</div>
		</section>
	);
}
