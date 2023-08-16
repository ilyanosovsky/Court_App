import React from "react";
import {
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import {
  LocalParkingOutlined,
  ShowerOutlined,
  ChairOutlined,
  WbIncandescentOutlined,
  WcOutlined,
  CheckroomOutlined,
  ShoppingCartOutlined,
  DiningOutlined,
  WifiOutlined,
  LocalHospital,
  FitnessCenterOutlined,
} from "@mui/icons-material";

const CourtInfo = ({ selectedCourtInfo }) => {
  return (
    <Box
      sx={{
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="subtitle1" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <strong>Ground type:</strong>
        {selectedCourtInfo.ground === "grass" && (
          <Tooltip title="Grass court" arrow placement='top'>
            <CircleIcon sx={{ color: "green", marginLeft: "0.5rem" }} />
          </Tooltip>
        )}
        {selectedCourtInfo.ground === "clay" && (
          <Tooltip title="Clay court" arrow placement='top'>
            <CircleIcon sx={{ color: "orange", marginLeft: "0.5rem" }} />
          </Tooltip>
        )}
        {selectedCourtInfo.ground === "hard" && (
          <Tooltip title="Hard court" arrow placement='top'>
            <CircleIcon sx={{ color: "blue", marginLeft: "0.5rem" }} />
          </Tooltip>
        )}
        {!selectedCourtInfo.ground && " N/A"}
      </Typography>
      {selectedCourtInfo.facilities && selectedCourtInfo.facilities.length > 0 ? (
        <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center" }}>
          <strong>Facilities:</strong>{" "}
          {selectedCourtInfo.facilities.map((facility) => (
            <Tooltip key={facility} title={facility} arrow placement='top'>
              {facility === "parking" ? (
                <LocalParkingOutlined sx={{ marginRight: "0.5rem" }} />
              ) : facility === "shower" ? (
                <ShowerOutlined sx={{ marginRight: "0.5rem" }} />
              ) : facility === "seats" ? (
                <ChairOutlined sx={{ marginRight: "0.5rem" }} />
              ) : facility === "light" ? (
                <WbIncandescentOutlined sx={{ marginRight: "0.5rem" }} />
              ) : facility === "WC" ? (
                <WcOutlined sx={{ marginRight: "0.5rem" }} />
              ) : facility === "locker" ? (
                <CheckroomOutlined sx={{ marginRight: "0.5rem" }} />
              ) : facility === "shop" ? (
                <ShoppingCartOutlined sx={{ marginRight: "0.5rem" }} />
              ) : facility === "cafe" ? (
                <DiningOutlined sx={{ marginRight: "0.5rem" }} />
              ) : facility === "wifi" ? (
                <WifiOutlined sx={{ marginRight: "0.5rem" }} />
              ) : facility === "doctor" ? (
                <LocalHospital sx={{ marginRight: "0.5rem" }} />
              ) : facility === "gym" ? (
                <FitnessCenterOutlined sx={{ marginRight: "0.5rem" }} />
              ) : (
                // Default case if facility is not parking or shower
                `${facility}, `
              )}
            </Tooltip>
          ))}
        </Typography>
      ) : (
        <Typography>
          <strong>Facilities:</strong> N/A
        </Typography>
      )}
      <Typography>
        <strong>Working hours:</strong>{" "}
        {selectedCourtInfo.startTime && selectedCourtInfo.endTime
          ? ` ${selectedCourtInfo.startTime} -> ${selectedCourtInfo.endTime}`
          : " N/A"}
      </Typography>
    </Box>
  );
};

export default CourtInfo;
