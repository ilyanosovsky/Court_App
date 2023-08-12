// Fetch the list of courts
export const fetchCourts = async () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  try {
    const response = await fetch(`${BASE_URL}/courts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch courts");
    }

    const courts = await response.json();
    return courts;
  } catch (error) {
    console.error("Error fetching courts:", error);
    throw error;
  }
};