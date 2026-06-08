import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { setTokenFn } from "./lib/api";

const App = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    setTokenFn(getToken);
  }, [getToken]);

  return <div>Venda</div>;
};

export default App;
