// import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

// const GoogleMap = forwardRef((_, ref) => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const buildMap = () => {
//       const embedMap = `
//         <iframe 
//           width="980" 
//           height="650" 
//           frameborder="0" 
//           scrolling="no" 
//           marginheight="0" 
//           marginwidth="0" 
//           src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=India&amp;aq=&amp;sll=20.5937,88.9629&amp;sspn=10.54782,10.612549&amp;ie=UTF8&amp;hq=&amp;hnear=India&amp;t=m&amp;ll=20.5937,88.9629&amp;spn=20.117583,20.336113&amp;z=5&amp;iwloc=A&amp;output=embed">
//         </iframe>`;
//       mapRef.current.innerHTML = embedMap;
//     };

//     buildMap();
//   }, []);

//   // Expose a method to update the map center dynamically
//   useImperativeHandle(ref, () => ({
//     updateCenter: (lat, lng) => {
//       const embedMap = `
//         <iframe 
//           width="980" 
//           height="650" 
//           frameborder="0" 
//           scrolling="no" 
//           marginheight="0" 
//           marginwidth="0" 
//           src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=&amp;sll=${lat},${lng}&amp;ie=UTF8&amp;hq=&amp;hnear=&amp;t=m&amp;ll=${lat},${lng}&amp;spn=25.5937,100.9629&amp;z=10&amp;iwloc=A&amp;output=embed">
//         </iframe>`;
//       mapRef.current.innerHTML = embedMap;
//     },
//   }));

//   return <div ref={mapRef} className="map" style={{ width: '100%', height: '100%' }}></div>;
// });

// export default GoogleMap;


import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';

const GoogleMap = forwardRef((_, ref) => {
  const mapRef = useRef(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Initial map setup for India
    const embedMap = `
      <iframe 
        width="980" 
        height="650" 
        frameborder="0" 
        scrolling="no" 
        marginheight="0" 
        marginwidth="0" 
        src="https://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=India&aq=&sll=20.5937,88.9629&sspn=10.54782,10.612549&ie=UTF8&hq=&hnear=India&t=m&ll=20.5937,88.9629&spn=20.117583,20.336113&z=5&iwloc=A&output=embed">
      </iframe>`;
    mapRef.current.innerHTML = embedMap;
  }, []);

  useImperativeHandle(ref, () => ({
    updateCenter: (lat, lng) => {
      const newMap = `
        <iframe 
          width="980" 
          height="650" 
          frameborder="0" 
          scrolling="no" 
          marginheight="0" 
          marginwidth="0" 
          src="https://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=&sll=${lat},${lng}&ie=UTF8&hq=&hnear=&t=m&ll=${lat},${lng}&spn=20.117583,20.336113&z=10&iwloc=A&output=embed">
        </iframe>`;
      mapRef.current.innerHTML = newMap;
    }
  }));

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/geocode?address=${encodeURIComponent(address)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.lat && data.lng) {
        ref.current.updateCenter(data.lat, data.lng);
      } else {
        console.error('Invalid response structure:', data);
        alert('Unable to locate the city. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching geocode response:', error);
      alert('An error occurred while searching. Please check the server and try again.');
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
        placeholder="Enter city or location"
      />
      <button onClick={handleSearch}>Search</button>
      <div ref={mapRef} className="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
});

export default GoogleMap;

