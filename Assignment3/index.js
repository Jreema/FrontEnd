const key = "rGCYG8IyPcd7WA3qUEioTY4GBaNIP38w";
const form1 = document.querySelector("#form1");

let count = 0;

function removeMe(c) {
  document.getElementById(c).remove();
}

function toggleMe(c) {
  const content = document.getElementById(`${c}`);

  if (content.childNodes[1].textContent == "+") {
    content.lastElementChild.style.display = "grid";
    content.childNodes[1].textContent = "-";
  } else {
    content.lastElementChild.style.display = "none";
    content.childNodes[1].textContent = "+";
  }
}
function changeUnit(c, unit) {
  const itemSelected = document.getElementById(c);
  const fe = itemSelected.childNodes[2].childNodes[12].firstElementChild;
  const le = itemSelected.childNodes[2].childNodes[12].lastElementChild;
  const fu = itemSelected.childNodes[2].childNodes[10].firstElementChild;
  const lu = itemSelected.childNodes[2].childNodes[10].lastElementChild;
  if (unit == "F") {
    fe.style.display = "none";
    le.style.display = "inline-block";
    fu.classList.remove("selected");
    lu.classList.add("selected");
  } else {
    fe.style.display = "inline-block";
    le.style.display = "none";
    fu.classList.add("selected");
    lu.classList.remove("selected");
  }
}
const getWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};
const getCity = async (city, country) => {
  const base = `http://dataservice.accuweather.com/locations/v1/cities/${country}/search`;
  const query = `?apikey=${key}&q=${city}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

const updateCity = async (city, country) => {
  const cityDetails = await getCity(city, country);
  const weather = await getWeather(cityDetails.Key);
  return { cityDetails, weather };
};

const updateUI = (data) => {
  const cityDetails = data.cityDetails;
  const weather = data.weather;

  const placeMe = document.getElementById(`${count}`);
  const dateTime = weather.LocalObservationDateTime;
  const d = dateTime.split("T");
  const d1 = d[0].split("-");
  const weatherDate = `${d1[2]}-${d1[1]}-${d1[0]}`;
  const weatherTime = d[1].slice(0, 8);
  const wi = weather.WeatherIcon;
  const weatherIconURL =
    wi <= 9
      ? `"https://developer.accuweather.com/sites/default/files/0${wi}-s.png"`
      : `"https://developer.accuweather.com/sites/default/files/${wi}-s.png"`;
  let bgColor = "rgb(189, 190, 190)";
  if (weather.IsDayTime) {
    bgColor = "rgb(176, 227, 247)";
  }
  let df = document.createDocumentFragment();
  let item1 = document.createElement("div");
  item1.classList.add("mainData");
  item1.style.backgroundColor = `${bgColor}`;
  item1.innerHTML = `<h5>${cityDetails.EnglishName}, ${cityDetails.Country.EnglishName}</h5>
  <div class='wd'>${weatherDate}</div>
  <div class='wt'>${weatherTime}</div>
  <div class='wicon'><img src=${weatherIconURL} alt='WeatherIcon'></div>
  <div class='wtext'>${weather.WeatherText}</div>
  <div class="radioSwitch">
    <div class="radioC selected" onclick=changeUnit(${count},'C')>C</div>
    <div class="radioF" onclick="changeUnit(${count},'F')">F</div>
  </div>
  <div class='temp'><div class='metric'><span>${weather.Temperature.Metric.Value}</span><span>&deg; C</span></div>
  <div class='imperial'><span>${weather.Temperature.Imperial.Value}</span><span>&deg; F</span></div>
  </div>
  <a class='remove' href='javascript:removeMe(${count})'>Remove</a>
  <a class='refresh' href='javascript:refreshMe()'>Refresh</a>
  `;
  df.appendChild(item1);
  placeMe.appendChild(df);
  count++;
};
const updatePlaces = (city, country) => {
  let df1 = document.createDocumentFragment();
  let item2 = document.createElement("div");
  item2.classList.add("place");
  item2.id = `${count}`;
  item2.innerHTML = `<div class='name'>${city.toUpperCase()},${country.toUpperCase()}</div><div class='toggle'onclick='toggleMe(${count})'>+</div>`;
  df1.appendChild(item2);
  document.querySelector(".places").appendChild(df1);
};

const removePlaces = () => {
  document.getElementById(`${count}`).remove();
  document.querySelector(".msg").innerHTML = "City Not Found";
};

form1.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = form1.city.value.trim();
  const country = form1.country.value.trim();
  form1.reset();
  document.querySelector(".msg").innerHTML = "";
  let flag = 0;
  const prevPlaces = document.querySelectorAll(".name");
  prevPlaces.forEach((item) => {
    if (item.textContent == `${city.toUpperCase()},${country.toUpperCase()}`) {
      document.querySelector(".msg").innerHTML = "City Already Present";
      flag = 1;
    }
  });
  if (!flag) {
    updatePlaces(city, country);
    updateCity(city, country)
      .then((data) => updateUI(data))
      .catch((err) => removePlaces());
  }
});


