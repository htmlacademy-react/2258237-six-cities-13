import { Offer } from './types/offer';
import { Review } from './types/review';


function sortPriceUp(offerA : Offer, offerB : Offer) : number{
  return offerA.price - offerB.price;
}

function sortPriceDown(offerA : Offer, offerB : Offer) : number{
  return offerB.price - offerA.price;
}

function sortRate(offerA : Offer, offerB : Offer) : number{
  return offerB.rating - offerA.rating;
}

function compare(a: Review, b: Review) {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return Number(dateB) - Number(dateA);
}

function sortReviewByDate(reviews: Review[]): Review[] {
  return reviews.slice().sort(compare).slice(0, 10);
}


export {sortPriceUp, sortPriceDown, sortRate, sortReviewByDate};
