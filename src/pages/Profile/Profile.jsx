import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/store/reducers/auth/auth";
import { getUser } from "../../app/store/reducers/auth/authThunks";
import { ModalReg } from "../../entities";
import { CardBook } from "../../features";
import "./profile.scss";
import profileAvatar from "./profileAvatar.png";
import logo from "./profileLogo.svg";
import { BASE_URL } from "../../shared/api/constants";

const Profile = () => {
  const { userData: data, error } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(error);

  //   name: "Имя Фамилия",
  //   email: "example@gmail.com",
  //   avatar: "",
  //   phone: "+996 555 55 55 55",
  // };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  useEffect(() => {
    if (error?.code === "token_not_valid") {
      navigate("/login");
    }
  }, [error, navigate]);

  console.log(data);
  
  

  return (
    <section className="container">
      <div className="profile">
        <div className="profile__header">
          <img className="profile__header-logo" src={logo} alt="logo" />
          <h2 className="profile__header-title">Профиль читателя</h2>
        </div>
        <div className="profile__body">
          <div className="profile__data">
            <img
              className="profile__data-image"
              src={data?.avatarka != null ? `${BASE_URL}${data.avatarka}` : profileAvatar}
              alt="avatar"
            />

            <div>
              <p className="profile__data-text">ФИО: {data?.full_name}</p>
              <p className="profile__data-text">Почта: {data?.email}</p>
              <p className="profile__data-text">Телефон: {data?.phone}</p>
            </div>
          </div>
          <div className="profile__actions">
            <Link
              to="/edit"
              className="profile__actions-btn profile__actions-blue"
            >
              Редактировать
            </Link>
            <button
              onClick={toggleModal}
              className="profile__actions-btn profile__actions-gray"
            >
              Выйти
            </button>
          </div>

          {data?.read_books?.length > 0 && (
            <div className="profile__history">
              <h3 className="profile__history-head">
                История прочитанных книг:
              </h3>
              {data?.read_books.map((item) => (
                <CardBook
                  key={item.id}
                  title={item.book_title}
                  description={item.description}
                  author={item.book_author}
                  openUrl={item.openUrl}
                  image={item.image_url}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <ModalReg isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </section>
  );
};

export default Profile;
