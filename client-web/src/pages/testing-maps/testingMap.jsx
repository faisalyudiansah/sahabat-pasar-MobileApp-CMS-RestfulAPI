import React, { useState } from "react";
import { GoogleMap, useLoadScript, OverlayView } from "@react-google-maps/api";
import { FaMapMarkerAlt } from "react-icons/fa";

const mapContainerStyle = {
  width: "25vw",
  height: "20vh",
};
const center = {
  lat: -7.997595650650975, // default latitude
  lng: 112.70142089431876, // default longitude
};

export default function TestingMap({onMapClick, onMarkerClick, setStoreInput}) {
  const [position, setPosition] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  console.log(position);

  function handleMapClick(event) {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setPosition(newPosition);

    if (onMapClick && typeof onMapClick === 'function') {
      onMapClick(newPosition);
    }

    setStoreInput((prevStoreInput) => ({
      ...prevStoreInput,
      longitude: newPosition.lng,
      latitude: newPosition.lat,
    }));
  }

  function handleMarkerClick() {
    if (onMarkerClick && typeof onMarkerClick === 'function' && position) {
      onMarkerClick(position);
    }
  }



  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const iconComponent = <FaMapMarkerAlt size={30} color="red" />; // Customize the size and color

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={position ? position : center}
        onClick={handleMapClick}
      >
        {position && (
          <OverlayView
            position={position}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            onClick={handleMarkerClick}
          >
            <div
              style={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
              }}
            >
              {iconComponent}
            </div>
          </OverlayView>
        )}
      </GoogleMap>
    </div>
  );
}
