import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchCarById } from "../../redux/cars/operations";
import {
  isCarsError,
  isCarsLoading,
  selectSelectedCar,
} from "../../redux/cars/selectors";
import { clearSelectedCar } from "../../redux/cars/slice";
import s from "./CarInfo.module.css";
import { SlLocationPin } from "react-icons/sl";
import RentForm from "../RentForm/RentForm";
import Loader from "../Loader/Loader";

const CarInfo = () => {
  const { carId } = useParams();
  const dispatch = useDispatch();

  const car = useSelector(selectSelectedCar);
  const isLoading = useSelector(isCarsLoading);
  const isError = useSelector(isCarsError);

  useEffect(() => {
    if (carId) {
      dispatch(fetchCarById({ id: carId }));
    }
    return () => {
      dispatch(clearSelectedCar());
    };
  }, [dispatch, carId]);

  if (isLoading) return <Loader />;
  if (isError) return <p>Something went wrong!</p>;
  if (!car) return <p>No car data available.</p>;

  return (
    <div className={s.container}>
      <div>
        <div className={s.imgBox}>
          <img src={car.img} alt={car.model} className={s.img} />
        </div>
        <RentForm />
      </div>
      <div>
        <div className={s.titleBox}>
          <h3 className={s.title}>
            {car.brand} {car.model}, {car.year}
          </h3>
          <p className={s.id}>id: {car.id}</p>
        </div>
        <div className={s.locationBox}>
          <p className={s.infoText}>
            {" "}
            <SlLocationPin width={16} height={16} />{" "}
            {car.address.split(",")[1]?.trim()}{" "}
            {car.address.split(",")[2]?.trim()}
          </p>
          <p className={s.infoText}>
            Mileage: {car.mileage.toLocaleString("en-US").replace(",", " ")}
          </p>
        </div>
        <p className={s.price}>${car.rentalPrice}</p>
        <p className={s.description}>{car.description}</p>
        <div className={s.conditions}>
          <h3 className={s.titleCond}>Rental Conditions: </h3>
          <ul>
            {car.rentalConditions.map((item, index) => (
              <li key={index} className={s.listItem}>
                <svg className={s.icon}>
                  <use href="/symbol-defs.svg#icon-check-circle" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={s.specifBox}>
          <h3 className={s.titleCond}>Car Specification: </h3>
          <ul>
            <li className={s.listItem}>
              <svg className={s.icon}>
                <use href="/symbol-defs.svg#icon-calendar" />
              </svg>
              Year: {car.year}
            </li>
            <li className={s.listItem}>
              <svg className={s.icon}>
                <use href="/symbol-defs.svg#icon-car" />
              </svg>
              Type: {car.type}
            </li>
            <li className={s.listItem}>
              <svg className={s.icon}>
                <use href="/symbol-defs.svg#icon-fuel-pump" />
              </svg>
              Fuel Consumption: {car.fuelConsumption}
            </li>
            <li className={s.listItem}>
              <svg className={s.icon}>
                <use href="/symbol-defs.svg#icon-gear" />
              </svg>
              Engine size: {car.engineSize}
            </li>
          </ul>
        </div>
        <div className={s.specifBox}>
          <h3 className={s.titleCond}>Accessories and functionalities: </h3>
          <ul>
            {[...car.functionalities, ...car.accessories].map((item, index) => (
              <li key={index} className={s.listItem}>
                <svg className={s.icon}>
                  <use href="/symbol-defs.svg#icon-check-circle" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarInfo;
