import ErrorMessage from "../../../commons/error_message/ErrorMessage";
import Loader from "../../../commons/loader/Loader";
import { useGetUserById } from "../../../hooks/useUsers";
import { useLanguage } from "../../../store/language";
import { Activity } from "react";
import { useUser } from "../../../store/user";
import UserCandidatures from "./user_candidatures/UserCandidatures";
import AdminCompanies from "./admin_companies/AdminCompanies";
import styles from "./Profile.module.css";
import { Outlet, useNavigate } from "react-router-dom";

export default function Profile() {
	const curUser = useUser((state) => state.user);
	console.log(curUser);
	const { user, setUser, loading, error } = useGetUserById(
		null,
		curUser?._id,
	);
	const language = useLanguage((state) => state.language);
	const navigate = useNavigate();

	return (
		<>
			<Outlet context={{ user, setUser }} />
			{loading && !error ? (
				<Loader />
			) : error ? (
				<ErrorMessage />
			) : (
				<section className={styles.wrapper}>
					<section className={styles.profileInfo}>
						<Activity
							mode={
								user?.profileImage.url.trim()
									? "visible"
									: "hidden"
							}
						>
							<img
								src={user?.profileImage.url}
								alt="Профилна снимка"
							/>
						</Activity>
						<Activity
							mode={
								!user?.profileImage.url.trim()
									? "visible"
									: "hidden"
							}
						>
							<i className="fa-solid fa-circle-user"></i>
						</Activity>
						<h1>{user?.fullName}</h1>
						<Activity
							mode={language === "bg" ? "visible" : "hidden"}
						>
							<p>
								Имейл:{" "}
								<a
									className="link"
									href={`mailto:${user?.email}`}
								>
									{user?.email}
								</a>
							</p>
							<p>
								Телефонен номер:{" "}
								<a
									className="link"
									href={`tel:${user?.phoneNumber}`}
								>
									{user?.phoneNumber}
								</a>
							</p>
						</Activity>
						<Activity
							mode={language === "en" ? "visible" : "hidden"}
						>
							<p>
								Email:{" "}
								<a
									className="link"
									href={`mailto:${user?.email}`}
								>
									{user?.email}
								</a>
							</p>
							<p>
								Phone number:{" "}
								<a
									className="link"
									href={`tel:${user?.phoneNumber}`}
								>
									{user?.phoneNumber}
								</a>
							</p>
						</Activity>
						<div className="buttons">
							<button onClick={() => navigate("/profile/edit")}>
								{language === "bg"
									? "Редактирай профил"
									: "Edit Profile"}
							</button>
							<button
								onClick={() =>
									navigate("/profile/change-password")
								}
							>
								{language === "bg"
									? "Промени парола"
									: "Change Password"}
							</button>
						</div>
					</section>
					<section className={styles.contentWrapper}>
						<Activity
							mode={user?.role === "user" ? "visible" : "hidden"}
						>
							<UserCandidatures
								curUser={user}
								language={language}
							/>
						</Activity>
						<Activity
							mode={user?.role === "admin" ? "visible" : "hidden"}
						>
							<AdminCompanies
								curUser={user}
								language={language}
							/>
						</Activity>
					</section>
				</section>
			)}
		</>
	);
}
