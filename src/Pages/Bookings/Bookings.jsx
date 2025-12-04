import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import BookingRow from "./BookingRow";
import axios from "axios";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const url = `https://car-doctor-server-seven-dusky.vercel.app/bookings?email=${user?.email}`;
    useEffect(() => {
         
        axios.get(url, {withCredentials: true})
        .then(res => {
            setBookings(res.data);
        })
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => setBookings(data))
    }, [url]);

    const handleDelete = id => {
        const proceed = confirm('Are you sure you want to delete?');
        if (proceed) {
            fetch(`https://car-doctor-server-seven-dusky.vercel.app/bookings/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);

                    if (data.deletedCount > 0) {
                        alert('Deleted successfully');
                        const remaining = bookings.filter(booking => booking._id !== id);
                        setBookings(remaining);
                    }
                })
                .catch(err => console.error(err));
        }
    }


    const handleBookingConfirm = id => {
        fetch(`https://car-doctor-server-seven-dusky.vercel.app/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const update = bookings.find(booking => booking._id === id);
                    update.status = 'confirm'
                    const newBookings = [update, ...remaining];
                    setBookings(newBookings);
                }
            })

    }

    return (
        <div>
            <h2 className="text-5xl">Your Bookings: {bookings.length}</h2>
            <div className="overflow-x-auto w-full p-5">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-slate-300">
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleBookingConfirm={handleBookingConfirm}
                            ></BookingRow>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Bookings;