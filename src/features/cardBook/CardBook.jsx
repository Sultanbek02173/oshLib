import { useLocation } from "react-router-dom";
import "./cardBook.scss";
import React from "react";

export const CardBook = ({ image, author, description, title }) => {
  const { path } = useLocation();
  return (
    <div className="cardBook">
      <div className="desktop_view">
        <div className="cardBook_img">
          <img src={image} alt="" />
        </div>
        <div className="cardBook_text">
          <h2 className="cardBook_text_name">
            {" "}
            <span>📖 НАЗВАНИЕ КНИГИ:</span>
            {title}
          </h2>
          <h4 className="cardBook_text_author">
            <span> ✍️ Автор:</span> {author}
          </h4>
          <div className="cardBook_text_description">
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
        </div>
        <div className="cardBook_btn">
          {path === "/news" && (
            <React.Fragment>
              <button className="cardBook_btn_read">читать</button>
              <button className="cardBook_btn_download">скачать</button>
            </React.Fragment>
          )}
        </div>
      </div>

      <div className="mobile_view">
        <div className="cardBook_top">
          <div className="cardBook_img">
            <img src={image} alt="" />
          </div>

          <div className="cardBook_text">
            <h4 className="cardBook_text_author">✍️ Автор: {author}</h4>
            <h2 className="cardBook_text_name">📖 НАЗВАНИЕ КНИГИ: {title}</h2>
          </div>
        </div>
        <div className="cardBook_text_description">
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
        <div className="cardBook_btn">
          {path === "/news" && (
            <React.Fragment>
              <button className="cardBook_btn_read">читать</button>
              <button className="cardBook_btn_download">скачать</button>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
