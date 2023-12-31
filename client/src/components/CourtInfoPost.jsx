import React from "react";
import { Box, Tooltip, Typography, useMediaQuery } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
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
import FlexBetween from "components/FlexBetween";

const CourtInfoPost = ({ selectedCourtInfo }) => {
  const isMobileScreen = useMediaQuery("(max-width: 600px)");
  return (
      <FlexBetween ml="0.5rem">
        <FlexBetween flexDirection={isMobileScreen ? "column" : "row"}>
          {/* Ground type */}
          {selectedCourtInfo && selectedCourtInfo.ground ? (
            <>
              {selectedCourtInfo.ground === "grass" && (
                <Tooltip title="Grass court" arrow placement='top'>
                  <CircleIcon sx={{ color: "green", marginRight: "0.5rem" }} />
                </Tooltip>
              )}
              {selectedCourtInfo.ground === "clay" && (
                <Tooltip title="Clay court" arrow placement='top'>
                  <CircleIcon sx={{ color: "orange", marginRight: "0.5rem" }} />
                </Tooltip>
              )}
              {selectedCourtInfo.ground === "hard" && (
                <Tooltip title="Hard court" arrow placement='top'>
                  <CircleIcon sx={{ color: "blue", marginRight: "0.5rem" }} />
                </Tooltip>
              )}
            </>
          ) : (
            "N/A"
          )}

        {/* Working hours */}
          {selectedCourtInfo ? (
            <Tooltip
              title={`Working hours: ${selectedCourtInfo.startTime} -> ${selectedCourtInfo.endTime}`}
              arrow
              placement="top"
            >
              <ScheduleOutlinedIcon sx={{ marginRight: "0.5rem" }} />
            </Tooltip>
          ) : (
            <Typography variant="subtitle1">N/A</Typography>
          )}
        </FlexBetween>


        {/* Facilities */}
        {selectedCourtInfo && selectedCourtInfo.facilities && selectedCourtInfo.facilities.length > 0 ? (
          <Box display="flex"  flexWrap={isMobileScreen ? "wrap" : "nowrap"}>
            {selectedCourtInfo.facilities.map((facility) => (
              <Tooltip key={facility} title={facility} arrow placement="top">
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
          </Box>
        ) : (
          <Typography variant="subtitle1">N/A</Typography>
        )}

      </FlexBetween>
  );
};

export default CourtInfoPost;
