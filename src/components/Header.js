// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FiSun, FiWind, FiDroplet } from 'react-icons/fi';

// const Header = () => {
//   return (
//     <header className="bg-gradient-to-r from-blue-800 via-green-600 to-yellow-500 text-white shadow-md">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         <h1 className="text-3xl font-extrabold tracking-wide">
//           Renewable Energy Predictor
//         </h1>
//         <nav className="flex space-x-6">
//           <Link
//             to="/"
//             className="flex items-center space-x-2 transition duration-300 hover:text-yellow-300"
//           >
//             <FiSun className="text-xl" />
//             <span className="text-lg font-medium">Solar</span>
//           </Link>
//           <Link
//             to="/wind"
//             className="flex items-center space-x-2 transition duration-300 hover:text-blue-300"
//           >
//             <FiWind className="text-xl" />
//             <span className="text-lg font-medium">Wind</span>
//           </Link>
//           <Link
//             to="/hydro"
//             className="flex items-center space-x-2 transition duration-300 hover:text-green-300"
//           >
//             <FiDroplet className="text-xl" />
//             <span className="text-lg font-medium">Hydro</span>
//           </Link>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

// import React from 'react';

// const Header = () => {
//   return (
//     <header className="sticky top-0 z-50 bg-transparent backdrop-blur-md py-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center px-6">
//         <h1 className="text-3xl font-bold text-white tracking-wide">
//           Renewable Energy Predictor
//         </h1>
//         <nav className="flex space-x-6">
//           <a href="#solar" className="hover:text-yellow-300">
//             Solar
//           </a>
//           <a href="#wind" className="hover:text-blue-300">
//             Wind
//           </a>
//           <a href="#hydro" className="hover:text-green-300">
//             Hydro
//           </a>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;


const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-md py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          Renewable Energy Predictor
        </h1>
        <nav className="flex space-x-6">
          <a href="/solar" className="hover:text-yellow-300">
            Solar
          </a>
          <a href="/wind" className="hover:text-blue-300">
            Wind
          </a>
          <a href="/hydro" className="hover:text-green-300">
            Hydro
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;