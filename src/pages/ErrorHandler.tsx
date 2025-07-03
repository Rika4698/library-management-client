import { Link } from "react-router-dom";


const ErrorHandler = () => {
    return (
            <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <img
          src="https://i.ibb.co/Q8ksmw4/Oops-404-Error-with-a-broken-robot-rafiki-1.png"
          alt=""
          className="p-1 w-[400px] h-[400px]"
        />

        <p className="mt-4 text-[#545454] mb-2">
          Sorry you hit the wrong page.
        </p>
        <Link to="/">
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-gray-500 transition-colors duration-300">
            Go Back To Home
          </button>
        </Link>
      </div>
    </div>
    );
};

export default ErrorHandler;