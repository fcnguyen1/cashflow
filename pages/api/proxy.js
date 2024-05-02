// import fetch from "node-fetch";

let currentDate = new Date();

function getLastThursday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysToSubtract = (dayOfWeek + 7 - 4) % 7;

  const lastThursday = new Date(
    today.getTime() - daysToSubtract * 24 * 60 * 60 * 1000
  );

  const year = lastThursday.getFullYear();
  const month = String(lastThursday.getMonth() + 1).padStart(2, "0");
  const day = String(lastThursday.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

const formattedDate = getLastThursday();

const apiUrl = `https://api.stlouisfed.org/fred/series/observations?series_id=MORTGAGE30US&api_key=5773c8c2395472c8ca8ad0cba5d7f3bd&file_type=json&observation_start=${formattedDate}`;

export default async function handler(req, res) {
  try {
    // make a new fetch call to the 3rd party API
    const response = await fetch(apiUrl);
    // parse the response to json
    const data = await response.json();
    // below is the format to send a response
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
