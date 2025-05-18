import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import s from "./RentForm.module.css";
import "./DatePicker.css";
import toast from "react-hot-toast";

const RentForm = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const schema = yup.object({
    name: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    bookingDay: yup
      .date()
      .nullable()
      .min(today, "Past date is not allowed")
      .required("Required"),
    comment: yup.string().required("Required"),
  });

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      bookingDay: null,
      comment: "",
    },
  });

  const onSubmit = (data) => {
    const formattedDate = format(new Date(data.bookingDay), "dd-MM-yyyy");
    const formData = {
      name: data.name,
      email: data.email,
      date: formattedDate,
      comment: data.comment,
    };
    toast.success("Successfully rent a car!");
    reset();
  };

  return (
    <div className={s.formBox}>
      <h3 className={s.formTitle}>Book your car now</h3>
      <p className={s.formText}>
        Stay connected! We are always ready to help you.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.inputWrapper}>
          <input
            {...register("name")}
            className={s.field}
            placeholder="Name*"
          />
          {errors.name && <p className={s.error}>{errors.name.message}</p>}
        </div>

        <div className={s.inputWrapper}>
          <input
            {...register("email")}
            className={s.field}
            placeholder="Email*"
          />
          {errors.email && <p className={s.error}>{errors.email.message}</p>}
        </div>

        <div className={s.inputWrapper}>
          <Controller
            control={control}
            name="bookingDay"
            render={({ field }) => (
              <DatePicker
                className={s.field}
                selected={field.value}
                onChange={field.onChange}
                placeholderText="Booking Date"
                dateFormat="dd/MM/yyyy"
                minDate={today}
              />
            )}
          />
          <p className={s.error}>{errors.bookingDay?.message}</p>
        </div>
        <div className={s.inputWrapper}>
          <input
            {...register("comment")}
            className={s.fieldComment}
            placeholder="Comment"
          />
          <p className={s.errorCom}>{errors.comment?.message}</p>
        </div>

        <button type="submit" className={s.btn}>
          Send
        </button>
      </form>
    </div>
  );
};

export default RentForm;
