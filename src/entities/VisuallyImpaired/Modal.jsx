import React from "react";
import { useDispatch } from "react-redux";
import {
  increaseLetterSpacing,
  increaseLineSpacing,
  largeLetterSpacing,
  largeLineSpacing,
  normalLetterSpacing,
  normalLineSpacing,
  setDefaultFont,
  switchToSerifFont,
} from "../../app/store/reducers/visually";

const Modal = ({ setModal, mainTextSpeech }) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setModal(false);
    mainTextSpeech("Настройки закрыты"); 
  };

  return (
    <div className="visually__modal">
      <div className="visually__modal-head">
        <p>Настройки</p>
        <button onClick={handleCloseModal}>×</button>
      </div>
      <div className="visually__modal-body">
        <div className="visually__content">
          <p>Межбуквенное расстояние</p>
          <div>
            <button
              onClick={() => {
                dispatch(normalLetterSpacing());
                mainTextSpeech("Интервал между буквами стандартный");
              }}
            >
              Стандартный
            </button>
            <button
              onClick={() => {
                dispatch(increaseLetterSpacing());
                mainTextSpeech("Интервал между буквами средний");
              }}
            >
              Средний
            </button>
            <button
              onClick={() => {
                dispatch(largeLetterSpacing());
                mainTextSpeech("Интервал между буквами большой");
              }}
            >
              Большой
            </button>
          </div>
        </div>
        <div className="visually__content">
          <p>Межстрочный интервал</p>
          <div>
            <button
              onClick={() => {
                dispatch(normalLineSpacing());
                mainTextSpeech("Межстрочный интервал стандартный");
              }}
            >
              Стандартный
            </button>
            <button
              onClick={() => {
                dispatch(increaseLineSpacing());
                mainTextSpeech("Межстрочный интервал средний");
              }}
            >
              Средний
            </button>
            <button
              onClick={() => {
                dispatch(largeLineSpacing());
                mainTextSpeech("Межстрочный интервал большой");
              }}
            >
              Большой
            </button>
          </div>
        </div>
        <div className="visually__content">
          <p>Шрифт</p>
          <div>
            <button
              onClick={() => {
                dispatch(setDefaultFont());
                mainTextSpeech("Шрифт без засечек");
              }}
            >
              Без засечек
            </button>
            <button
              onClick={() => {
                dispatch(switchToSerifFont());
                mainTextSpeech("Шрифт с засечками");
              }}
            >
              С засечками
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;