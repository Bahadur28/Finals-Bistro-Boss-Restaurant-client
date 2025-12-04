import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";

const BookService = () => {
    const service = useLoaderData();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    if (!service) {
        return <p className="text-center text-red-500 mt-10">Service not found!</p>;
    }

    const { title, _id, price, img } = service;

    const handleBookService = async (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;

        const booking = {
            customerName: name,
            email,
            img,
            date,
            service: title,
            service_id: _id,
            price: price
        };

        try {
            const res = await fetch('https://car-doctor-server-seven-dusky.vercel.app/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking)
            });

            const data = await res.json();

            if (data.insertedId) {
                alert('Service Booked Successfully!');
                navigate('/bookings'); // redirect after booking
            } else {
                alert('Booking failed. Please try again.');
            }
        } catch (error) {
            console.error("Booking error:", error);
            alert('Network error. Please try again later.');
        }
    };

    return (
        <div>
            <h2 className="text-center text-3xl p-4">Book Service: {title}</h2>
            <form onSubmit={handleBookService}>
                <div className="grid grid-cols-1 md:grid-cols-2 max-w-sm shadow-2xl bg-base-300 p-8 gap-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={user?.displayName || ''}
                            name="name"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            defaultValue={user?.email || ''}
                            className="input input-bordered"
                            required
                            readOnly
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amount</span>
                        </label>
                        <input type="text" defaultValue={'$' + price} className="input input-bordered" readOnly />
                    </div>
                </div>

                <div className="form-control mt-6 text-center">
                    <input
                        className="btn btn-primary btn-block bg-blue-600 text-white"
                        type="submit"
                        value="Order Confirm"
                    />
                </div>
            </form>
        </div>
    );
};

export default BookService;
