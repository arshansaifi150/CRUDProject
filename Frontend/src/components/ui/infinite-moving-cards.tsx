"use client";

import { Star } from "@mui/icons-material";
import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";

interface Item {
  quote: string;
  name: string;
  img: string;
}

interface InfiniteMovingCardsProps {
  items: Item[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;

    if (container && scroller) {
      const scrollerContent = Array.from(scroller.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scroller.appendChild(duplicatedItem);
      });

      setDirection();
      setSpeed();
      setStart(true);
    }
  }, []);

  const setDirection = () => {
    const container = containerRef.current;
    if (container) {
      container.style.setProperty(
        "--animation-direction",
        direction === "left" ? "normal" : "reverse"
      );
    }
  };

  const setSpeed = () => {
    const container = containerRef.current;
    if (container) {
      let duration;
      switch (speed) {
        case "fast":
          duration = "20s";
          break;
        case "normal":
          duration = "40s";
          break;
        case "slow":
          duration = "80s";
          break;
        default:
          duration = "20s";
      }
      container.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <ReviewCard key={item.name} item={item} />
        ))}
      </ul>
    </div>
  );
};

interface ReviewCardProps {
  item: Item;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ item }) => {
  return (
    <li className="relative rounded shadow-md flex-shrink-0 py-3 px-5 w-72 bg-white">
      <blockquote>
        <div
          aria-hidden="true"
          className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
        ></div>

        <div className="relative z-20 py-4 flex text-gray-600 flex-row items-center">
          <span className="flex flex-col gap-1 items-center">
            <span>
              <img className="rounded-full w-[4.5rem]" src={item.img} alt="" />
              <img
                className="absolute -mt-6 ml-12 bg-white p-[1px] rounded-full w-5"
                src="/reviews/google.png"
                alt=""
              />
            </span>
            <span className="text-sm leading-[1.6] mt-1 font-semibold">
              {item.name}
            </span>

            <span className="text-[#FBBC04]">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </span>
            <span className="relative z-20 text-sm text-gray-600 leading-[1.6] mt-3 font-normal">
              {item.quote}
            </span>
          </span>
        </div>
      </blockquote>
    </li>
  );
};
