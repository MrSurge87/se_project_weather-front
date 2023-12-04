const weatherOptions = [
  { url: require("../images/sunnyday.svg").default, day: true, type: "sunny" },
  {
    url: require("../images/cloudyday.svg").default,
    day: true,
    type: "cloudy",
  },
  { url: require("../images/fogday.svg").default, day: true, type: "fog" },
  { url: require("../images/rainday.svg").default, day: true, type: "rain" },
  { url: require("../images/snowday.svg").default, day: true, type: "snow" },
  { url: require("../images/stormday.svg").default, day: true, type: "storm" },
  { url: require("../images/moon.svg").default, day: false, type: "moon" },
  {
    url: require("../images/cloudynight.svg").default,
    day: false,
    type: "cloudynight",
  },
  {
    url: require("../images/fognight.svg").default,
    day: false,
    type: "fognight",
  },
  {
    url: require("../images/rainnight.svg").default,
    day: false,
    type: "rainnight",
  },
  {
    url: require("../images/snownight.svg").default,
    day: false,
    type: "snownight",
  },
  {
    url: require("../images/stormnight.svg").default,
    day: false,
    type: "stormnight",
  },
];

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";

  return (
    <section className="weather" id="weather">
      <div className="weather_info"> {weatherTemp}F</div>
      <img src={imageSrcUrl} className="weather_image"></img>
    </section>
  );
};

export default WeatherCard;
