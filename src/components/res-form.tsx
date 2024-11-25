"use client";
import React, { useRef, useState } from "react";
import { SelectField } from "./formItems/SelectField";
import { Resume } from "./formItems/Resume";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Button, TextField } from "@mui/material";
// import { PersianDatePicker } from "./formItems/PersianDatePicker(old)";
import { PersianDatePicker } from "./formItems/PersianDatePicker";
// import { FormFields } from "@/types/formType";
import { Snackbar } from "@mui/material";
import Header from "./Header";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

// Schema Validation
const formSchema = z.object({
  fullName: z.string().min(1, "نام و نام خانوادگی الزامی است"),
  phone: z
    .string()
    .regex(/^09\d{9}$/, "شماره تلفن نامعتبر است")
    .min(11, "شماره تلفن باید 11 رقم باشد"),
  email: z.string().email("ایمیل نامعتبر است"),
  date: z.string().min(1, "تاریخ تولد الزامی است"),
  // date: z.string().datetime("تاریخ تولد الزامی است"),
  militaryStatus: z.string().min(1, "وضعیت نظام وظیفه الزامی است"),
  gender: z.string().min(1, "جنسیت الزامی است"),
  // files: z.string().min(1, "رزومه الزامی است"),
  // files: z.any().refine((file) => file, "رزومه الزامی است"),
  files: z.array(z.string()).min(1, "رزومه الزامی است"),
});

type FormFields = z.infer<typeof formSchema>;

const ResForm = (props: Props) => {
  const [showSnackbar, setSnacknar] = useState(false);
  const handleSnackbarOpen = () => {
    setSnacknar(true);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return; // Prevent closing when clicking outside
    }
    setSnacknar(false);
  };
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormFields>({
    // defaultValues:
    // { email: "soheilfarrokh1main@gmail.com" },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
      .then(() => {
        console.log(data);
        handleSnackbarOpen(); // Show the snackbar on success
        reset();
      })
      .catch((err) => console.log(err));
  };

  const militaryItems = [
    { val: "انجام شده", name: "انجام شده" },
    { val: "معافیت تحصیلی", name: "معافیت تحصیلی" },
    { val: "در حال انجام", name: "در حال انجام" },
    { val: "مشمول", name: "مشمول" },
    { val: "معافیت", name: "معافیت" },
  ];
  const genderItems = [
    { val: "آقا", name: "آقا" },
    { val: "خانم", name: "خانم" },
  ];

  return (
    <>
      {/* Header  */}
      <Header reset={reset} />
      <motion.form
        whileInView={"visible"}
        className="w-full grid grid-cols-2  gap-8 px-2 py-[40px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9 },
            },
          }}
          className="w-full flex flex-col gap-2 col-span-2 md:col-span-1"
        >
          <TextField
            {...register("fullName")}
            label=" نام و نام خانوادگی"
            fullWidth
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            sx={{ background: "#fff", marginBottom: 2 }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, delay: 0.5 },
            },
          }}
          className="w-full flex flex-col gap-2 col-span-2 md:col-span-1"
        >
          <TextField
            {...register("phone")}
            label=" شماره تماس"
            sx={{ background: "#fff", marginBottom: 2 }}
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : ""}
          />
        </motion.div>
        <motion.div
          // dir="ltr"
          initial={{ opacity: 0, y: 50 }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, delay: 1 },
            },
          }}
          className="col-span-2 md:col-span-1"
        >
          <PersianDatePicker
            control={control}
            label={"تاریخ تولد"}
            errors={errors}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, delay: 1.5 },
            },
          }}
          className="w-full flex flex-col gap-2 col-span-2 md:col-span-1"
        >
          <TextField
            label="ایمیل"
            fullWidth
            {...register("email")}
            sx={{ background: "#fff", marginBottom: 2 }}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, delay: 2 },
            },
          }}
          className="col-span-2 md:col-span-1"
        >
          <SelectField
            label="وضعیت نظام وظیفه"
            selectItems={militaryItems}
            control={control}
            errors={errors}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, delay: 2.5 },
            },
          }}
          className="col-span-2 md:col-span-1"
        >
          <SelectField
            label="جنسیت"
            selectItems={genderItems}
            control={control}
            errors={errors}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, delay: 3 },
            },
          }}
          className="w-full flex flex-col gap-2 col-span-2"
        >
          <Resume
            control={control}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />
        </motion.div>
        {/* <FileUpload /> */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, delay: 3.5 },
            },
          }}
          className="w-full col-span-2 flex items-end justify-end"
        >
          <Button
            className="text-white bg-primary rounded-md min-w-[120px] px-2 py-2 disabled:text-white disabled:bg-gray-900"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "در حال پردازش" : "ثبت رزومه"}
          </Button>
        </motion.div>
      </motion.form>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showSnackbar}
        autoHideDuration={3000} // Snackbar automatically hides after 6 seconds
        onClose={handleSnackbarClose}
        message="فرم با موفقیت ارسال شد"
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "green", // Change the background color
            color: "#fff", // Ensure text is visible on green
          },
        }}
      />
    </>
  );
};

export default ResForm;
