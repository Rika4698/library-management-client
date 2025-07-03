import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <footer className="bg-transparent bg-footer-us bg-cover  shadow-2xl shadow-gray-400 mt-20">
      <div className="px-10 mx-auto footer p-10 flex flex-col md:flex-row justify-between items-center md:items-start ">
        <aside className="flex flex-col items-center md:items-start">
          <Link to={"/"} className="text-xl font-semibold">
            <img
              src="https://i.ibb.co/bMfXh2BM/bookshelf-high-resolution-logo-transparent.png"
              className="w-[100px] h-[60px]"
              alt=" Logo"
            />
          </Link>
          <address className="not-italic mt-3">Dhaka, Bangladesh</address>
          <a href="tel:+7878788" className="hover:underline">
            +88017878787878
          </a>
          <p>bookshelf@info.com</p>
        </aside>
        <nav className="flex flex-col items-center md:items-start">
          <h6 className="footer-title">Our Books</h6>
          <ul className="flex flex-row md:flex-col gap-2 footer-links mt-2">
            <li>
              <Link to={"/"}>All Book</Link>
            </li>
            
          </ul>
        </nav>
        <nav className="flex flex-col items-center md:items-start">
          <h6 className="footer-title">Useful Links</h6>
          <ul className="flex flex-row md:flex-col gap-2 footer-links mt-2">
            <li>
              <Link to={"/"}>About Us</Link>
            </li>
            <li className="md:hidden">•</li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </nav>
        <nav className="flex flex-col items-center md:items-start">
          <h6 className="footer-title">Social Links</h6>
          <ul className="flex flex-row gap-2 mt-1 footer-links mt-2">
            <li>
              <Link to={"/"}>
                <FaLinkedin className="text-3xl text-purple-500 bg-white" />
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <FaFacebookSquare className="text-3xl text-purple-500 bg-white" />
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <FaInstagramSquare className="text-3xl text-purple-500 bg-white" />
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <FaTwitterSquare className="text-3xl text-purple-500 bg-white" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* copyright text */}
      <div className="text-center text-[12px] pb-4">
        @2025 • All Rights Reserved
      </div>
    </footer>
    );
};

export default Footer;