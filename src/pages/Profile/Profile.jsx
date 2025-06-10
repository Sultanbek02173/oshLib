import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/store/reducers/auth/auth";
import { getUser, logoutUser } from "../../app/store/reducers/auth/authThunks";
import { ReadBookModal } from "../../entities";
import { CardBook } from "../../features";
import { BASE_URL } from "../../shared/api/constants";
import "./profile.scss";
import profileAvatar from "./profileAvatar.png";
import logo from "./profileLogo.svg";

const Profile = () => {
  const { userData: data, error } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(error);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [book, setBook] = useState();
  const [bookId, setBookId] = useState();
  const [pageBook, setPageBook] = useState();

  // const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const openModal = (book, id, page) => {
    setBook(book);
    setOpen(!open);
    setBookId(id);
    if (!page) return;
    setPageBook(page);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  useEffect(() => {
    if (error?.code === "token_not_valid") {
      navigate("/login");
    }
  }, [error, navigate, handleLogout]);

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
              src={
                data?.avatarka != null
                  ? `${BASE_URL}${data.avatarka}`
                  : profileAvatar
              }
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
            <div className="profile__history" key={data.id}>
              <h3 className="profile__history-head">
                История прочитанных книг:
              </h3>
              {data?.read_books.map((item) => (
                <CardBook
                  key={item.id}
                  id={item.id}
                  title={item.book_title}
                  description={item.description}
                  author={item.book_author}
                  openUrl={item.openUrl}
                  image={item.image_url}
                  downloadUrl={item.download_url}
                  openModal={openModal}
                  base_url={BASE_URL}
                  page={item.page}
                  setPageBook={setPageBook}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="backDrop">
          <div className="faUser">
            <div className="cors">
              <div className="cross" onClick={toggleModal}>
                <IoMdClose />
              </div>
            </div>
            <div className="warning">
              <div className="getOut">
                <h1>выйти из аккаунта</h1>
              </div>
              <div className="areSure">
                <p>
                  Вы уверены, что хотите выйти из своей учетной записи? После
                  выхода вам нужно будет снова войти. Вы уверены?
                </p>
              </div>
            </div>
            <div className="confirmation">
              <div className="cancel">
                <button onClick={toggleModal}>Отмена</button>
              </div>
              <div className="YesExit">
                <button onClick={handleLogout}>Да, выйти!</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ReadBookModal
        bookId={bookId}
        open={open}
        setOpen={setOpen}
        book={book}
        page={pageBook}
      />
      {/* <ModalReg isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> */}
    </section>
  );
};

export default Profile;
