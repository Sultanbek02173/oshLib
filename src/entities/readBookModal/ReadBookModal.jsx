import './readBookModal.scss';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { historyFeych } from '../../app/store/reducers/historyBook';
import workerSrc from 'react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs?url';
import { useAuth } from '../../app/store/reducers/auth/auth';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export const ReadBookModal = ({ book, open, setOpen, bookId }) => {
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { userData: data } = useAuth();
    const flipBookRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (open) {
            setIsVisible(true);
        } else {
            const timeout = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [open]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setCurrentPage(1);
    };

    const handlerClose = () => {
        setOpen(false);
        dispatch(
        historyFeych(
            {
                id: bookId,
                user: data.email,
                page: currentPage,
            }
        ))
    };

    const goToPrevPage = () => {
        flipBookRef.current?.pageFlip().flipPrev();
    };

    const goToNextPage = () => {
        flipBookRef.current?.pageFlip().flipNext();
    };

    const onFlip = (e) => {
        setCurrentPage(isMobile ? e.data + 1 : (e.data * 2) + 1);
    };

    if (!open && !isVisible) return null;

    const pagesPerSpread = isMobile ? 1 : 2;

    const bookWidth = isMobile ? 300 : 950;
    const bookHeight = isMobile ? 400 : 800;

    return (
        <div className={`read-book-modal ${open ? 'fade-in' : 'fade-out'}`}>
            <div className="book-container slide-up">
                <Document file={book} onLoadSuccess={onDocumentLoadSuccess}>
                    {numPages && (
                        <HTMLFlipBook
                            width={bookWidth}
                            height={bookHeight}
                            size="fixed"
                            minWidth={200}
                            maxWidth={bookWidth}
                            minHeight={200}
                            maxHeight={bookHeight}
                            showCover={false}
                            maxShadowOpacity={0.8}
                            drawShadow={true}
                            flippingTime={600}
                            usePortrait={true}
                            useMouseEvents={true}
                            clickEventForward={true}
                            disableFlipByClick={false}
                            onFlip={onFlip}
                            ref={flipBookRef}
                            mobileScrollSupport={isMobile}
                            responsive={isMobile}
                        >
                            {Array.from(
                                { length: Math.ceil(numPages / pagesPerSpread) },
                                (_, index) => (
                                    <div
                                        className="pdf-page-wrapper"
                                        key={`page_${index}`}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: '10px',
                                        }}
                                    >
                                        <Page
                                            pageNumber={index * pagesPerSpread + 1}
                                            width={isMobile ? 300 : 550}
                                            renderAnnotationLayer={true}
                                            renderTextLayer={true}
                                            loading={<div className="page-loading">Загрузка страницы...</div>}
                                        />
                                        
                                    </div>
                                )
                            )}
                        </HTMLFlipBook>
                    )}
                </Document>

                <div className="controls">
                    <button onClick={goToPrevPage} disabled={currentPage <= 1}>← Назад</button>
                    <span>{currentPage} / {numPages}</span>
                    <button onClick={goToNextPage} disabled={currentPage >= numPages}>Вперед →</button>
                </div>

                <button className="close-button" onClick={handlerClose}>×</button>
            </div>
        </div>
    );
};
