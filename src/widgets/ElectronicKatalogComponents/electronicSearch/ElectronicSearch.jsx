import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ElectronicSearch.scss';
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import { CardBook } from '../../../features/cardBook/CardBook';
import { fetchBookElectronic } from '../../../app/store/reducers/bookElectronic';
import { ReadBookModal } from '../../../entities';
import { useTranslation } from 'react-i18next';

export const ElectronicSearch = () => {
    const dispatch = useDispatch();
    const { books } = useSelector(state => state.bookElectronic);
    const { t } = useTranslation();

    const [authorFilter, setAuthorFilter] = useState('');
    const [titleFilter, setTitleFilter] = useState('');
    const [keywordFilter, setKeywordFilter] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [visibleCards, setVisibleCards] = useState(5);
    const [open, setOpen] = useState(false);
    const [book, setBook] = useState();
    const [bookId, setBookId] = useState();

    const toggleModal = () => setIsMenuOpen(!isMenuOpen);
    const loadMoreCards = () => setVisibleCards(filteredCards.length);
    const hideCards = () => setVisibleCards(5);

    const openModal = (book, id, page) => {
        setBook(book);
        setOpen(!open);
        setBookId(id)
        if (!page) return
        setPageBook(page);
    }

    const popularityThreshold = 10;

    const filteredCards = books?.filter((card) => {
        const matchesAuthor = card.author?.toLowerCase().includes(authorFilter.toLowerCase());
        const matchesTitle = card.title?.toLowerCase().includes(titleFilter.toLowerCase());
        const matchesKeyword = card.description?.toLowerCase().includes(keywordFilter.toLowerCase());

        const isPopular = (card.downloads && card.downloads > popularityThreshold) || (card.views && card.views > popularityThreshold);

        if (activeFilter === 'popular') {
            return matchesAuthor && matchesTitle && matchesKeyword && isPopular;
        }


        return matchesAuthor && matchesTitle && matchesKeyword;
    }) || [];


    useEffect(() => {
        dispatch(fetchBookElectronic());
    }, [dispatch]);

    return (
        <div className="electronicSearch container">
            <h1 className="electronicSearch_title">{t("electronicSearch.title")}</h1>
            <div className="electronicSearch_filters">
                <div className="electronicSearch_filters_btn">
                    <button
                        className={activeFilter === 'all' ? "electronicSearch_filters_btn_allactive" : "electronicSearch_filters_btn_all"}
                        onClick={() => setActiveFilter('all')}
                    >
                        {t("electronicSearch.button_all")}
                    </button>
                    <button
                        className={activeFilter === 'popular' ? "electronicSearch_filters_btn_popularActive" : "electronicSearch_filters_btn_popular"}
                        onClick={() => setActiveFilter('popular')}
                    >
                        {t("electronicSearch.button_popular")}
                    </button>
                </div>
                <input
                    className="electronicSearch_filters_inp"
                    type="text"
                    placeholder={t('author')}
                    value={authorFilter}
                    onChange={(e) => setAuthorFilter(e.target.value)}
                />
                <input
                    className="electronicSearch_filters_inp"
                    type="text"
                    placeholder={t('title')}
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                />
                <input
                    className="electronicSearch_filters_inp"
                    type="text"
                    placeholder={t('word2')}
                    value={keywordFilter}
                    onChange={(e) => setKeywordFilter(e.target.value)}
                />

                <div className="electronicSearch_filters-burger">
                    <button onClick={toggleModal}>
                        <HiAdjustmentsHorizontal />
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className='modall'>
                    <div className='modal_content'>
                        <button onClick={toggleModal}>
                            <IoCloseSharp />
                        </button>
                        <h2 className="modal_content-title">{t("electronicSearch.modal_title")}</h2>
                        <input
                            className="modal_content-inputs"
                            type="text"
                            placeholder="Автор"
                            value={authorFilter}
                            onChange={(e) => setAuthorFilter(e.target.value)}
                        />
                        <input
                            className="modal_content-inputs"
                            type="text"
                            placeholder="Название документа"
                            value={titleFilter}
                            onChange={(e) => setTitleFilter(e.target.value)}
                        />
                        <input
                            className="modal_content-inputs"
                            type="text"
                            placeholder="Ключевое слово"
                            value={keywordFilter}
                            onChange={(e) => setKeywordFilter(e.target.value)}
                        />
                    </div>
                </div>
            )}
            <div className="electronicSearch_info">
                {filteredCards.slice(0, visibleCards).map((card) => (
                    <CardBook
                        key={card.id}
                        id={card.id}
                        image={card.image}
                        author={card.author}
                        description={card.description}
                        title={card.title}
                        openUrl={card.open_url}
                        downloadUrl={card.download_url}
                        openModal={openModal}
                    />
                ))}

                <div className="electronicSearch_button">
                    {visibleCards < filteredCards.length && (
                        <button className="electronicSearch_button-more" onClick={loadMoreCards}>
                            {t("electronicSearch.button_more")}
                        </button>
                    )}
                    {visibleCards > 5 && (
                        <button className="electronicSearch_button-more" onClick={hideCards}>
                            {t("electronicSearch.button_hide")}
                        </button>
                    )}
                </div>
            </div>

            <ReadBookModal bookId={bookId} open={open} setOpen={setOpen} book={book} />
        </div>
    );
};
