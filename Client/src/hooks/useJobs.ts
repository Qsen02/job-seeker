import { useEffect, useState } from "react";
import type { Job } from "../types/jobs";
import { useLoadingError } from "./useLoadingError";
import { paginateJobs } from "../api/jobs";

export function useGetAllJobs(
	initValues: [],
	filter: "type" | "level" | "",
	value: string,
) {
	const [jobs, setJobs] = useState<Job[]>(initValues);
	const { loading, setLoading, error, setError } = useLoadingError();
	const [page, setPage] = useState(1);
	const [maxPages, setMaxPages] = useState(1);

	useEffect(() => {
		const abortController = new AbortController();
		const { aborted } = abortController.signal;
		(async () => {
			try {
				setLoading(true);
				if (!aborted) {
					const curJobs = await paginateJobs(page, filter, value);
					setJobs(curJobs.jobs);

					setMaxPages(curJobs.totalPages);
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
			}
		})();

		return () => abortController.abort();
	}, [filter, value, page]);

	return {
		jobs,
		loadingJobs: loading,
		errorJobs: error,
		page,
		setPage,
		maxPages,
	};
}
