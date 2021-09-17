import React from "react";

/**
 * SearchSettings Component
 * @param {*} props   Represents the properties that were passed
 * @module ./SearchSettings
 * 
 * @returns           Returns the rendered component
 */
const SearchSettings = (props) => {
  return (
    <div id="search-settings">
      <form name="search-settings" onSubmit={props.save}>
        <h2>Search Settings</h2>

        <div id="limit-ctrl">
          <label for="limit">Article Limit</label>
          <input
            type="range"
            name="limit"
            id="limit"
            min="1"
            max="500"
            defaultValue="10"
            value={props.articleLimit}
            onChange={props.updateLimit}
          />
          <b>{props.articleLimit}</b>

          <div id="pages-info">
            <p>
              <b>Maximum Pages:</b>{" "}
              {props.articleLimit <= 25
                ? 1
                : props.articleLimit % 25 === 0
                ? (props.articleLimit / 25).toString().split(".")[0]
                : (props.articleLimit / 25 + 1).toString().split(".")[0]}
            </p>
            <p>
              <i>Note: Each page contains up to 25 articles</i>
            </p>
          </div>
        </div>

        <div id="sort-ctrl">
          <label for="sort-order">Sorting Order</label>
          <select
            id="sort"
            value={props.sortOrder}
            onChange={props.updateSortOrder}
          >
            <option value="">Default</option>
            <option value="asc">Ascending by title</option>
            <option value="desc">Descending by title</option>
          </select>
        </div>

        <div id="checkbox">
          <label for="censor">
            <input
              type="checkbox"
              name="censor"
              id="censor"
              onChange={props.updateCensor}
              checked={props.censor}
            />
            Censor content
          </label>
        </div>

        <input type="submit" value="Save" />
        <input type="button" value="Cancel" onClick={props.cancel} />
      </form>
    </div>
  );
};

export default SearchSettings;