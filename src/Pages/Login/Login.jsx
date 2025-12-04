import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import axios from 'axios';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            // Sign in using AuthContext
            const result = await signIn(email, password);
            const loggedInUser = result.user;
            const user = { email }; // Declare before using

            console.log('Logged in user:', loggedInUser);

            // Request JWT from backend
            const res = await axios.post('http://localhost:5000/jwt', user, {
                withCredentials: true
            });

            console.log(res.data);

            // Navigate after successful JWT response
            if (res.data.success) {
                navigate(location?.state?.from || '/'); // Safe navigation
            }

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-12">
                    <img src={img} alt="Login Illustration" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-500">
                    <div className="card-body mt-1">
                        <h1 className="text-3xl text-center font-bold">Login</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="input input-bordered"
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            <div className="form-control mt-6 flex justify-center">
                                <input
                                    type="submit"
                                    value="Login"
                                    className="btn btn-primary px-8 py-3 bg-blue-800 text-white w-full"
                                />
                            </div>
                        </form>
                        <p className="my-4 text-center">
                            New to Car Doctors?{' '}
                            <Link className="text-orange-700 font-bold" to="/signup">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
