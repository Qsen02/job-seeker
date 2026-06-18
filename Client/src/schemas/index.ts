import * as yup from "yup";

export const registerSchema = (language: "bg" | "en") =>
	yup.object().shape({
		fullName: yup
			.string()
			.min(
				3,
				language === "bg"
					? "Името и фамилията трябва да бъдат с дължина поне 3 символа!"
					: "First name and last name must be at least 3 symbols long!",
			)
			.required(
				language === "bg"
					? "Името и фамилията са задължителни!"
					: "First name and last name are required!",
			),
		email: yup
			.string()
			.email(
				language === "bg"
					? "Имейла трябва да бъде валиден!"
					: "Email must be valid!",
			)
			.required(
				language === "bg"
					? "Имейла е задължителен!"
					: "Email is required!",
			),
		phoneNumber: yup
			.string()
			.matches(
				/^(\+359|0)(87|88|89)\d{7}$/,
				language === "bg"
					? "Телефонния номер трябва да е във валиден формат!"
					: "Phone number must be in valid format!",
			)
			.required(
				language === "bg"
					? "Телефонния номер е задължителен!"
					: "Phone number is required!",
			),
		password: yup
			.string()
			.matches(
				/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
				language === "bg"
					? "Паролата трябва да бъде с дължина поне 6 символа и да съдържа поне една главна буква, цифра и специален символ!"
					: "Password must be at least 6 symbols long and must contain digits, captial letter and special symbol!",
			)
			.required(
				language === "bg"
					? "Паролата е задължителна!"
					: "Password is required!",
			),
		repass: yup
			.string()
			.oneOf(
				[yup.ref("password")],
				language === "bg"
					? "Паролите трябва да съвпадат!"
					: "Passwords must match!",
			)
			.required(
				language === "bg"
					? "Паролите са задължителни!"
					: "Passwords are required!",
			),
	});
