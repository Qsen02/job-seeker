import { motion } from "framer-motion";

interface SlidingAnimationProps {
	children: React.ReactNode;
	className?: string;
}

export default function SlidingAnimation({
	children,
	className,
}: SlidingAnimationProps) {
	return (
		<motion.div
			initial={{ x: 250}}
			animate={{ x: 0}}
			exit={{ x: 250}}
			transition={{ duration: 0.5, ease: "easeIn" }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
