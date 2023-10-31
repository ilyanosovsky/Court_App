import React from "react";
import {
  Box,
  Button,
} from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: ("../assets/marker.png"),
  iconSize: [40, 40],
  iconAnchor: [17, 46], 
  popupAnchor: [0, -46], 
});

const MapWidget = ({ showMap, toggleMap, darkMode, courts, handleMarkerClick }) => {
  return (
    <Box sx={{padding: "1rem 0rem", textAlign: "center"}}>
      {/* Map Toggle Button */}
      <Button onClick={toggleMap} sx={{ width: "100%" }}>
        {showMap ? "Hide Map" : "Show Map"}
      </Button>
      {/* Leaflet Map */}
      {showMap && (
        <MapContainer
          center={[32.794044, 34.989571]} // Set the initial map center coordinates
          zoom={12} // Set the initial zoom level
          style={{ width: "100%", height: "400px", marginTop: "1rem" }}
        >
          {/* Conditionally render the TileLayer based on dark mode */}
          <TileLayer
            url={
              darkMode
                ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=b703dca8-561a-4806-8599-8219a9ba0304"
                : "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=b703dca8-561a-4806-8599-8219a9ba0304"
            }
          />

          {/* Render markers for each court */}
          {courts.map((court) => (
            <Marker
              key={court._id}
              position={[court.latitude, court.longitude]} // Use the actual coordinates of the court
              icon={markerIcon}
              eventHandlers={{
                click: () => handleMarkerClick(court),
              }}
            >
              <Popup>{court.courtName}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </Box>
  );
};

export default MapWidget;