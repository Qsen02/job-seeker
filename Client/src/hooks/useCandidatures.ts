import { useEffect, useState } from "react";
import { createCandidature, getCandidatureById, getCandidaturesForJob } from "../api/candidatures";
import type { Candidature } from "../types/candidatures";
import { useLoadingError } from "./useLoadingError";

export function useCreateCandidature() {
	return async function (jobId: string | undefined, data: object) {
		return await createCandidature(jobId, data);
	};
}

export function useGetCandidaturesForJob(
	initValues: [],
	jobId: string | undefined,
) {
	const [candidatures, setCandidatures] = useState<Candidature[]>(initValues);
	const { loading, setLoading, error, setError } = useLoadingError();

	useEffect(() => {
		const abortController = new AbortController();
		const { aborted } = abortController.signal;
		(async () => {
			try {
				setLoading(true);
				if (!aborted) {
					const curCandidatures = await getCandidaturesForJob(jobId);
					setCandidatures(curCandidatures);
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
		candidatures,
		loading,
		error,
	};
}

export function useGetCandidatureById(
	initValues: null,
	candidatureId: string | undefined,
) {
	const [candidature, setCandidature] = useState<Candidature | null>(initValues);
	const { loading, setLoading, error, setError } = useLoadingError();

	useEffect(() => {
		const abortController = new AbortController();
		const { aborted } = abortController.signal;
		(async () => {
			try {
				setLoading(true);
				if (!aborted && candidatureId) {
					const curCandidature =
						await getCandidatureById(candidatureId);
					setCandidature(curCandidature);
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
			}
		})();

		return () => abortController.abort();
	}, [candidatureId]);

	return {
		candidature,
		setCandidature,
		loading,
		error,
	};
}
