function Weather() {
  return (
    <>
      <section className="weather">
        <div className="weather__box">
          <div className="weather__search">
            <input
              type="text"
              name="search"
              placeholder="Enter a City to check current weather"
              className="weather__search-input"
            />
            <button className="weather__search-button">Search</button>
          </div>
          <div className="weather__box-data">
            <h2 className="weather__city">City</h2>
            <p className="weather__temp">Current temperature here</p>
            <div className="weather__description">
              <img
                src="source here"
                alt="weather now"
                className="weather__description-img"
              />
              <p className="weather__description-title">Weather description</p>
            </div>
            <p className="weather__humidity">Humidity</p>
            <p className="weather__speed">Speed</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Weather;
