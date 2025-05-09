import './ElectronicBanner.scss';
import EllipseA from '../../../shared/img/EllipseA.jpg';
import EllipseB from '../../../shared/img/EllipseB.jpg';
import EllipseC from '../../../shared/img/EllipseC.jpg';

export const ElectronicBanner = () => {
    return (
        <div>
            <div className="electronic_banner">
                <div className="rectangle__electronic">
                    <h1 className="rectangle__electronic-title">ЭЛЕКТРОННЫЙ КАТАЛОГ <br /> БИБЛИОТЕКИ ИМЕНИ ТОКТОГУЛА САТЫЛГАНОВА</h1>
                    <img className="ellipseA" src={EllipseA} alt="" />
                    <img className="ellipseB" src={EllipseB} alt="" />
                    <img className="ellipseC" src={EllipseC} alt="" />
                </div>
            </div>
        </div>
    );
}

