import { useEffect } from 'react';

function AdUnit({ slot }) {
    useEffect(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("Adsbygoogle error", e);
      }
    }, []);
  
    return (
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client="ca-pub-3175865559242988"        // Replace with your AdSense ID
        data-ad-slot={slot}                    // Pass the slot as a prop
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    );
  }
  
  export default AdUnit;