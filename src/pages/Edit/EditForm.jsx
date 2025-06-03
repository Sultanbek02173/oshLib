import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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
  const dispatch = useDispatch();
  const { category } = useAuth();
  const { 0: state, 1: setState } = useState(user);

  const onChange = eventHandler(setState);

  const onFileChange = (e) => {
    const { name, files } = e.target;
    if (files) {
      setState((prev) => ({ ...prev, [name]: files[0] }));
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
  const [state2, setState2] = useState({
    avatarka: File | null,
  });

  useEffect(() => {
    dispatch(getCategory());
  }, []);
  return (
    <form onSubmit={onFormSubmit}>
      <div className="profile__data profile__edit">
        <>
          <img
            className="profile__data-image"
            src={`${BASE_URL}${state?.avatarka}` || profileAvatar}
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
          // onClick={toggleModal}
          to="/profile"
        >
          <button className="profile__actions-btn profile__actions-gray" >Отменить</button>
          
        </Link>
      </div>
    </form>
  );
};

export default EditForm;
