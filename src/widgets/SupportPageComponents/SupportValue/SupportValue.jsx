import './SupportValue.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { libraryValuesFetch } from '../../../app/store/reducers/librarySupport';

export function SupportValue() {
    const { values } = useSelector((state) => state.librarySupport);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(libraryValuesFetch());
    }, [dispatch]);

    //   const item = [
    //     {
    //         id: 1,
    //         title: 'ДОСТУПНОСТЬ',
    //         image: science,
    //         description: 'Знания должны быть доступны каждому, независимо от возраста, социального статуса и места проживания.'
    //     },
    //     {
    //         id: 2,
    //         title: 'ОБРАЗОВАНИЕ',
    //         image: star,
    //         description: 'Мы поддерживаем стремление к саморазвитию, предоставляя широкий спектр образовательных ресурсов.'
    //     },
    //     {
    //         id: 3,
    //         title: 'СОТРУДНИЧЕСТВО',
    //         image: science,
    //         description: 'Работаем с партнерами и организациями для развития культуры и науки.'
    //     },
    //     {
    //         id: 4,
    //         title: 'ИННОВАЦИИ',
    //         image: star,
    //         description: 'Знания должны быть доступны каждому, независимо от внедряем современные технологии.'
    //     },
    // ];


    return (
        <section>
            <div className="support_value">
                <h1 className="title_value">ЦЕННОСТИ БИБЛИОТЕКИ</h1>
                <div className="value__container">
                    {values.map((item) => (
                        <div key={item.id} className="value__block">
                            <img className="value__block-image" src={item.icon} alt="" />
                            <h3 className="value__block-title">{item.title}</h3>
                            <p
                                className="value__block-description"
                                dangerouslySetInnerHTML={{ __html: item.short_description }}
                            ></p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
