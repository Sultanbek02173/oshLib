import './cardRating.scss';

export const CardRating = ({
  idx,
  isActive,
  onClick,
  title,
  place,
  description,
  images,
  book,
  author,
  code,
  image
}) => (

  <div
    onClick={() => onClick(idx)}
    className={`card__rating ${isActive ? 'active' : ''}`}
  >
    <div className="card__rating-images">
      {images && 
      <img
        className="card__rating-images-img"
        src={images}
        alt={title}
      />}
      
      {image && <img
        className="card__rating-images-img"
        src={image}
        alt={title}
      />}
    </div>

    <div className="card__rating-texts">
      <h3 className="card__rating-texts-place">{place}</h3>
      <p
        className="card__rating-texts-title"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      {book && <p className="card__rating-texts-title">{book}</p>}
      {author && <p className="card__rating-texts-title">{author}</p>}

      <span className="card__rating-texts-code">{code}</span>
    </div>
  </div>
);
