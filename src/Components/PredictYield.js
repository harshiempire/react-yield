import React, { useState } from "react";

const PredictYield = () => {
  const [haveData, setHaveData] = useState(true);

  const handleClick = () => {
    setHaveData((prevData) => !prevData);
  };

  const weatherFetch = (district) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "47e90d9872msh5547aef55cb3f38p17bb6ajsn822908a56550",
        "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
      },
    };

    fetch(
      "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" +
        district,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("mello");
        // return response;
        setFormData((prevData) => ({
          ...prevData,
          rainfall: response.cloud_pct,
          min_temp: response.min_temp,
          max_temp: response.max_temp,
        }));
      })
      .catch((err) => console.error(err));
  };

  const [formData, setFormData] = useState({
    rainfall: 86.7,
    min_temp: 23.1,
    max_temp: 40.3,
    ph: 7.23,
    n: 219.5,
    p: 34.4,
    k: 304.3,
    zn: 1.37,
    fe: 13.66,
    cu: 1.88,
    mn: 12.78,
    irrigation: 11.35,
  });
  const [newdistrict, setNewDistrict] = useState(Array(32).fill(0));
  const [newcrop, setNewCrop] = useState(Array(5).fill(0));
  const [newseason, setNewSeason] = useState(Array(2).fill(0));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDistrict = async (e) => {
    console.log(e.target.selectedOptions[0].innerHTML);
    const district = e.target.selectedOptions[0].innerHTML;
    try {
      const response = await weatherFetch(district);
    } catch (error) {
      console.log(error);
    }
    const districtIndex = e.target.value;
    let arr = Array(32).fill(0);
    arr[districtIndex] = 1;
    setNewDistrict(arr);
  };
  const handleCrop = (e) => {
    const cropIndex = e.target.value;
    let arr = Array(5).fill(0);
    arr[cropIndex] = 1;
    setNewCrop(arr);
  };
  const handleSeason = (e) => {
    const seasonIndex = e.target.value;
    let arr = Array(2).fill(0);
    arr[seasonIndex] = 1;
    setNewSeason(arr);
  };

  const handleSubmit = (event) => {
    const csvData =
      Object.values(formData).join(",") +
      "," +
      Object.values(newdistrict).join(",") +
      "," +
      Object.values(newseason).join(",") +
      "," +
      Object.values(newcrop).join(",");
    console.log(csvData);
    console.log(csvData.length);

    // Make POST request to the server
    fetch("/yield", {
      method: "POST",
      headers: {
        "Content-Type": "text/csv",
      },
      body: csvData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data as needed
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error is :", error);
      });
  };

  return (
    <div>
      <div className="container mt-3">
        <div className="mb-3">
          <label htmlFor="district" className="form-label">
            District:
          </label>
          <select
            name="district"
            id="district"
            className="form-select"
            onChange={handleDistrict}
          >
            <option value="">Select district</option>
            <option value={0}>Adilabad</option>
            <option value={1}>Bhadradri Kothagudem</option>
            <option value={2}>Jagtial</option>
            <option value={3}>Jangaon</option>
            <option value={4}>Jayashankar Bhupalpally</option>
            <option value={5}>Jogulamba Gadwal</option>
            <option value={6}>Kamareddy</option>
            <option value={7}>Karimnagar</option>
            <option value={8}>Khammam</option>
            <option value={9}>Komaram bheem asifabad</option>
            <option value={10}>Mahabubabad</option>
            <option value={11}>Mahabubnagar</option>
            <option value={12}>Mancherial</option>
            <option value={13}>Medak</option>
            <option value={14}>Medchal</option>
            <option value={15}>Mulugu</option>
            <option value={16}>Nagarkurnool</option>
            <option value={17}>Nalgonda</option>
            <option value={18}>Narayanpet</option>
            <option value={19}>Nirmal</option>
            <option value={20}>Nizamabad</option>
            <option value={21}>Peddapalli</option>
            <option value={22}>Rajanna</option>
            <option value={23}>Rangareddy</option>
            <option value={24}>Sangareddy</option>
            <option value={25}>Siddipet</option>
            <option value={26}>Suryapet</option>
            <option value={27}>Vikarabad</option>
            <option value={28}>Wanaparthy</option>
            <option value={29}>Warangal</option>
            <option value={30}>Warangal Urban</option>
            <option value={31}>Yadadri</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="crop" className="form-label">
            Crop:
          </label>
          <select name="crop" className="form-select" onChange={handleCrop}>
            <option value="">Select Crop</option>
            <option value={0}>Groundnut</option>
            <option value={1}>Maize</option>
            <option value={2}>Moong (Green Gram)</option>
            <option value={3}>Rice</option>
            <option value={4}>Cotton (Lint)</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="season" className="form-label">
            Season:
          </label>
          <select name="season" className="form-select" onChange={handleSeason}>
            <option value="">Select season</option>
            <option value={0}>Kharif</option>
            <option value={1}>Rabi</option>
          </select>
        </div>
        <button
          id="modda"
          className="btn btn-primary me-2"
          onClick={handleClick}
        >
          {haveData ? "You have data" : "You don't have data"}
        </button>
        <div id="einstein" style={{ display: haveData ? "block" : "none" }}>
          <div className="mb-3">
            <label htmlFor="rainfall" className="form-label">
              Rainfall (mm):
            </label>
            <input
              type="text"
              id="rainfall"
              name="rainfall"
              className="form-control"
              placeholder="86.7"
              value={formData.rainfall}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="min_temp" className="form-label">
              Minimum Temperature (°C):
            </label>
            <input
              type="text"
              id="min_temp"
              name="minTemp"
              className="form-control"
              placeholder="23.1"
              value={formData.min_temp}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="max_temp" className="form-label">
              Maximum Temperature (°C):
            </label>
            <input
              type="text"
              id="max_temp"
              name="maxTemp"
              className="form-control"
              placeholder="40.3"
              value={formData.max_temp}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="ph" className="form-label">
              pH:
            </label>
            <input
              type="text"
              id="ph"
              name="pH"
              className="form-control"
              placeholder="7.23"
              value={formData.ph}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="n" className="form-label">
              N (Kg/Hectare):
            </label>
            <input
              type="text"
              id="n"
              name="n"
              className="form-control"
              placeholder="219.5"
              value={formData.n}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="p" className="form-label">
              P (Kg/Hectare):
            </label>
            <input
              type="text"
              id="p"
              name="p"
              className="form-control"
              placeholder="34.4"
              value={formData.p}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="k" className="form-label">
              K (Kg/Hectare):
            </label>
            <input
              type="text"
              id="k"
              name="k"
              className="form-control"
              placeholder="304.3"
              value={formData.k}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="zn" className="form-label">
              Zn (ppm):
            </label>
            <input
              type="text"
              id="zn"
              name="zn"
              className="form-control"
              placeholder="1.37"
              value={formData.zn}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fe" className="form-label">
              Fe (ppm):
            </label>
            <input
              type="text"
              id="fe"
              name="fe"
              className="form-control"
              placeholder="13.66"
              value={formData.fe}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cu" className="form-label">
              Cu (ppm):
            </label>
            <input
              type="text"
              id="cu"
              name="cu"
              className="form-control"
              placeholder="1.88"
              value={formData.cu}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mn" className="form-label">
              Mn (ppm):
            </label>
            <input
              type="text"
              id="mn"
              name="mn"
              className="form-control"
              placeholder="12.78"
              value={formData.mn}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="irrigation" className="form-label">
              Irrigation (MBGL):
            </label>
            <input
              type="text"
              id="irrigation"
              name="irrigation"
              className="form-control"
              placeholder="11.35"
              value={formData.irrigation}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="btn btn-dark " onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default PredictYield;
