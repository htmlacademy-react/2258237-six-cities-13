import { Review } from '../../types/review';

type CommentProps = {
  reviewData: Review;
}

function Comment({reviewData}: CommentProps) {
  return (
    <>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={reviewData.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{reviewData.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${reviewData.rating * 20}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {reviewData.comment}
        </p>
        <time
          className="reviews__time"
          dateTime={new Date(reviewData.date).toISOString().split('T')[0]}
        >
          {new Date(reviewData.date).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </time>
      </div>
    </>
  );
}

export default Comment;
