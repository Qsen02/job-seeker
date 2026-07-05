import { useHideScroller } from "../../hooks/useLoadingError";
import { useLanguage } from "../../store/language";
import styles from "./ErrorMessage.module.css";

export default function ErrorMessage() {
	const language = useLanguage((state) => state.language);
	useHideScroller();

	return (
		<div className="loader-modal">
			<p className={styles.message}>
				{language === "bg"
					? "Сървърът не отговаря, моля опитайте по-късно"
					: "Server is not responding, please try again later"}
			</p>
		</div>
	);
}
