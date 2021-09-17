import React from "react";

/**
 * Article Component
 * @param {*} props   Represents the properties that were passed
 * @module ./Article
 * @see https://academind.com/tutorials/reactjs-pagination/
 * 
 * @returns           Returns the rendered component
 */
const Article = (props) => {
  return (
    <div id={props.index}>
      <a className="article" href={props.url} target="_blank" rel="noreferrer">
        <h3 className="title">{props.title}</h3>
        <p className="descrip">{props.descrip}</p>
      </a>
    </div>
  );
};

export default Article;
