import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchAllCarsThunk } from "../../../redux/cars/operations";
import {
  isCarsError,
  isCarsLoading,
  selectCars,
  selectFilters,
  selectPage,
  selectTotal,
} from "../../../redux/cars/selectors";
import { setPage } from "../../../redux/cars/slice";
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


  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      dispatch(fetchAllCarsThunk({ page, filters }));
      isFirstLoad.current = false;
    }
  }, [dispatch]);

  const handleChangePage = () => {
    if (!isLoading) {
      dispatch(setPage(page + 1));
    }
  };


  useEffect(() => {
    if (!isFirstLoad.current) {
      dispatch(fetchAllCarsThunk({ page, filters }));
    }
  }, [page, dispatch, filters]);

  return (
    <div className={s.listContainer}>
      <ul className={s.list}>
        {cars.map((item) => (
          <li key={item.id} className={s.listItem}>
            <CarsListItem item={item} />
          </li>
        ))}
      </ul>

      {cars.length > 0 && page < total && (
        !isLoading ? (
          <button onClick={handleChangePage} className={s.btn}>
            Load more
          </button>
        ) : (
          <Loader />
        )
      )}

      {isError && <h2>Something went wrong!</h2>}
    </div>
  );
};

export default CarsList;