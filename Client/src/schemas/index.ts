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

export const loginSchema = (language: "bg" | "en") =>
	yup.object().shape({
		email: yup
			.string()
			.email(
				language === "bg"
					? "Имейла или паролата не съвпадат!"
					: "Email or password don't match!",
			)
			.required(
				language === "bg"
					? "Имейла е задължителен!"
					: "Email is required!",
			),
		password: yup
			.string()
			.matches(
				/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
				language === "bg"
					? "Имейла или паролата не съвпадат!"
					: "Email or password don't match!",
			)
			.required(
				language === "bg"
					? "Паролата е задължителна!"
					: "Password is required!",
			),
	});

export const companySchema = (language: "en" | "bg") =>
	yup.object().shape({
		name: yup
			.string()
			.min(
				3,
				language === "bg"
					? "Името трябва да бъде с дължина поне 3 символа!"
					: "Name must be at least 3 symbols long!",
			)
			.required(
				language === "bg"
					? "Името е задължително!"
					: "Name is required!",
			),
		description: yup
			.string()
			.min(
				10,
				language === "bg"
					? "Описание трябва да бъде с дължина поне 10 символа!"
					: "Description must be at least 10 symbols long!",
			)
			.required(
				language === "bg"
					? "Описание е задължително!"
					: "Description is required!",
			),
		location: yup
			.string()
			.min(
				5,
				language === "bg"
					? "Локацията трябва да бъде с дължина поне 5 символа!"
					: "Location must be at least 5 symbols long!",
			)
			.required(
				language === "bg"
					? "Локацията е задължително!"
					: "Location is required!",
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
		phone: yup
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
		address: yup
			.string()
			.min(
				5,
				language === "bg"
					? "Адреса трябва да бъде с дължина поне 5 символа!"
					: "Address must be at least 5 symbols long!",
			)
			.required(
				language === "bg"
					? "Адреса е задължително!"
					: "Address is required!",
			),
	});

export const jobSchema = (language: "bg" | "en") =>
	yup.object().shape({
		title: yup
			.string()
			.min(
				3,
				language === "bg"
					? "Заглавието трябва да е поне 3 символа дълго!"
					: "Title must be at least 3 symbols long!",
			)
			.required(
				language === "bg"
					? "Заглавието е задължително!"
					: "Title is required!",
			),
		description: yup
			.string()
			.min(
				10,
				language === "bg"
					? "Описанието трябва да е поне 10 символа дълго!"
					: "Description must be at least 10 symbols long!",
			)
			.required(
				language === "bg"
					? "Описанието е задължително!"
					: "Description is required!",
			),
		level: yup
			.string()
			.oneOf(
				["junior", "mid", "senior"],
				language === "bg"
					? "Нивото трябва да е  junior, mid или senior!"
					: "Level must be junior, mid or senior!",
			)
			.required(
				language === "bg"
					? "Нивото е задължително!"
					: "Level is required!",
			),
		type: yup
			.string()
			.oneOf(
				["remote", "on-site", "hybrid"],
				language === "bg"
					? "Типа трябва да е онлайн, на място или хибриден!"
					: "Type must be remote, on-site or hybrid!",
			)
			.required(
				language === "bg"
					? "Типа е задължително!"
					: "Type is required!",
			),
		salary: yup
			.number()
			.min(
				0,
				language === "bg"
					? "Заплата трябва да е цяло положително число!"
					: "Salary must be positive integer number!",
			)
			.required(
				language === "bg"
					? "Заплатата е задължителна!"
					: "Salary is required!",
			),
	});
