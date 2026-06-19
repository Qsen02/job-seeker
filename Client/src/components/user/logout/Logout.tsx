import { Activity, useState } from "react";
import { useLanguage } from "../../../store/language";
import { useUser } from "../../../store/user";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useUsers";

export default function Logout() {
	const language = useLanguage((state) => state.language);
	const [logouting, setLogouting] = useState(false);
	const setUser = useUser((state) => state.setUserState);
	const navigate = useNavigate();
	const [isErr, setIsErr] = useState(false);
	const logout = useLogout();

	async function onLogout() {
        try {
            setLogouting(true);

            setUser(null);
			await logout();
            navigate("/");
            
            setLogouting(false)
		} catch (err) {
			setLogouting(false);
			setIsErr(true);
			return;
		} finally {
			setLogouting(false);
		}
	}

	return (
		<section className="choise-modal">
			<p>
				{language === "bg"
					? "Сигурен ли си че искаш да излезеш от акаунта си?"
					: "Are you sure you want to quit from your account?"}
			</p>
			<Activity mode={isErr ? "visible" : "hidden"}>
				<p className="inputError">
					{language === "bg"
						? "Появи се грешка при излизането от акаунта"
						: "Error occured while quit the account"}
				</p>
			</Activity>
			<div className="buttons">
				<Activity mode={logouting ? "visible" : "hidden"}>
					<button>
						{language === "bg" ? "Излизане" : "Exiting"}{" "}
						<span className="normal-loader"></span>
					</button>
				</Activity>
				<Activity mode={!logouting ? "visible" : "hidden"}>
					<button onClick={onLogout}>
						{language === "bg" ? "Да" : "Yes"}
					</button>
				</Activity>
				<button onClick={() => history.back()} disabled={logouting}>
					{language === "bg" ? "Не" : "No"}
				</button>
			</div>
		</section>
	);
}
