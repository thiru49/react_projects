import { useState } from "react";

const useGeoLocation = (defalut = null) => {
  const [position, setPosition] = useState(defalut);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("your browser not support geoLoaction");
    setisLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setisLoading(false);
      },
      (error) => {
        setError(error.message);
        setisLoading(false);
      }
    );
  }

  return { position, isLoading, getPosition, error };
};

export default useGeoLocation;
