import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CardCarousel from "../components/CardCarousel";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import EmenitiesModal from "../components/EmenitiesModal";
import FeedBackSection from "../ui/FeedBackSection";
import { Button } from "flowbite-react";
import calculateNumberOfDays from "../utils/numberOfDaysCalculator";
import {
  fetchHotel,
  hotelDetailSelector,
} from "../features/hotel/hotelDetailSlice";
import {
  addNumbeOfDays,
  addNumberOfRooms,
  addSelectedDates,
} from "../features/hotel/checkAvailibilitySlice";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import formateDateStr from "../utils/dateStrFromate";

const { RangePicker } = DatePicker;

function HotelDetailScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookDays, setBookDays] = useState(0);
  const [dates, setDates] = useState([]);
  const [numberOfRooms, setNumberOfRooms] = useState(0);

  const { loading, hotel, error } = useSelector(hotelDetailSelector);

  console.log(numberOfRooms);

  useEffect(() => {
    dispatch(fetchHotel(id));
  }, [id, dispatch]);

  const handleBooking = () => {
    if (hotel) {
      const startDate = formateDateStr(dates[0].$d);
      const finishDate = formateDateStr(dates[1].$d);
      if (calculateNumberOfDays(startDate, finishDate) === 0) {
        alert("Please select valid dates");
        return;
      }
      dispatch(addSelectedDates({ startDate, finishDate }));
      dispatch(addNumbeOfDays(calculateNumberOfDays(startDate, finishDate)));
      dispatch(addNumberOfRooms(numberOfRooms));
      setDates([]);
      navigate(`/hotel/booking/${hotel._id}`);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        hotel && (
          <>
            <div className="grid-3">
              <div className="grid-of-images">
                <div style={{ width: "100%", height: "100%" }}>
                  <CardCarousel images={hotel.images} flag={true} />
                </div>
              </div>
              <div>
                <ul className="w-96 text-surface dark:text-white">
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <p className="text-2xl font-medium">{hotel.hotelName}</p>
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <p className="text-xl font-medium">{hotel.location}</p>
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <Rating
                      value={hotel.rating}
                      text={`by ${hotel.noOfReviews} users.`}
                    />
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <p className="text-xl font-medium">{hotel.hotelChain}</p>
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <p className="text-md font-medium">{hotel.description}</p>
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    {hotel.amenities.map(
                      (feature, index) =>
                        index < 5 && (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                          >
                            {feature}
                          </span>
                        )
                    )}
                    {hotel.amenities.length > 5 && (
                      <EmenitiesModal
                        BtnText="See More"
                        items={hotel.amenities}
                      />
                    )}
                  </li>
                </ul>
              </div>
              <div>
                <ul className="w-96 text-surface dark:text-white">
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10 flex justify-between items-center">
                    <span className="text-2xl font-semibold">Price</span>
                    <p className="text-2xl font-medium">
                      {hotel.price} Rs/- per day
                    </p>
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <div>
                      <div className="mb-2 block">
                        <label htmlFor="numberOfRooms">
                          Select Number of Rooms
                        </label>
                      </div>
                      <select
                        id="numberOfRooms"
                        required
                        value={numberOfRooms}
                        onChange={(e) =>
                          setNumberOfRooms(parseInt(e.target.value))
                        }
                        disabled={hotel?.numberOfRooms === 0}
                      >
                        <option value="">Select number of rooms</option>
                        {Array.from(
                          { length: hotel?.numberOfRooms },
                          (_, index) => index + 1
                        ).map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10 flex justify-start items-center">
                    <span className="text-2xl font-semibold">
                      Check-in & Check-out Dates
                    </span>
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10 flex justify-center items-center gap-2">
                    <RangePicker
                      onChange={(selectedDates) => setDates(selectedDates)}
                      minDate={dayjs()}
                      className="w-full"
                    />
                  </li>
                  <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10 flex justify-between items-center">
                    <Button
                      className=" bg-[#008395] w-[100%]"
                      onClick={handleBooking}
                      disabled={
                        hotel?.numberOfRooms === 0 ||
                        numberOfRooms === 0 ||
                        dates.length !== 2
                      }
                    >
                      Book
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
            <section className="section-feedback">
              {hotel.feedbacks.map(
                ({ user, rating, comment, createdAt, response }, index) => (
                  <FeedBackSection
                    key={index}
                    user={user}
                    rating={rating}
                    comment={comment}
                    createdAt={createdAt}
                    response={response?.comment}
                    responseCreatedAt={response?.createdAt}
                  />
                )
              )}
            </section>
          </>
        )
      )}
    </>
  );
}

export default HotelDetailScreen;
