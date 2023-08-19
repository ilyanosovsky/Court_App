# Court App

Welcome to the Court App! This is a social media platform designed for tennis enthusiasts to connect, share, and engage with each other. The app provides various features for users to discover tennis courts, schedule matches, and connect with other players.

![Court App Screenshot](./main-dark.png)
![Court App Screenshot](./main-light.png)

## Features

- **User Registration and Authentication:** Users can create accounts, log in, and access their profiles.

- **Tennis Court Information:** Explore detailed information about different tennis courts, including location, facilities, and working hours.

- **Match Scheduling:** Schedule and organize matches with other users based on court availability.

- **Weather Forecast:** Stay informed about the weather conditions in your area for optimal match planning.

- **Dark/Light Mode:** Customize the app's appearance with dark or light mode themes.

## Installation and Setup

1. Clone the repository to your local machine:

- git clone https://github.com/ilyanosovsky/court-app.git

2. Navigate to the project directory:

- cd court-app

3. Install project dependencies:

- npm install

4. Create a `.env` file in the root directory and set the necessary environment variables:

- REACT_APP_BASE_URL=https://api.example.com
- REACT_APP_WEATHER_API_KEY=your-weather-api-key

API_key you can find after your registration on https://openweathermap.org/

5. Start the development server:

- npm start


6. Open your browser and access the app at `http://localhost:3000`.

## Technologies Used

- React https://react.dev/
- Redux Toolkit (for state management) https://redux-toolkit.js.org/
- Material-UI (for UI components) https://mui.com/
- Formik and Yup (for form handling and validation) https://www.npmjs.com/package/formik https://www.npmjs.com/package/yup
- MongoDB for DataBase https://www.mongodb.com/
- React Router (for routing)
- Fetch API (for data fetching)
- OpenWeather API (for weather forecasts) https://openweathermap.org/
- Leaflet React (for Map handling) https://react-leaflet.js.org/
- Render (for deployment web service live) https://render.com/

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

---

Feel free to reach out if you have any questions or need assistance. Enjoy using the Court App!
