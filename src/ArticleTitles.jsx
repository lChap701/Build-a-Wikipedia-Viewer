import React from "react";

/**
 * ArticleTitles Component
 * @param {*} props   Represents the properties that were passed
 * @module ./ArticleTitles
 *
 * @returns           Returns the rendered component
 */
const ArticleTitles = (props) => {
  return (
    <datalist id="titles">
      {props.options.map((t) => (
        <option value={t}></option>
      ))}
    </datalist>
  );
};

export default ArticleTitles;
