import { API_JOBS_URL, BASE_URL } from "./paths-config";


const defaultConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}


const apiSettings = {
    fetchJobsDefault: async() => {
        const endpoint = API_JOBS_URL;
        return await (await fetch(endpoint)).json();
    },
    fetchJob: async jobId => {
        const endpoint = `${BASE_URL}jobs/${jobId}`;
        return await (await fetch(endpoint)).json();
    },
    fetchBidsForJob: async (jobId) => {
        const endpoint = `${API_JOBS_URL}${jobId}/bids/`;
        return await (await fetch(endpoint)).json();
    } 
}

export default apiSettings;


