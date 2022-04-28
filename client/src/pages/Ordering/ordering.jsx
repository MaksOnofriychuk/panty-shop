import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "./ordering.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearAllSendForm } from "../../redux/cart";

const validationSchema = yup.object({
  instagram: yup
    .string("Введите ваш Instagram")
    .required("Поле является обязательным для заполнения"),
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
  const dispatch = useDispatch();

  const [sendForm, setSendForm] = useState(false);

  const { items, totalPrice, sellTotalPrice, totalCount } = useSelector(
    (state) => state.cart
  );

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
      bank: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let token = "5263543272:AAEzVEmMfZyJCW1T5q55W9ma5M2KX5jVMc4";

      let chat_id = "-613092732";

      const obj1 = Object.keys(items);

      const obj2 = obj1.map((o) => items[o]);

      const obj3 = obj2.map((q) => q.items);

      let my_text = JSON.stringify({
        Заказ: obj3.map((z) =>
          z.map((p) => ({
            Имя: p.name,
            Размер: p.size,
            Код: p.code,
          }))
        ),
        "Данние о пользователе": {
          "Ник-нейм": values.instagram,
          Имя: values.name,
          Фамилия: values.secondName,
          Тел: values.phone,
          Банк: values.bank,
          "Отдиление почты": values.postOffice,
          Область: values.region,
          Город: values.town,
          Примечание: values.note,
        },

        "Общая стоимость": sellTotalPrice ? sellTotalPrice : totalPrice,
        количество: totalCount,
      });
      let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${my_text}/`;
      let api = new XMLHttpRequest();
      api.open("GET", url, true);
      api.send();
      setSendForm(true);
      dispatch(clearAllSendForm());
    },
  });

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
      label: "Примечание...",
    },
    {
      name: "bank",
      label: "Банк оплаты",
    },
  ];

  return (
    <div className="container">
      {/* {obj3.map((z) =>
        z.map((p) => (
          <div key={new Date() + Math.random()}>
            <span>{p.name}</span>
            <span>{p.code}</span>
            <span>{p.size}</span>
          </div>
        ))
      )} */}
      {!sendForm ? (
        <>
          <div className="ordering__top">
            <h2 className="ordering__top-title">Оформление заказа</h2>
          </div>
          <div className="ordering__main">
            <form
              className="ordering__main-form"
              action="https://formsubmit.co/maksonofrijcuk002@gmail.com"
              method="post"
              onSubmit={formik.handleSubmit}
            >
              {fields.map((f, i) => (
                <React.Fragment key={i}>
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
                </React.Fragment>
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
