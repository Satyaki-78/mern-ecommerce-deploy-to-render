import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {

  return (
    [1, 2, 3, 4, 5].map((star) => (
      <Button
        key={star}
        className={`p-2 rounded-full transition-colors border-none
          ${rating >= star
            ? 'text-yellow-400 hover:bg-black hover:text-yellow-400'
            : 'text-black hover:bg-black hover:text-yellow-400'}
        `}
        variant="outline"
        size="icon"
        onClick={handleRatingChange ? () => handleRatingChange(star) : null}
      >
        <StarIcon className={`w-6 h-6 ${star <= rating ? 'fill-yellow-400' : 'fill-black'}`} />
      </Button>
    ))
  );
}

export default StarRatingComponent;
