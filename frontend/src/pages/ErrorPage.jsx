import { NavLink } from "react-router";
const ErrorPage = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-52">
            <h1 className="text-2xl font-bold mt-10">Oops, page not found!</h1>
            <p className="text-gray-600">The page you are looking for does not exist.</p>
            <NavLink to="/" className="btn bg-white hover:shadow-md rounded-xl hover:scale-105 transition-all duration-300 bg-linear-to-br from-purple-600 via-slate-700 to-purple-400 text-white mt-5 px-5">
                Go Home
            </NavLink>
        </div>
    );
};

export default ErrorPage;