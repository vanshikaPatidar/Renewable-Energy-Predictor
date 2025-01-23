// const HeroSection = () => {
//   return (
//     <section className="hero-section">
//       <div className="video-container">
//         <video className="video-bg" autoPlay loop muted src="src\components\assets\wind.mp4" />
//         <video className="video-bg" autoPlay loop muted src="src\components\assets\wind.mp4" />
//         <video className="video-bg" autoPlay loop muted src="src\components\assets\wind.mp4" />
//       </div>
//       <div className="overlay"></div>
//       <div className="content">
//         <h1 className="text-5xl font-bold">Sustainable Energy Starts Here</h1>
//         <p className="text-lg mt-4">
//           Leverage AI to find optimal sites for renewable energy installations.
//         </p>
//         <div className="mt-6 space-x-4">
//           <button className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700">
//             Explore Now
//           </button>
//           <button className="px-6 py-3 bg-green-600 rounded hover:bg-green-700">
//             Learn More
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full grid grid-cols-3 gap-0">
        <video
          className="object-cover w-full h-full opacity-50"
          autoPlay
          loop
          muted
          src="/assets/solar.mp4" // Ensure the path points to the public/assets directory
        />
        <video
          className="object-cover w-full h-full opacity-50"
          autoPlay
          loop
          muted
          src="/assets/wind.mp4" // Ensure the path points to the public/assets directory
        />
        <video
          className="object-cover w-full h-full opacity-50"
          autoPlay
          loop
          muted
          src="/assets/hydro.mp4" // Ensure the path points to the public/assets directory
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center text-white h-full">
        <h1 className="text-5xl font-bold">Sustainable Energy Starts Here</h1>
        <p className="text-lg mt-4">
          Leverage AI to find optimal sites for renewable energy installations.
        </p>
        <div className="mt-6 space-x-4">
          <button className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700">
            Explore Now
          </button>
          <button className="px-6 py-3 bg-green-600 rounded hover:bg-green-700">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
