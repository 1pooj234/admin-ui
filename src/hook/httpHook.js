import { useCallback, useState } from "react";

const HttpHook = () => {
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(false);
  const sendRequest = useCallback(async (requestConfigs, applyFunc) => {
    setLoading(true);
    try {
      const response = await fetch(requestConfigs.url, {
        method: requestConfigs.method ? requestConfigs.method : "GET",
        headers: requestConfigs.headers ? requestConfigs.headers : {},
        body: requestConfigs.body ? JSON.stringify(requestConfigs.body) : null,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      applyFunc(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  }, []);
  return {
    sendRequest,
    status: loading,
    err,
  };
};

export default HttpHook;
