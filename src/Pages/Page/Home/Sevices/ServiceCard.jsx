import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const { title, img, price, service_id } = service; 
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/book/${service_id}`);
  };

  return (
    <div className="card max-w-sm sm:w-full md:w-80 lg:w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={img} alt={title} className="rounded-xl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-xl text-orange-500">Price: ${price}</p>
        <div className="card-actions">
          <button
            onClick={handleBookNow}
            className="btn btn-primary p-5 bg-blue-500 text-white"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
