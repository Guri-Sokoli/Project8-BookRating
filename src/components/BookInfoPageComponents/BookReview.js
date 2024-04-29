const BookReview = ({ review }) => {
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(renderStar(i, "full"));
      } else if (i - 0.5 <= rating) {
        stars.push(renderStar(i, "half"));
      } else {
        stars.push(renderStar(i, "empty"));
      }
    }
    return stars;
  };

  const renderStar = (i, type) => {
    let fill;
    if (type === "full") {
      fill = "#FCB500";
    } else if (type === "half") {
      fill = "url(#half-gradient)";
    } else {
      fill = "#BAB6AE";
    }

    return (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        fill={fill}
        className={`peer peer-hover:fill-[${
          false ? "#FCB500" : "#BAB6AE"
        }] hover:fill-[${
          false ? "#FCB500" : "#BAB6AE"
        }] w-8 h-8 md:w-10 md:h-10 mx-1 cursor-${
          false ? "pointer" : "default"
        }`}
        viewBox="0 0 24 24"
        stroke="none"
        aria-label={`Star ${i}`}
      >
        <defs>
          <linearGradient id="half-gradient">
            <stop offset="50%" stop-color="#FCB500" />
            <stop offset="50%" stop-color="#BAB6AE" />
          </linearGradient>
        </defs>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 2l3.09 6.26L22 9.27l-5 4.73L18.18 22 12 18.7 5.82 22l1.18-7.04L2 9.27l6.91-1.01L12 2z"
        />
      </svg>
    );
  };
  return (
    <div>
      <div className="p-5 flex flex-col bg-[#F9F1DE]  justify-center md:justify-around items-center my-8 rounded">
        <div className="flex flex-col md:flex-col">
          <div className="flex flex-col justify-center items-center">
            <div className="rounded-full w-20 h-20 bg-orange-200 flex items-center justify-center uppercase">{ review.userName.charAt(0)}</div>
            <h1>{review.userName}</h1>
          </div>
          <div className="flex flex-row justify-center items-center mb-4">
            {renderStars(review.rating)}
          </div>
        </div>
        <h1 className="px-12 text-wrap w-full text-[#59461B] text-md font-medium sm:text-lg md:text-xs">
          {review.comment}
        </h1>
      </div>
    </div>
  );
};

export default BookReview;
