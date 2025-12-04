import ServiceCard from "./ServiceCard";

const Services = ({ services = [] }) => {
 
  return (
    <div className="mt-4 bg-slate-50">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-orange-600">Services</h3>
        <h2 className="text-5xl">Our Service Area</h2>
        <p>
          The majority have suffered alteration in some form, by injected humour, or randomised
          <br />
          words which don't look even slightly believable.
        </p>
        <br />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
        {services.length > 0 ? (
          services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))
        ) : (
          <p className="text-center col-span-full text-red-500">
            No services available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Services;
