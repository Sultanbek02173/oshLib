import { useLocation } from "react-router-dom";
import "./cardBook.scss";
import React from "react";

export const CardBook = ({
  image,
  author,
  description,
  title,
  openUrl,
  downloadUrl,
  openModal,
  id,
  base_url,
  page,
  setPageBook
}) => {
  const { path } = useLocation();
  return (
    <div className="cardBook">
      <div className="desktop_view">
        <div className="cardBook_img">
          {
            base_url ? (
              <img src={`${base_url}${image}`} alt="" />
            ) : (
              <img src={image} alt="" />
            )
          }
        </div>
        <div className="cardBook_text">
          <h2 className="cardBook_text_name">{title}</h2>
          <h4 className="cardBook_text_author">{author}</h4>
          <div className="cardBook_text_description">
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
        </div>
        <div className="cardBook_btn">
          {downloadUrl && (
            <button
              onClick={() => {
                base_url ? openModal(`${base_url}${downloadUrl.slice(1)}`, id, page): 
                openModal(downloadUrl, id, page);
              }}
              className="cardBook_btn_read"
            >
              читать
            </button>
          )}
          {downloadUrl && (
            <button className="cardBook_btn_download">
              <a target="_blank" href={downloadUrl}>
                скачать
              </a>
            </button>
          )}
        </div>
      </div>

      <div className="mobile_view">
        <div className="cardBook_top">
          <div className="cardBook_img">
            {
              base_url ? (
                <img src={`${base_url}${image}`} alt="" />
              ) : (
                <img src={image} alt="" />
              )
            }
          </div>

          <div className="cardBook_text">
            <h4 className="cardBook_text_author"> {author}</h4>
            <h2 className="cardBook_text_name">{title}</h2>
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

          {downloadUrl && (
            <button
              onClick={() => {
                base_url ? openModal(`${base_url}${downloadUrl.slice(1)}`, page) : 
                openModal(downloadUrl, id, page);
              }}
              className="cardBook_btn_read"
            >
              читать
            </button>
          )}
          {downloadUrl && (
            <button className="cardBook_btn_download">
              <a target="_blank" href={downloadUrl}>
                скачать
              </a>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
