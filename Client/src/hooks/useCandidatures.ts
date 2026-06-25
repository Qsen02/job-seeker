import { createCandidature } from "../api/candidatures"

export function useCreateCandidature() { 
    return async function (jobId: string | undefined, data: object) { 
        return await createCandidature(jobId, data);
    }
}