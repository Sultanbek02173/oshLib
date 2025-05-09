import "./aboutPage.scss"
import { Activities, AboutBanner, Management, Structure, History } from "../../widgets";


export const AboutPage = () => {
  return (
    <div>
      <AboutBanner />
      <Management />
      <Structure />
      <Activities />
      <History />
    </div>
  )
}
