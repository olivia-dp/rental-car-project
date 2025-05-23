import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllCarsThunk } from "../../../redux/cars/operations";
import {
  isCarsError,
  isCarsLoading,
  selectCars,
  selectFilters,
  selectPage,
  selectTotal,
} from "../../../redux/cars/selectors";
import { setPage, resetCars } from "../../../redux/cars/slice";
import CarsListItem from "../CarsListItem/CarsListItem";
import s from "./CarsList.module.css";
import Loader from "../../Loader/Loader";

const CarsList = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const isLoading = useSelector(isCarsLoading);
  const isError = useSelector(isCarsError);
  const page = useSelector(selectPage);
  const total = useSelector(selectTotal);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(resetCars());
  }, [dispatch, filters]);
  
  useEffect(() => {
    dispatch(fetchAllCarsThunk({ page, filters }));
  }, [dispatch, page, filters]);
  
  const handleChangePage = () => {
    if (!isLoading && page < total) {
      dispatch(setPage(page + 1));
    }
  };
  return (
    <div className={s.listContainer}>
      {isError && <h2>Something went wrong!</h2>}

      <ul className={s.list}>
        {cars.map((item) => (
          <li key={item.id} className={s.listItem}>
            <CarsListItem item={item} />
          </li>
        ))}
      </ul>

      {isLoading && <Loader />}

      {!isLoading && cars.length === 0 && (
        <p className={s.noMatches}>No matches found</p>
      )}

      {cars.length > 0 && page < total && !isLoading && (
        <button onClick={handleChangePage} className={s.btn}>
          Load more
        </button>
      )}
    </div>
  );
};

export default CarsList;
