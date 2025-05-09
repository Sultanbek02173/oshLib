import './cards.scss';

export const Cards = ({ items }) => {
    return (
        <section className="cards">
            {
                items.length > 0 ? (
                    <>
                        {items.map((item) => (
                            <div key={item.id} className="card">
                                <div className="card-block">
                                    <span className="card-block-label">Автор:</span>
                                    <span className="card-block-value">{item.author}</span>
                                </div>
                                <div className="card-block">
                                    <span className="card-block-label">Название:</span>
                                    <span className="card-block-value">{item.title}</span>
                                </div>
                                <div className="card-block">
                                    <span className="card-block-label">Примечание:</span>
                                    <span className="card-block-value">{item.word}</span>
                                </div>
                            </div>
                        ))}
                    </>

                ) : (
                    <div className="card">
                        <h2>Нет результата</h2>
                    </div>
                )
            }

        </section>
    )
}
