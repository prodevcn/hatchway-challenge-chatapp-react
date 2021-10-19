import React, { useState } from "react";

import "./index.css";

const ListItem = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [tag, setTag] = useState("");

  const addNewTag = () => {
    props.addNewTag(tag);
    setTag("");
  };

  const getAverage = (values) => {
    let total = 0;
    for (let value of values) {
      total += Number(value);
    }
    return (total / values.length).toFixed(3);
  };

  return (
    <div className="list-item">
      <div className="item-image-area">
        <img className="item-avatar" src={props.data?.pic} alt="student" />
      </div>
      <div className="item-text-area">
        <div className="item-header-area">
          <h1>
            {props.data?.firstName} {props.data?.lastName}
          </h1>
          {isOpen ? (
            <button
              className="extensible-button"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              -
            </button>
          ) : (
            <button
              className="extensible-button"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              +
            </button>
          )}
        </div>
        <h4>Email: {props.data?.email}</h4>
        <h4>Company: {props.data?.company}</h4>
        <h4>Skill: {props.data?.skill} </h4>
        <h4>Average: {getAverage(props.data?.grades)}%</h4>
        {isOpen && (
          <div className="item-grades-area">
            {props.data?.grades.map((item, index) => (
              <h4 key={`TEST_RESULT_${index}`}>
                Test {index + 1}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item}%
              </h4>
            ))}
          </div>
        )}
        {props.data?.tags?.length > 0 && (
          <div className="item-tag-area">
            {props.data?.tags?.map((item, index) => (
              <button
                className="item-tag-item"
                type="button"
                disabled={true}
                key={`TAG_ITEM_${index}`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
        <input
          className="student-tag"
          value={tag}
          onChange={(e) => {
            setTag(e.target.value);
          }}
          placeholder="Add a tag"
          onKeyDown={(event) => {
            if (event.key === "Enter") addNewTag();
          }}
        />
      </div>
    </div>
  );
};

export default ListItem;
