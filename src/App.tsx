import { FC } from "react";
import StopWatch from "./StopWatch";
import Timer from "./Timer";

interface AppProps {}
 
const App: FC<AppProps> = () => {
  return ( 
    <>
      <StopWatch />
      <Timer />
    </>
   );
}
 
export default App;