import { ElectronicBanner, ElectronicPartners, ElectronicSearch } from "../../widgets";
import "./electronicPage.scss";

export const ElectronicPage = () => {
  return (
    <div className="container">
      {/* <ElectronicBanner/> */}
      <ElectronicSearch/>
      <ElectronicPartners/>
    </div>
  )
}
