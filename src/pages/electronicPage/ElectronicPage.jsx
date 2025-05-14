import { ElectronicPartners, ElectronicSearch } from "../../widgets";
import "./electronicPage.scss";

export const ElectronicPage = () => {
  return (
    <div className="container">
      <ElectronicSearch/>
      <ElectronicPartners/>
    </div>
  )
}
