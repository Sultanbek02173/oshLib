import { AfishaEvent,ElectronicPartners, HomeBanner, HomeRating, HomeViews } from "../../widgets";
import { CardFhdt, CardNews } from "../../features/index";
import { useState, useEffect } from "react";

export const HomePage = () => {
  const [mobile, setMobile] = useState(window.innerWidth <= 460);
  const [tablet, setTablet] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleSize = () => {
      setMobile(window.innerWidth <= 460);
      setTablet(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  return (
    <div>
      <HomeBanner />
      <AfishaEvent tablet={tablet} mobile={mobile} />
      <CardFhdt />
      <CardNews />
      <HomeViews mobile={mobile} />
      <ElectronicPartners />
      <HomeRating />
    </div>
  );
};
