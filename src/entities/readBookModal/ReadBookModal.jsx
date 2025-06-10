import './readBookModal.scss';
import HTMLFlipBook from 'react-pageflip';
import { pdfjs } from 'react-pdf';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { historyFeych } from '../../app/store/reducers/historyBook';
import { useAuth } from '../../app/store/reducers/auth/auth';
import { getUser } from '../../app/store/reducers/auth/authThunks';
import workerSrc from 'react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export const ReadBookModal = ({ book, open, setOpen, bookId, page }) => {
    const [pageImages, setPageImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(page);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const flipBookRef = useRef(null);
    const dispatch = useDispatch();
    const { userData: data } = useAuth();

    useEffect(() => {
        dispatch(getUser());
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (open) {
            setIsVisible(true);
            loadPdfPages(book);
        } else {
            const timeout = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [open, book]);

    const loadPdfPages = async (pdfUrl) => {
        try {
            const loadingTask = pdfjs.getDocument(pdfUrl);
            const pdf = await loadingTask.promise;

            const images = [];
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({ canvasContext: context, viewport }).promise;
                images.push(canvas.toDataURL());
            }

            setPageImages(images);

            const startPage = (page && page >= 1 && page <= pdf.numPages) ? page : 1;
            setCurrentPage(startPage);

            setTimeout(() => {
                if (flipBookRef.current) {
                    flipBookRef.current.pageFlip().flip(startPage - 1);
                }
            }, 100);

        } catch (err) {
            console.error('Ошибка при загрузке PDF:', err);
        }
    };

    const handlerClose = () => {
        setOpen(false);
        dispatch(historyFeych({
            id: bookId,
            user: data.email,
            page: currentPage,
        }));
    };

    const goToPrevPage = () => flipBookRef.current?.pageFlip().flipPrev();
    const goToNextPage = () => flipBookRef.current?.pageFlip().flipNext();

    const onFlip = (e) => {
        setCurrentPage(e.data + 1);
    };

    if (!open && !isVisible) return null;

    const bookWidth = isMobile ? 350 : 570;
    const bookHeight = isMobile ? 450 : 700;

    return (
        <div className={`read-book-modal ${open ? 'fade-in' : 'fade-out'}`}>
            <HTMLFlipBook
                width={bookWidth} 
                height={bookHeight}
                maxShadowOpacity={0.1}
                drawShadow={true}
                showCover={true}
                size='fixed'
                onFlip={onFlip}
                ref={flipBookRef}
            >
                {pageImages.map((src, index) => (
                    <div className="page" key={index}>
                    <div className="page-content">
                        <div className="page-container">
                        <img 
                            src={src} 
                            alt={index} 
                        />
                        </div>
                    </div>
                    </div>
                ))}
            </HTMLFlipBook>

        <div className="controls">
            <button onClick={goToPrevPage} disabled={currentPage <= 1}>← Назад</button>
            <span>{currentPage} / {pageImages.length}</span>
            <button onClick={goToNextPage} disabled={currentPage >= pageImages.length}>Вперед →</button>
        </div>

        <button className="close-button" onClick={handlerClose}>×</button>
    </div>
    );
};
