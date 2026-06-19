import { useEffect, useState } from "react";
import type { Company } from "../types/companies";
import { useLoadingError } from "./useLoadingError";
import { createCompany, getAllCompanies } from "../api/companies";

export function useGetAllCompanies(initValues: []) {
	const [companies, setCompanies] = useState<Company[]>(initValues);
	const { loading, setLoading, error, setError } = useLoadingError();

	useEffect(() => {
		const abortController = new AbortController();
		const { aborted } = abortController.signal;
		(async () => {
			try {
				setLoading(true);
				if (!aborted) {
					const curCompanies = await getAllCompanies();
					setCompanies(curCompanies);
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
			}
		})();

		return () => abortController.abort();
	}, []);

	return {
		companies,
		loadingCompanies: loading,
		errorCompanies: error,
	};
}

export function useCreateCompany() { 
	return async function (data: object) { 
		return await createCompany(data);
	}
}
