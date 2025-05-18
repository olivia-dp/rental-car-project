import { NavLink } from "react-router";
import clsx from "clsx";
import s from "./Navigation.module.css";
import { resetFilters } from "../../redux/cars/slice";
import { useDispatch } from "react-redux";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
  const dispatch = useDispatch();
  return (
    <header className={s.header}>
      <div>
        <svg className={s.logo}>
          <use href="/symbol-defs.svg#icon-logo"></use>
        </svg>
      </div>
      <nav className={s.nav}>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/catalog" onClick={() => dispatch(resetFilters())}>
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
