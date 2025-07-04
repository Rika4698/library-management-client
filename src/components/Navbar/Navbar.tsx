import { Link, NavLink } from "react-router-dom";
import { LuMenu, LuX } from "react-icons/lu";
import { useState } from "react";




const Navbar = () => {
    
    const [isOpen, setIsOpen] = useState(false);
   
      
    const navOptions=<>
  <li className="group max-lg:border-b max-lg:py-3 px-3 relative"><NavLink to="/"
              onClick={() => setIsOpen(false)}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ?  "bg-[#bd1ddd] font-bold text-lg font-serif px-4 py-2 rounded-3xl text-white transform duration-300 hover:scale-110" : "font-medium text-slate-800 text-lg font-serif "
                }>Home</NavLink></li>
               
                    <li className="group max-lg:border-b max-lg:py-3 px-3 relative"><NavLink to="/create-book" onClick={() => setIsOpen(false)}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ?  "bg-[#bd1ddd] font-bold text-lg font-serif px-4 py-2 rounded-3xl text-white transform duration-300 hover:scale-110 " : "font-medium text-slate-800 text-lg font-serif dark:text-white "
                }>Add Book</NavLink></li>

                    <li className="group max-lg:border-b max-lg:py-3 px-3 relative"><NavLink to="/books"  onClick={() => setIsOpen(false)}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ?  "bg-[#bd1ddd] font-bold text-lg font-serif px-4 py-2 rounded-3xl text-white transform duration-300 hover:scale-110" : "font-medium text-slate-800 text-lg font-serif dark:text-white"
                }>All Book</NavLink></li>

                    <li className="group max-lg:border-b max-lg:py-3 px-3 relative"><NavLink to="/about" onClick={() => setIsOpen(false)}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ?  "bg-[#bd1ddd] font-bold text-lg font-serif px-4 py-2 rounded-3xl text-white transform duration-300 hover:scale-110 " : "font-medium text-slate-800 text-lg font-serif dark:text-white"
                }>Borrow Summary</NavLink></li>

                    <li className="group max-lg:border-b max-lg:py-3 px-3 relative"><NavLink to="/contact" onClick={() => setIsOpen(false)}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ?  "bg-[#bd1ddd] font-bold text-lg font-serif px-4 py-2 rounded-3xl text-white transform duration-300 hover:scale-110" : "font-medium text-slate-800 text-lg font-serif dark:text-white"
                }>About Us</NavLink></li>
                    
                    
                    
                
  
                 </>
    return (
        <div>
      
     <div className="relative ">

      <nav className="bg-white dark:bg-slate-800 shadow-md fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-600 ">
        <div className=" flex  items-center justify-between mx-auto p-3 lg:px-8 ">
          {/* Logo Section */}
          <Link to="/">
              <img className=" w-[100px] h-[60px] ml-4 md:w-[100px] lg:w-[100px] lg:h-[60px] lg:ml-5  " src="https://i.ibb.co/bMfXh2BM/bookshelf-high-resolution-logo-transparent.png" alt="" />
            </Link>


             {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
        className={`fixed top-0 left-0 w-full min-h-screen bg-black bg-opacity-50 z-40 lg:hidden transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      )}



      {/* Mobile Menu Panel */}
      
      <div
        className={`fixed top-0 left-0 bottom-0 w-2/3 sm:w-1/2 bg-white dark:bg-gray-800 lg:h-full
         min-[350px]:h-screen overflow-y-auto z-50 p-6  transition-transform duration-300  ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:static lg:flex lg:items-center lg:w-auto lg:p-0 lg:translate-x-0`}
      >
        <div className="h-full overflow-y-auto ">
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-full   dark:bg-white text-gray-800 dark:text-gray-800 z-[100]"
          >
            <LuX size={25} />
          </button>

          <div className="p-6 pt-16 lg:hidden">
          

            {/* Mobile Navigation Links */}
            <ul className="space-y-4 lg:hidden">
             {navOptions}
            </ul>
          </div>
        </div>
      </div>
 

 {/* Desktop Navigation */}
 <div className="hidden lg:flex navbar-center  ">
            <ul className=" flex ml- items-center  space-x-5 xl:space-x-9 ">
             {navOptions}
            </ul>
          </div>


         {/* Mobile Menu Button */}
 <div className="flex items-center gap-x-3 btn max-[639px]:mx-2 sm:mx-6 md:mx-6    lg:hidden">
            <button onClick={() => setIsOpen(true)} className="lg:hidden ">
              <LuMenu size={25} />
            </button>
          </div>

         
        </div>
      </nav>

     
    </div>


        </div>
    );
};

export default Navbar;