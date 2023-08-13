import { 
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { 
  Search
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

import { useRef, useState, useEffect } from "react";

const Api_key = "c707f05e6ee4c6a3af2dc3255a317531";


const WeatherForecastWidget = () => {
  const { palette } = useTheme();
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState([]);
  const [loading, setLoading] = useState(false);

  const WeatherTypes = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
  ];

  const fetchWeather = async (location) => {
    setLoading(true);
    setShowWeather([]);

    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${Api_key}`;
      const response = await fetch(URL);
      const data = await response.json();

      setApiData(data);

      if (data.cod === 404 || data.cod === 400) {
        setShowWeather([
          {
            type: "Not Found",
            img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
          },
        ]);
      } else {
        const weatherType = data.weather[0].main;
        const matchingWeather = WeatherTypes.find(
          (weather) => weather.type === weatherType
        );

        if (matchingWeather) {
          setShowWeather([matchingWeather]);
        }
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setShowWeather([
        {
          type: "Error",
          img: "https://cdn-icons-png.flaticon.com/512/56/56994.png",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch weather data for the default location "Haifa"
    fetchWeather("Haifa");
  }, []);

  const handleSearch = () => {
    if (inputRef.current) {
      const location = inputRef.current.value.trim();
      if (location !== "") {
        fetchWeather(location);
      }
    }
  };

  
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Weather Forecast
        </Typography>
        <Typography color={medium}>Current City: Haifa</Typography>
      </FlexBetween>
      <FlexBetween
        backgroundColor={neutralLight}
        borderRadius="9px"
        gap="3rem"
        padding="0.1rem 1.5rem"
      >
        <InputBase
          placeholder="Enter Your Location"
          type="text"
          inputRef={inputRef} // Correctly attach inputRef here
        />
        <IconButton onClick={handleSearch}>
          <Search />
        </IconButton>
      </FlexBetween>

      <FlexBetween>
        {showWeather.map((weather) => (
          <img
            key={weather.type}
            src={weather.img}
            alt={weather.type}
            style={{ width: "50px", height: "50px" }}
          />
        ))}
      </FlexBetween>

      {apiData && (
        <Typography color={medium} m="0.5rem 0">
          {/* Display weather information here */}
          Temperature: {apiData.main.temp}°C<br />
          Humidity: {apiData.main.humidity}%
        </Typography>
      )}
    </WidgetWrapper>
  );
};

export default WeatherForecastWidget;