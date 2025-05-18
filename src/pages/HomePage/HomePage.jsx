import { NavLink } from "react-router";
import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={s.hero}>
      <div className={s.heroInfo}>
        <h1 className={s.title}>Find your perfect rental car</h1>
        <p className={s.heroText}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <div className={s.btnBox}>
          <NavLink to="/catalog" className={s.button}>
            View Catalog
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
