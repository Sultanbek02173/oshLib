import img from "../../../shared/image/banner2.png";
import img3 from "../../../shared/image/Banner.png";
import "./projectbanner.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectBanner } from "../../../app/store/reducers/projectBanner";

export const ProjectBanner = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.projectBanner);

  useEffect(() => {
    dispatch(fetchProjectBanner());
  }, [dispatch]);

  if (!data) return null;
  console.log(data);
  data.img
  return (
    <section style={
      window.innerWidth <= 576 && data?.image
        ? {
          background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${data.image}) center/cover no-repeat`,
        }
        : {}
    } className="projectBanner">

      <h1>{data?.title}</h1>

      <img className="projectbanner_img1" src={img} alt="Project" />

      <div className="rotating-wrapper">
        <svg id="rotatingText" viewBox="0 0 200 200">
          <defs>
            <path
              id="circle"
              d="M 100, 100 m -70, 0 a 70,70 0 1,0 140,0 a 70,70 0 1,0 -140,0"
            />
          </defs>
          <text>
            <textPath className="text" href="#circle" startOffset="0%">
              {data?.description}
            </textPath>
          </text>
        </svg>
      </div>

      <img className="projectbanner_img2" src={img3} alt="Project" />
    </section>
  );
};
