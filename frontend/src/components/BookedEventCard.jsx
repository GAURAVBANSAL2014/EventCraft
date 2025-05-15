import { IoIosArrowForward } from "react-icons/io";

const BookedEventCard = ({ event }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex space-x-6">
        <img src={event.image} alt={event.name} className="w-40 h-40 md:w-48 md:h-48 object-cover rounded" />
        <div className="w-full">
          <h2 className="text-xl font-bold">{event.name}</h2>
          <p className="text-gray-600 text-md">{event.category}</p>
          <p className="text-gray-600 mt-2 text-sm">Date</p>
          <p>{event.date}</p>
          <p className="text-gray-600 mt-2 text-sm">Location</p>
          <p>{event.location}</p>
          <hr className="h-px my-2 bg-gray-300 border-0 hidden md:block"></hr>
          <div className="hidden md:block md:flex md:justify-between">
            <p className="text-blue-600">{event.tickets} ticket(s) booked</p>
            <div className="flex cursor-pointer hover:text-gray-700 hover:scale-[1.05]">
              <p>View Details</p><IoIosArrowForward className="text-md mt-1 ml-1" />
            </div>
          </div>
        </div>
      </div>
      <hr className="h-px my-3 bg-gray-300 border-0 md:hidden block"></hr>
      <div className="flex justify-between md:hidden block">
        <p className="text-blue-600">{event.tickets} ticket(s) booked</p>
        <div className="flex cursor-pointer hover:text-gray-700 hover:scale-[1.05]">
          <p>View Details</p><IoIosArrowForward className="text-md mt-1 ml-1" />
        </div>
      </div>
    </div>
  );
};

export default BookedEventCard;
