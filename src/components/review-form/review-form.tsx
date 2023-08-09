import { useState, ChangeEvent, Fragment } from 'react';

import { COUNT_OF_SYMBOLS_REVIEW } from '../../config';

type CommentHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const ratingMap = [
  {
    score: '5',
    title: 'perfect',
  }, {
    score: '4',
    title: 'good',
  }, {
    score: '3',
    title: 'not bad',
  }, {
    score: '2',
    title: 'badly',
  }, {
    score: '1',
    title: 'terrible',
  }
];

function ReviewForm() {
  const [comment, setComment] = useState({rating: '-1', review: ''});

  function handleCommentChange({ target }: CommentHandler) {
    setComment({ ...comment, [target.name]: target.value });
  }

  function canSubmit () {
    return comment.review.length > COUNT_OF_SYMBOLS_REVIEW;
  }


  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {
          ratingMap.map(({score, title}) => (
            <Fragment key={score}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={score}
                id={`${score}-stars`}
                type="radio"
                onChange={handleCommentChange}
                checked={comment.rating === score}
              />
              <label
                htmlFor={`${score}-stars`}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </Fragment>
          ))
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleCommentChange}
        value={comment.review}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={canSubmit()}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
