import { useField } from "formik";

interface CustomInputProps {
	label?: string;
	name: string;
	type: string;
	className?: string;
	value?: string;
	id?: string;
	placeholder?: string;
	encType?: string;
	autoComplete?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
}

export default function CustomInput({
	label,
	onChange,
	required,
	...props
}: CustomInputProps) {
	const [field, meta, helpers] = useField(props);
	function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0] || null;
		helpers.setValue(file);
		if (onChange) onChange(e);
	}
	const inputProps =
		props.type === "file"
			? {
					name: props.name,
					id: props.id,
					type: "file",
					onChange: changeHandler,
				}
			: {
					...field,
					...props,
					onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
						field.onChange(e);
						if (onChange) onChange(e);
					},
				};
	return (
		<>
			{label ? (
				<div>
					<label htmlFor={props.id}>{label}</label>
					{required ? <span>*</span> : ""}
				</div>
			) : (
				""
			)}
			<input {...inputProps} />
			{meta.error && meta.touched ? (
				<p className="inputError">{meta.error}</p>
			) : (
				""
			)}
		</>
	);
}
