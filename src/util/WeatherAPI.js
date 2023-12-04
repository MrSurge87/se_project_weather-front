const latitude = 44.34;
const longitude = 10.99;
const APIKey = "8948385378cb8d6c557940f79b21048f";
export const getForecastWeather = () => {
  const weatherApi =
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}
    `).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject("Error");
      }
    });

  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  return Math.ceil(temperature);
};
