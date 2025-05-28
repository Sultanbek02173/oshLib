import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { libraryPayTypeFetch, librarySupportFetch } from '../../../app/store/reducers/librarySupport';
import './SupportPayment.scss';

export function SupportPayment() {
    const dispatch = useDispatch();

    const { payType, data: titleData } = useSelector((state) => state.librarySupport);
    const [selectedPayment, setSelectedPayment] = useState(null);

    useEffect(() => {
        dispatch(libraryPayTypeFetch());
        dispatch(librarySupportFetch());
    }, [dispatch]);

    const handleCloseQR = () => {
        setSelectedPayment(null);
    };

    const handlePayment = () => {
        if (selectedPayment?.links) {
            window.open(selectedPayment.links, '_blank');
        }
    };

    return (
        <div className={`container ${selectedPayment ? 'blurred' : ''}`}>
            <div className="payment">
                <h1 className="title_payment">
                    {titleData?.title_3 || 'СПОСОБЫ ОПЛАТЫ'}
                </h1>
                <div className="block_payment">
                    {payType.map((item) => (
                        <div
                            key={item.id}
                            className="block_py"
                            onClick={() => setSelectedPayment(selectedPayment?.id === item.id ? null : item)}
                        >
                            <h1 className="payment_text">{item.title}</h1>
                            <img className="img_payment" src={item.image_logo} alt="payment" />
                        </div>
                    ))}
                </div>
            </div>

            {selectedPayment && (
                <div className="qr_overlay" onClick={handleCloseQR}>
                    <img
                        className="qr_code fade-in"
                        src={selectedPayment.image_qr}
                        alt="QR Code"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button className="qr_button fade-in" onClick={handlePayment}>
                        Оплатить
                    </button>
                </div>
            )}
        </div>
    );
}
