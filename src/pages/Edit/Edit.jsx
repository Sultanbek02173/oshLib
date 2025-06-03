import { useDispatch } from "react-redux";
import logo from "../Profile/profileLogo.svg";
import EditForm from "./EditForm";
import { useEffect, useState } from "react";
import {
  editUserData,
  getUser,
} from "../../app/store/reducers/auth/authThunks";
import { useAuth } from "../../app/store/reducers/auth/auth";

const Edit = () => {
  const dispatch = useDispatch();
  const { userData: user } = useAuth();

  const onSubmit = async (user) => {
    try {
      const response = await dispatch(editUserData(user)).unwrap();
      return response;
    } catch (error) {
      return { error };
    }
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <section className="container">
      <div className="profile">
        <div className="profile__header">
          <img className="profile__header-logo" src={logo} alt="logo" />
          <h2 className="profile__header-title">Профиль читателя</h2>
        </div>
        {user && <EditForm user={user} onSubmit={onSubmit} />}
      </div>
    </section>
  );
};

export default Edit;
