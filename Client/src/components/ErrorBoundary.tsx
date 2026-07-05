import { Component, type ReactNode } from "react";
import ErrorBoundaryMessage from "../commons/error_boundary_message/ErrorBoundaryMessage";

interface ErrorBoundaryProps {
	children: React.ReactNode;
}

interface ErrorBoundaryStateProps {
	hasError: boolean;
	message?: string;
}

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryStateProps
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);

		this.state = {
			hasError: false,
		};
	}

	static getDerivedStateFromError(err: unknown) {
		if (err instanceof Error) {
			return {
				hasError: true,
				message: err.message,
			};
		} else {
			return {
				hasError: true,
				message: "Error occurd!",
			};
		}
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return <ErrorBoundaryMessage />;
		}

		return this.props.children;
	}
}
