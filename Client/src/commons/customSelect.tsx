import { useField } from "formik";

interface CustomInputProps {
	label?: string;
	name: string;
	className?: string;
	value?: string;
	id: string;
	placeholder?: string;
	children: React.ReactNode;
	defaultOption: string;
	required?: boolean;
}

export default function CustomSelect({
	label,
	children,
	defaultOption,
	required,
	...props
}: CustomInputProps) {
	const [field, meta] = useField(props);
	return (
		<>
			{label ? (
				<div>
					<label htmlFor={props.id}>{label}</label>
					{required ? <span className="star">*</span> : ""}
				</div>
			) : (
				""
			)}
			<select {...field} {...props}>
				<option value="default">{defaultOption}</option>
				{children}
			</select>
			{meta.error && meta.touched ? (
				<p className="inputError">{meta.error}</p>
			) : (
				""
			)}
		</>
	);
}
