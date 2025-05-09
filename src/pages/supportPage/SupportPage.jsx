import { ElectronicPartners, SupportBanner, SupportPartners, SupportPayment, SupportValue } from '../../widgets';
import './supportPage.scss';

export const SupportPage = () => {
  return (
    <main className='container'>
       <SupportBanner/>
       <SupportValue/>
       <ElectronicPartners/>
       <SupportPayment/>
    </main>
  )
}