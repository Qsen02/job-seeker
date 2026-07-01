import { useEffect, useState } from "react";
import type { Job } from "../types/jobs";
import { useLoadingError } from "./useLoadingError";
import { createJob, deleteJob, editJob, getJobById, getJobsForUser, paginateJobs } from "../api/jobs";

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

export function useCreateJob() {
	return async function (companyId: string | undefined, data: object) {
		return await createJob(companyId, data);
	};
}

export function useGetJobById(initValues: null, jobId: string | undefined) {
	const [job, setJob] = useState<Job | null>(initValues);
	const { loading, setLoading, error, setError } = useLoadingError();

	useEffect(() => {
		const abortController = new AbortController();
		const { aborted } = abortController.signal;
		(async () => {
			try {
				setLoading(true);
				if (!aborted && jobId) {
					const curJob = await getJobById(jobId);
					setJob(curJob);
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
			}
		})();

		return () => abortController.abort();
	}, [jobId]);

	return {
		job,
		setJob,
		loading,
		error,
	};
}

export function useDeleteJob() {
	return async function (companyId:string | undefined,jobId: string | undefined) {
		return await deleteJob(companyId,jobId);
	};
}

export function useEditJob() {
	return async function (
		jobId: string | undefined,
		data: object,
	) {
		return await editJob(jobId, data);
	};
}

export function useGetJobsForUser(initValues: [], userId: string | undefined) {
	const [jobs, setJobs] = useState<Job[]>(initValues);
	const { loading, setLoading, error, setError } = useLoadingError();

	useEffect(() => {
		const abortController = new AbortController();
		const { aborted } = abortController.signal;
		(async () => {
			try {
				setLoading(true);
				if (!aborted) {
					const curJobs = await getJobsForUser(userId);
					setJobs(curJobs);
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
			}
		})();

		return () => abortController.abort();
	}, [userId]);

	return {
		jobs,
		setJobs,
		loading,
		error,
	};
}

