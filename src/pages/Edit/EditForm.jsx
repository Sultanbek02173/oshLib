import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/store/reducers/auth/auth";
import { getCategory } from "../../app/store/reducers/auth/authThunks";
import { eventHandler } from "../../shared/utils/eventHandlers";
import profileAvatar from "../Profile/profileAvatar.png";
import { BASE_URL } from "../../shared/api/constants";

const initialState = {
  full_name: "",
  email: "",
  avatarka: File | null,
  phone: "",
  category: "1",
  gender: "1",
  birth_date: "",
};

const EditForm = ({ user = initialState, onSubmit }) => {
  const fileInputRef = React.useRef(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const { category, error } = useAuth();
  const { 0: state, 1: setState } = useState(user);
  const navigate = useNavigate();
  const onChange = eventHandler(setState);

  const onFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setState((prev) => ({ ...prev, [name]: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await onSubmit(state);

      if (result?.error) {
        console.log("Ошибка от сервера:", result.error);
        return;
      }

      navigate("/profile");
    } catch (err) {
      console.log("Ошибка при отправке:", err);
    }
  };

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    dispatch(getCategory());
    // setState(user);
  }, []);
  // console.log(state);

  useEffect(() => {
    if (error?.code === "token_not_valid") {
      navigate("/login");
    }
  }, [error, navigate]);
  return (
    <form onSubmit={onFormSubmit}>
      <div className="profile__data profile__edit">
        {/* <input type="file" onChange={onFileChange} name="avatarka" /> */}
        <>
          <img
            className="profile__data-image"
            src={preview || `${BASE_URL}${state?.avatarka}` || profileAvatar}
            alt="avatar"
            onClick={handleDivClick}
          />

          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            name="avatarka"
            onChange={onFileChange}
          />
        </>
        <div>
          <div>
            <p className="profile__data-text">ФИО: </p>
            <input
              className="profile__data-input"
              type="text"
              value={state.full_name}
              name="full_name"
              onChange={onChange}
            />
          </div>
          <div>
            <p className="profile__data-text">Почта: </p>
            <input
              className="profile__data-input"
              type="email"
              value={state?.email}
              name="email"
              onChange={onChange}
            />
          </div>
          <div>
            <p className="profile__data-text">Телефон: </p>
            <input
              className="profile__data-input"
              type="text"
              value={state?.phone}
              name="phone"
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      <p className="profile__data-text profile__none">категория: </p>

      <select
        name="category"
        className="profile__data-input profile__select"
        onChange={onChange}
      >
        {category.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
      <div className="profile__actions">
        <button className="profile__actions-btn profile__actions-blue">
          Сохранить Изменения
        </button>
        <Link
          className="profile__actions-btn profile__actions-gray"
          to="/profile"
        >
          {/* <button className="profile__actions-link-btn profile__actions-gray"> */}
          Отменить
          {/* </button> */}
        </Link>
      </div>
    </form>
  );
};

export default EditForm;
