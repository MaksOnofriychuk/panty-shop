import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "./ordering.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";

const validationSchema = yup.object({
  instagram: yup.string("Введите ваш Instagram"),
  name: yup
    .string("Введите ваше имя")
    .required("Поле является обязательным для заполнения"),
  secondName: yup
    .string("Введите вашу фамилию")
    .required("Поле является обязательным для заполнения"),
  phone: yup
    .string("Введите номер телефона")
    .min(9, "Phone should be of minimum 9 characters length")
    .required("Поле является обязательным для заполнения"),
  region: yup
    .string("Введите вашу область")
    .required("Поле является обязательным для заполнения"),
  town: yup
    .string("Введите ваш город")
    .required("Поле является обязательным для заполнения"),
  postOffice: yup
    .string("Введите отделение Новой Почты")
    .required("Поле является обязательным для заполнения"),
  note: yup.string("Укажите ваш комментарий"),
});

const Ordering = () => {
  const [sendForm, setSendForm] = useState(false);

  const { items } = useSelector((state) => state.cart);

  const formik = useFormik({
    initialValues: {
      instagram: "",
      name: "",
      secondName: "",
      phone: "",
      region: "",
      town: "",
      postOffice: "",
      note: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values, items);
      setSendForm(true);
    },
  });
  console.log(sendForm);

  const fields = [
    {
      name: "instagram",
      label: "Ваш инстаграм",
    },
    {
      name: "name",
      label: "Имя",
    },
    {
      name: "secondName",
      label: "Фамилия",
    },
    {
      name: "phone",
      label: "Телефон",
    },
    {
      name: "region",
      label: "Область",
    },
    {
      name: "town",
      label: "Город",
    },
    {
      name: "postOffice",
      label: "Отделение почты",
    },
    {
      name: "note",
      label: "Примичание...",
    },
  ];

  return (
    <div className="container">
      {!sendForm ? (
        <>
          <div className="ordering__top">
            <h2 className="ordering__top-title">Оформление заказа</h2>
          </div>
          <div className="ordering__main">
            <form
              className="ordering__main-form"
              onSubmit={formik.handleSubmit}
            >
              {fields.map((f) => (
                <TextField
                  style={{ marginBottom: "50px" }}
                  id={f.name}
                  name={f.name}
                  label={f.label}
                  value={formik.values[f.name]}
                  onChange={formik.handleChange}
                  error={
                    formik.touched[f.name] && Boolean(formik.errors[f.name])
                  }
                  helperText={formik.touched[f.name] && formik.errors[f.name]}
                  variant="outlined"
                />
              ))}

              <Button
                className="sendin__main-btn"
                style={{
                  color: "grey",
                  borderColor: "grey",
                  marginBottom: "30px",
                }}
                size="large"
                variant="outlined"
                type="submit"
              >
                Отправить
              </Button>
              <Link to="/cart">
                <Button
                  style={{ color: "grey", borderColor: "grey", width: "100%" }}
                  size="large"
                  variant="outlined"
                >
                  Вернуться назад
                </Button>
              </Link>
            </form>
          </div>
        </>
      ) : (
        <div className="ordering__thanks">
          <div className="ordering__thanks-title">
            <h2>Спасибо за покупку</h2>
          </div>
          <div className="ordering__thanks-pretitle">
            <h3>Ожидайте реквизиты </h3>
          </div>
          <div>
            <Link to="/" className="button button--black">
              <span>Вернуться назад</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ordering;
