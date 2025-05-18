import { useDispatch, useSelector } from "react-redux";
import s from "./CarsListItem.module.css";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../redux/favorite/slice";
import { selectIsFavorite } from "../../../redux/favorite/selectors";
import { NavLink } from "react-router";

const CarsListItem = ({ item }) => {
  const dispatch = useDispatch();
  const isActive = useSelector(selectIsFavorite(item.id));

  const toggleIcon = () => {
    if (isActive) {
      dispatch(removeFromFavorites(item.id));
    } else {
      dispatch(addToFavorites(item));
    }
  };

  return (
    <div className={s.card}>
      <div>
        <div onClick={toggleIcon}>
          {!isActive ? (
            <svg className={s.iconLike}>
              <use href={"/public/symbol-defs.svg#icon-like"} />
            </svg>
          ) : (
            <svg className={s.active}>
              <use href={"/public/symbol-defs.svg#icon-like-active"} />
            </svg>
          )}
        </div>

        <div className={s.imgBox}>
          <img src={item.img} alt={item.model} className={s.img} />
        </div>

        <div>
          <div className={s.modelBox}>
            <p className={s.modelText}>
              {item.brand} <span className={s.modelAccent}>{item.model}</span>,{" "}
              {item.year}{" "}
            </p>
            <p className={s.modelPrice}>${item.rentalPrice}</p>
          </div>
          <ul className={s.infoBox}>
            <li className={s.infoText}>{item.address.split(",")[1]?.trim()}</li>
            <li className={s.infoText}>{item.address.split(",")[2]?.trim()}</li>
            <li className={s.infoText}>{item.rentalCompany}</li>
            <li className={s.grouped}>
              <span className={s.infoText}>{item.type}</span>
              <span className={s.infoText}>
                {item.mileage.toLocaleString("en-US").replace(",", " ")} km
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <NavLink to={`/catalog/${item.id}`} className={s.btn}>
          Read more
        </NavLink>
      </div>
    </div>
  );
};

export default CarsListItem;
