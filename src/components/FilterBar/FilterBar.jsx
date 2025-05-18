import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { isCarsLoading, selectedBrands } from "../../redux/cars/selectors";
import { useEffect, useMemo, useState } from "react";
import { setPage, setFilters } from "../../redux/cars/slice";
import { getBrands } from "../../redux/cars/operations";
import Select from "react-select";
import s from "./FilterBar.module.css";
import Loader from "../Loader/Loader";

const FilterBar = () => {
  const brands = useSelector(selectedBrands);
  const dispatch = useDispatch();
  const [menuIsOpenBrand, setMenuIsOpenBrand] = useState(false);
  const [menuIsOpenPrice, setMenuIsOpenPrice] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const isLoading = useSelector(isCarsLoading);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const brandOptions = useMemo(
    () =>
      brands.map((brand) => ({
        value: typeof brand === "string" ? brand : brand.name,
        label: typeof brand === "string" ? brand : brand.name,
      })),
    [brands],
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      brand: "",
      price: "",
      mileageFrom: "",
      mileageTo: "",
      category: null,
    },
  });

  const onSubmit = (data) => {
    const filters = {
      brand: data.brand?.value || data.brand || undefined,
      minMileage: data.mileageFrom || undefined,
      maxMileage: data.mileageTo || undefined,
      rentalPrice: data.rentalPrice?.value || undefined,
    };

    dispatch(setFilters(filters));
    dispatch(setPage(1));
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      background: "var(--inputs)",
      border: "1px solid var(--inputs);",
      borderRadius: "12px",
      width: "204px",
      height: "44px",
      boxShadow: "none",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "125%",
      color: "var(--main)",
      padding: "0 16px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#333",
      fontSize: "16px",
    }),
    menu: (base) => ({
      ...base,
      boxShadow: "0 4px 12px rgba(0,0,0,.1)",
      width: "204px",
      height: "272px",
      paddingRight: "6px",
    }),
    menuList: (base) => ({
      ...base,
      borderRadius: "12px",
      padding: "14px 0",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "125%",
      color: "var(--gray)",
      height: "272px",
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? "#f0f0f0" : "white",
      color: state.isSelected ? "var(--main)" : "var(--grey)",
    }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  const priceOptions = [
    { value: "30", label: "30" },
    { value: "40", label: "40" },
    { value: "50", label: "50" },
    { value: "60", label: "60" },
    { value: "70", label: "70" },
    { value: "80", label: "80" },
  ];

  const formatWithLabel = (value, label) =>
    value ? `${label} ${new Intl.NumberFormat("en-US").format(value)}` : "";

  const unformat = (value) => value.replace(/[^\d]/g, "");

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        {isChecked && (
          <div className={s.selectBox}>
            <label className={s.label}>Car brand</label>
            <Controller
              name="brand"
              className={s.field}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  classNamePrefix="custom-select"
                  styles={customStyles}
                  options={brandOptions}
                  placeholder="Select a brand"
                  onMenuOpen={() => setMenuIsOpenBrand(true)}
                  onMenuClose={() => setMenuIsOpenBrand(false)}
                  components={{
                    DropdownIndicator: () =>
                      menuIsOpenBrand ? (
                        <svg className={s.iconSelect}>
                          <use href="/symbol-defs.svg#icon-up-arrow" />
                        </svg>
                      ) : (
                        <svg className={s.iconSelect}>
                          <use href="/symbol-defs.svg#icon-down-arrow" />
                        </svg>
                      ),
                  }}
                />
              )}
            />
          </div>
        )}

        <div className={s.selectBox}>
          <label className={s.label}>Price/1 hour</label>
          <Controller
            name="rentalPrice"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                classNamePrefix="custom-select"
                styles={{
                  ...customStyles,
                  menuList: (base) => ({
                    ...customStyles.menuList(base),
                    height: "188px",
                  }),
                  menu: (base) => ({
                    ...customStyles.menu(base),
                    height: "188px",
                  }),
                }}
                options={priceOptions}
                formatOptionLabel={(option, { context }) =>
                  context === "menu" ? option.label : `to $${option.value}`
                }
                placeholder="Choose a price"
                onMenuOpen={() => setMenuIsOpenPrice(true)}
                onMenuClose={() => setMenuIsOpenPrice(false)}
                components={{
                  DropdownIndicator: () =>
                    menuIsOpenPrice ? (
                      <svg className={s.iconSelect}>
                        <use href="/symbol-defs.svg#icon-up-arrow" />
                      </svg>
                    ) : (
                      <svg className={s.iconSelect}>
                        <use href="/symbol-defs.svg#icon-down-arrow" />
                      </svg>
                    ),
                }}
              />
            )}
          />
        </div>

        <div className={s.inputMileage}>
          <label className={s.label}>Car mileage / km</label>
          <div className={s["range-inputs"]}>
            <Controller
              name="mileageFrom"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="From"
                  value={formatWithLabel(field.value, "From")}
                  onFocus={(e) => {
                    const raw = unformat(e.target.value);
                    e.target.value = raw;
                  }}
                  onBlur={(e) => {
                    const raw = unformat(e.target.value);
                    field.onChange(raw);
                  }}
                  onChange={(e) => field.onChange(unformat(e.target.value))}
                />
              )}
            />
            <Controller
              name="mileageTo"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="To"
                  value={formatWithLabel(field.value, "To")}
                  onFocus={(e) => {
                    const raw = unformat(e.target.value);
                    e.target.value = raw;
                  }}
                  onBlur={(e) => {
                    const raw = unformat(e.target.value);
                    field.onChange(raw);
                  }}
                  onChange={(e) => field.onChange(unformat(e.target.value))}
                />
              )}
            />
          </div>
        </div>

        <button type="submit" className={s.btn}>
          Search
        </button>
      </form>
      {isLoading && <Loader />}
    </div>
  );
};

export default FilterBar;
