import React from "react";

export const RatingBar = ({
  rating,
  onChange,
}: {
  rating: number;
  onChange: ({ target }: { target: object }) => void;
}) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star, index) => {
        return (
          <span
            key={index}
            className="start"
            style={{
              cursor: "pointer",
              color: rating >= star ? "gold" : "gray",
              fontSize: `35px`,
            }}
            onClick={() => {
              onChange({
                target: {
                  name: "rating",
                  value: star,
                },
              });
              
            }}
          >
            {" "}
            ★{" "}
          </span>
        );
      })}
    </div>
  );
};
