import { useField } from "formik";

interface CustomTextareaProps {
	label?: string;
	name: string;
	className?: string;
	value?: string;
	id?: string;
	placeholder?: string;
	encType?: string;
	autoComplete?: string;
	required?: boolean;
}

export default function CustomTextarea({
	label,
	required,
	...props
}: CustomTextareaProps) {
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
            <textarea {...field} {...props}></textarea>
			{meta.error && meta.touched ? (
				<p className="inputError">{meta.error}</p>
			) : (
				""
			)}
		</>
	);
}
