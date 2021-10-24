import { useState, useEffect } from "react";
import API from '../API';

export const useBidsFetch = jobId => {
  const[state, setState] = useState({});
  const[loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(()=>{
    const fetchBidsForJob = async () => {
      try{
        setLoading(true);
        setError(false);

        const bids = await API.fetchBidsForJob(jobId);

        setState({
          ...bids
        });

        setLoading(false);

      }
      catch(error){
        setError(true);
      }
    };

    fetchBidsForJob();
  }, [jobId]);


  return { state, loading, error };

}

















