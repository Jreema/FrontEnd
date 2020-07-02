import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Input } from "antd";
import { Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./Dashboard.css";

function Dashboard(props) {
  const history = useHistory();
  const [cityInfo, setCityInfo] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const user = location.state.params;
    if (user) {
      fetchItems();
    } else {
      history.push("/");
    }
  }, []);

  const fetchItems = async () => {
    const data = await fetch(
      "https://indian-cities-api-nocbegfhqg.now.sh/cities"
    )
      .then((response) => response.json())
      .then((users) => {
        const newCities = users.map((x, i) => ({ ...x, key: i }));
        setCityInfo(newCities);
        setFilteredCities(newCities);
      });
  };

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleSubmit = (e) => {
    setFilteredCities(() =>
      cityInfo.filter((city) => {
        return (
          city.City.toLowerCase().includes(searchField.toLowerCase()) ||
          city.District.toLowerCase().includes(searchField.toLowerCase()) ||
          city.State.toLowerCase().includes(searchField.toLowerCase())
        );
      })
    );
  };

  const sortTable = (order, key) => {
    const fC = filteredCities;
    switch (key) {
      case "District":
        if (order === "descend") {
          let fSD = fC
            .sort((a, b) => {
              return b.District > a.District ? 1 : -1;
            })
            .map((x, i) => ({ ...x, key: i }));
          setFilteredCities(fSD);
        } else {
          let fSD = fC
            .sort((a, b) => {
              return b.District < a.District ? 1 : -1;
            })
            .map((x, i) => ({ ...x, key: i }));
          setFilteredCities(fSD);
        }
        break;
      case "City":
        if (order === "descend") {
          let fSC = fC
            .sort((a, b) => {
              return b.City > a.City ? 1 : -1;
            })
            .map((x, i) => ({ ...x, key: i }));
          setFilteredCities(fSC);
        } else {
          let fSC = fC
            .sort((a, b) => {
              return b.City < a.City ? 1 : -1;
            })
            .map((x, i) => ({ ...x, key: i }));
          setFilteredCities(fSC);
        }
        break;
      case "State":
        if (order == "descend") {
          let fSS = fC
            .sort((a, b) => {
              return b.State > a.State ? 1 : -1;
            })
            .map((x, i) => ({ ...x, key: i }));
          setFilteredCities(fSS);
        } else {
          let fSS = fC
            .sort((a, b) => {
              return b.State < a.State ? 1 : -1;
            })
            .map((x, i) => ({ ...x, key: i }));
          setFilteredCities(fSS);
        }
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      title: "City",
      dataIndex: "City",
      key: "city",
      sorter: {
        compare: (a, b) => a.City - b.City,
        multiple: 3,
      },
      ellipsis: true,
      textWrap: "word-break",
      width: "40%",
    },
    {
      title: "District",
      dataIndex: "District",
      key: "district",
      sorter: {
        compare: (a, b) => a.District - b.District,
        multiple: 2,
      },
      textWrap: "word-break",
      width: "30%",
    },
    {
      title: "State",
      dataIndex: "State",
      key: "state",
      sorter: {
        compare: (a, b) => a.State - b.State,
        multiple: 1,
      },
      textWrap: "word-break",
    },
  ];

  const logout = () => {
    sessionStorage.removeItem("Username");
    history.push("/");
  };

  function onChange(pagination, sorter, extra) {
    sortTable(extra.order, extra.field);
  }

  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  }
  const user1 = sessionStorage.getItem("Username");

  return (
    <div className="container1">
      <div className="title2">
        <h3 className="title3">Indian Cities Information</h3>
      </div>
      <div className="profile">
        <div clasName="user2">
          <UserOutlined style={{ fontSize: "1.5rem" }} />
          <div className="user2-name"> {user1}</div>
        </div>
        <button className="logout-btn" onClick={logout}>
          Log Out
        </button>
      </div>
      <div className="filter">
        <Input
          type="search"
          className="filter-inp"
          placeholder="Filter Cities"
          onChange={handleChange}
        />
        <button className="filter-btn" onClick={handleSubmit}>
          Fetch Data
        </button>
      </div>
      <Table
        className="data-table"
        columns={columns}
        dataSource={filteredCities}
        onChange={onChange}
        pagination={{
          position: ["topCenter", "bottomCenter"],
          responsive: true,
          hideOnSinglePage: true,
        }}
      />
    </div>
  );
}
export default Dashboard;
