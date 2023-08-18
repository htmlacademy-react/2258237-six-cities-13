import Comment from '../review/review';

import { Review } from '../../types/review';

type ReviewListProps = {
  reviews: Review[];
}

function ReviewList({reviews}: ReviewListProps) {
  return (
    <ul className="reviews__list">
      {
        reviews.map((review) => (
          <li className="reviews__item" key={review.id}>
            <Comment reviewData={review}/>
          </li>
        ))
      }
    </ul>
  );
}

export default ReviewList;
