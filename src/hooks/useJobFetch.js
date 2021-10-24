import { useState, useEffect } from "react";
import API from '../API';
//helpers
import { isPersistedState } from "../helpers";

export const useJobFetch = jobId => {
    const[state, setState] = useState({});
    const[loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    //potentially re-renderring code
    useEffect(()=> {
        //get movie
        const fetchJob = async () => {
          try {
            setLoading(true);
            setError(false);

            const job = await API.fetchJob(jobId);

            setState({
                ...job
            });

            setLoading(false);
          }
          catch(error){
              setError(true);
          }
        };

        //if already in session just pick that
        // const sessionState = isPersistedState(jobId);

        // if(sessionState){
        //     setState(sessionState);
        //     setLoading(false);
        //     return;
        // }

        //if not found do the actual fetch 
        fetchJob();
    }, [jobId]);


    //write to sessionstorage
    // useEffect(() => {
    //     sessionStorage.setItem(jobId, JSON.stringify(state));
    // }, [jobId, state])

    return {state, loading, error}

}




