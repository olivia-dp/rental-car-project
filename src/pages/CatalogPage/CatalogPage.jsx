import CarsList from "../../components/CarsList/CarsList/CarsList";
import FilterBar from "../../components/FilterBar/FilterBar";
import s from "./CatalogPage.module.css";

const CatalogPage = () => {
  return (
    <div className={s.container}>
      <FilterBar />
      <CarsList />
    </div>
  );
};

export default CatalogPage;
