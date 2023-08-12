// Fetch the list of courts
export const fetchCourts = async () => {
  try {
    const response = await fetch(`http://localhost:3001/courts`, {
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