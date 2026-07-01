import { useEffect, useState } from "react";
import type { Company } from "../types/companies";
import { useLoadingError } from "./useLoadingError";
import {
	createCompany,
	deleteCompany,
	editCompany,
	getAllCompanies,
	getCompaniesForOwner,
	getCompanyById,
} from "../api/companies";

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
	};
}

export function useGetCompanyById(
	initValues: null,
	companyId: string | undefined,
) {
	const [company, setCompany] = useState<Company | null>(initValues);
	const { loading, setLoading, error, setError } = useLoadingError();

	useEffect(() => {
		const abortController = new AbortController();
		const { aborted } = abortController.signal;
		(async () => {
			try {
				setLoading(true);
				if (!aborted && companyId) {
					const curCompany = await getCompanyById(companyId);
					setCompany(curCompany);
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
			}
		})();

		return () => abortController.abort();
	}, [companyId]);

	return {
		company,
		setCompany,
		loading,
		error,
	};
}

export function useDeleteCompany() {
	return async function (companyId: string | undefined) {
		return await deleteCompany(companyId);
	};
}

export function useEditCompany() {
	return async function (companyId: string | undefined, data: object) {
		return await editCompany(companyId, data);
	};
}

export function useGetCompaniesForOwner(initValues: [],ownerId: string | undefined) {
	const [companies, setCompanies] = useState<Company[]>(initValues);
	const { loading, setLoading, error, setError } = useLoadingError();

	useEffect(() => {
		const abortController = new AbortController();
		const { aborted } = abortController.signal;
		(async () => {
			try {
				setLoading(true);
				if (!aborted && ownerId) {
					const curCompanies = await getCompaniesForOwner(ownerId);
					setCompanies(curCompanies);
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
			}
		})();

		return () => abortController.abort();
	}, [ownerId]);

	return {
		companies,
		loading,
		error,
	};
}