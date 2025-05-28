import './readBookModal.scss';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { useState, useEffect } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export const ReadBookModal = ({ book, open, setOpen }) => {
    const [numPages, setNumPages] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (open) {
            setIsVisible(true);
        } else {
            // Ждём завершения анимации перед размонтированием
            const timeout = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [open]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    if (!open && !isVisible) return null;

    return (
        <div className={`read-book-modal ${open ? 'fade-in' : 'fade-out'}`}>
            <div className="book-container slide-up">
                <Document file={book} onLoadSuccess={onDocumentLoadSuccess}>
                    <HTMLFlipBook   
                        width={550}
                        height={700}
                        size="fixed"
                        showCover={true}
                        maxShadowOpacity={0.8}
                        drawShadow={true}
                        flippingTime={1200} // Медленный флип
                        usePortrait={false}
                        useMouseEvents={true}
                        clickEventForward={true}
                        disableFlipByClick={false}
                    >
                        {Array.from(new Array(numPages), (_, index) => (
                            <div className="pdf-page-wrapper" key={`page_${index + 1}`}>
                                <Page
                                pageNumber={index + 1}
                                width={550}
                                renderAnnotationLayer={true}
                                renderTextLayer={true}
                                loading={<div className="page-loading">Загрузка страницы...</div>}
                                />
                            </div>
                        ))}
                    </HTMLFlipBook>
                </Document>
                <button className="close-button" onClick={() => setOpen(false)}>×</button>
            </div>
        </div>
    );
};






