import { PropagateLoader } from "react-spinners";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.container}>
      <PropagateLoader color="#2046e6" loading size={30} />
    </div>
  );
};
export default Loader;
