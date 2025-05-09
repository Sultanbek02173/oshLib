import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useVisually } from "../../app/store/reducers/visually";
import {
  activeMode,
  deactivateMode,
  increaseFontSize,
  decreaseFontSize,
  handleThemeChange,
  showPictures,
  hidePictures,
  darkPictures,
  activeSpeech,
  unplugSpeech,
  setHide,
  setShow,
} from "../../app/store/reducers/visually";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faMinus,
  faMinusCircle,
  faVolumeOff,
  faCircleHalfStroke,
  faGear,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

export const VisuallyImpaired = ({ mainTextSpeech }) => {
  const visually = useVisually();
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const speakWebsite = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const bodyText = Array.from(document.body.childNodes)
        .filter((node) => !node.classList?.contains("visually")) 
        .map((node) => node.textContent?.trim())
        .filter((text) => text) 
        .join(" ");

      const utterance = new SpeechSynthesisUtterance(bodyText);
      utterance.lang = "ru-RU";
      utterance.onend = () => {
        dispatch(unplugSpeech());
        mainTextSpeech("Озвучивание сайта завершено");
      };
      window.speechSynthesis.speak(utterance);
    } else {
      console.log("Синтез речи не поддерживается браузером");
      mainTextSpeech("Синтез речи не поддерживается вашим браузером");
    }
  };

  useEffect(() => {
    const body = document.body;
    body.className = "";

    if (visually.active) {
      body.classList.add(visually.theme);
      body.classList.add(visually.picture);
      body.classList.add(visually.letterSpacing);
      body.classList.add(visually.lineSpacing);
      body.classList.add(visually.font);
      if (visually.fontSize > 0) {
        body.classList.add(`fontSize-${visually.fontSize}`);
      }
    }
  }, [
    visually.active,
    visually.theme,
    visually.picture,
    visually.letterSpacing,
    visually.lineSpacing,
    visually.font,
    visually.fontSize,
  ]);

  useEffect(() => {
    if (!visually.active) {
      dispatch(activeMode());
      mainTextSpeech("Режим для слабовидящих активирован");
    }
  }, [dispatch, visually.active, mainTextSpeech]);

  return (
    <>
      {visually.hide && (
        <div className="visually">
          <div className="visually__content">
            <p>Размер шрифта</p>
            <div>
              <button
                onClick={() => {
                  dispatch(decreaseFontSize());
                  mainTextSpeech("Текст уменьшен");
                }}
              >
                A-
              </button>
              <button
                onClick={() => {
                  dispatch(increaseFontSize());
                  mainTextSpeech("Текст увеличен");
                }}
              >
                A+
              </button>
            </div>
          </div>
          <div className="visually__content" id="visually__content">
            <p>Цвета сайта</p>
            <div>
              <button
                id="visually__content-light"
                onClick={() => {
                  dispatch(handleThemeChange("light"));
                  mainTextSpeech("Цвет сайта черный по белому");
                }}
              >
                ц
              </button>
              <button
                id="visually__content-dark"
                onClick={() => {
                  dispatch(handleThemeChange("dark"));
                  mainTextSpeech("Цвет сайта белый по черному");
                }}
              >
                ц
              </button>
              <button
                id="visually__content-blue"
                onClick={() => {
                  dispatch(handleThemeChange("blue"));
                  mainTextSpeech("Цвет сайта темно-синий по голубому");
                }}
              >
                ц
              </button>
              <button
                id="visually__content-brown"
                onClick={() => {
                  dispatch(handleThemeChange("brown"));
                  mainTextSpeech("Цвет сайта коричневый по бежевому");
                }}
              >
                ц
              </button>
              <button
                id="visually__content-green"
                onClick={() => {
                  dispatch(handleThemeChange("green"));
                  mainTextSpeech("Цвет сайта зеленый по темно-коричневому");
                }}
              >
                ц
              </button>
            </div>
          </div>
          <div className="visually__content">
            <p>Изображения</p>
            <div>
              <button
                onClick={() => {
                  dispatch(showPictures());
                  mainTextSpeech("Изображения включены");
                }}
              >
                <FontAwesomeIcon icon={faImage} />
              </button>
              <button
                onClick={() => {
                  dispatch(hidePictures());
                  mainTextSpeech("Изображения выключены");
                }}
              >
                <FontAwesomeIcon icon={faMinusCircle} />
              </button>
              <button
                onClick={() => {
                  dispatch(darkPictures());
                  mainTextSpeech("Изображения черно-белые");
                }}
              >
                <FontAwesomeIcon icon={faCircleHalfStroke} />
              </button>
            </div>
          </div>
          <div className="visually__content">
            <p>Синтез речи</p>
            <div>
              <button
                onClick={() => {
                  dispatch(unplugSpeech());
                  window.speechSynthesis.cancel(); 
                  mainTextSpeech("Синтез речи выключен");
                }}
              >
                <FontAwesomeIcon icon={faVolumeOff} />
              </button>
              <button
                onClick={() => {
                  dispatch(activeSpeech());
                  mainTextSpeech("Синтез речи включен");
                  speakWebsite(); 
                }}
              >
                <FontAwesomeIcon icon={faVolumeHigh} />
              </button>
            </div>
          </div>
          <div className="visually__content">
            <p>Настройки</p>
            <div>
              <button onClick={() => setModal(!modal)}>
                <FontAwesomeIcon icon={faGear} />
              </button>
              <button
                onClick={() => {
                  dispatch(deactivateMode());
                  mainTextSpeech("Обычная версия сайта");
                  document.body.className = "";
                }}
              >
                Обычная версия
              </button>
              <button
                onClick={() => {
                  dispatch(setHide());
                  mainTextSpeech("Панель скрыта");
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          </div>
          {modal && <Modal mainTextSpeech={mainTextSpeech} setModal={setModal} />}
        </div>
      )}
      {!visually.hide && (
        <button
          onClick={() => {
            dispatch(setShow());
            mainTextSpeech("Панель раскрыта");
          }}
        >
          Показать
        </button>
      )}
    </>
  );
};