/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import ListItem from "./components/ListItem";
import { API_URL } from "./constants/config";

const App = () => {
  const [students, setStudents] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchTag, setSearchTag] = useState("");

  const getFilteredData = (data, name, tag) => {
    if (!data) return [];

    let filteredDataByName = data;
    let filteredDataByTag = [];

    if (name !== "") {
      filteredDataByName = data.filter((item) =>
        (
          item.firstName?.toLowerCase() +
          " " +
          item.lastName?.toLowerCase()
        ).includes(name?.toLowerCase())
      );
    }

    if (filteredDataByName.length !== 0 && tag !== "") {
      filteredDataByTag = filteredDataByName.filter((item) => {
        if (!item.tags || item.tags?.length === 0) return false;
        for (let e of item.tags) {
          if (e.toLowerCase().includes(tag.toLowerCase())) return true;
        }
        return false;
      });
    } else {
      filteredDataByTag = filteredDataByName;
    }

    return filteredDataByTag;
  };

  const getStudentData = (phrase) => {
    axios
      .get(API_URL)
      .then((res) => {
        if (res && res.data) {
          setStudents(res.data.students, phrase);
        }
      })
      .catch((err) => {
        console.error("[ERROR]:[FETCHING_STUDENTS]", err);
      });
  };

  const addTagForUser = (tag, student) => {
    const newData = students.map((item) => {
      if (item.id === student.id) {
        if (item.tags) {
          item.tags.push(tag);
        } else {
          item.tags = [tag];
        }
      }
      return item;
    });
    setStudents(newData);
  };

  useEffect(() => {
    getStudentData();
    return () => {
      setStudents(null);
      setSearchName(null);
      setSearchTag(null);
    };
  }, []);

  return (
    <div className="container">
      <div className="search-bar-area">
        <input
          className="search-bar"
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Search by name"
        />
        <input
          className="search-bar"
          type="text"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          placeholder="Search by tag"
        />
      </div>
      <div className="data-list-area">
        {getFilteredData(students, searchName, searchTag)?.length > 0 &&
          getFilteredData(students, searchName, searchTag).map(
            (item, index) => (
              <ListItem
                data={item}
                key={`STUDENT_${index}`}
                addNewTag={(tag) => {
                  addTagForUser(tag, item);
                }}
              />
            )
          )}
      </div>
    </div>
  );
};

export default App;
