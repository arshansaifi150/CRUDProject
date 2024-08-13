import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";

const testimonials = [
  {
    quote:
      "Symbiosis Infra truly cares about their clients and it shows in the exceptional service they provide. From start to finish, their team was there to guide me through the home buying process in Gurgaon. They listened to my needs and preferences and helped me find the perfect property.",
    name: "Anish Sehgal",
    img: "/img/reviews/anish.png",
  },
  {
    quote:
      "First-time homebuyer here, and Symbiosis Infra made it a smooth journey. Their commitment to customer satisfaction and quick responses post-sale are commendable.",
    name: "Pooja Gorai",

    img: "/img/reviews/pooja.png",
  },
  {
    quote:
      "Kudos to Symbiosis Infra for their exemplary services. Their dedication to understanding my needs and finding the right property showcased their commitment to client satisfaction. Highly recommended for anyone looking for a reliable broker in Gurgaon.",
    name: "Navjot Grewal",
    img: "/img/reviews/navjot.png",
  },
  {
    quote:
      "Symbiosis Infra doesn't just sell properties; they sell dreams! Thanks to their dedication and expertise, I found my dream home in Gurgaon. Trustworthy and highly professional.",
    name: "Sujit Kushwaha",

    img: "/img/reviews/sujit.png",
  },
  {
    quote:
      "I had a great experience working with Symbiosis Infra. They helped me find my dream home in Gurgaon, and their team was always available to answer my questions. Highly recommend.",
    name: "Deepak Rao",
    img: "/img/reviews/deepak.png",
  },
  {
    quote:
      "I bought commercial properties with the help of Symbiosis Infra. Brilliant service provider.",
    name: "Sarthak Taneja",

    img: "/img/reviews/sarthak.png",
  },
  {
    quote:
      "Symbiosis Infra exceeded my expectations in every way. Their team's expertise and commitment to client satisfaction are truly commendable. They made the home buying process in Gurgaon seamless and stress-free. I highly recommend their services to anyone looking for their dream home.",
    name: "Arushi Sharma",
    img: "/img/reviews/arushi.png",
  },
  {
    quote:
      "Symbiosis Infra is amazing! They helped me find a fantastic place near Dwarka Expressway.",
    name: "Ankit Tiwari",
    img: "/img/reviews/ankit.png",
  },
  {
    quote:
      "Symbiosis Infra is a leading real estate company in Gurgaon. The team is professional, and always goes above and beyond to help their clients. They helped me find the perfect property in no time and made the entire process easy.",
    name: "Divya Bansal",
    img: "/img/reviews/divya.png",
  },
  {
    quote:
      "Choosing Symbiosis Infra was a game-changer! Their commitment to transparency made the deal seamless. The team's dedication and personalized approach truly set them apart. Gurgaon's hidden gem in real estate.",
    name: "Sudhir Maurya",

    img: "/img/reviews/sudhir.png",
  },
  {
    quote:
      "The best real estate company to visit in Gurgaon for Property Purchase/Sale. They are very polite and ensure that the deal gets closed amicably and hustle free.",
    name: "Sneha Bansal",
    img: "/img/reviews/sneha.png",
  },
];

const Reviews = () => {
  return (
    <div className="flex flex-col items-center mt-[12%] lg:mt-[16%] md:mt-[12%] xl:mt-10 tabmargin">
      <div className="lg:w-9/12 w-10/12   lg:bg-[#f5f5f7] text-left xl:py-[3%] text-gray-600">
        <h1 className="text-2xl lg:text-4xl pb-5 ">
          Hear from Our Satisfied Clients
        </h1>
        <p className="text-lg">
          Discover what our valued customers have to say about their experiences
          with us. These genuine testimonials reflect our commitment to
          excellence.
        </p>
      </div>
      <div className="lg:flex flex-wrap justify-center items-center ">
        <div className="flex lg:w-2/12 lg:-mt-2 tabm mt-10">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
