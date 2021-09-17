import React from "react";
import Article from "./Article";

/**
 * Paginate Component
 * @param {*} props   Represents the properties that were passed
 * @module ./Paginate
 * @see https://academind.com/tutorials/reactjs-pagination/
 *
 * @returns           Returns the rendered component
 */
const Paginate = (props) => {
  /**
   * Groups articles
   *
   * @returns   Returns the groups
   */
  const getArticles = () => {
    const start = props.curPage * props.articles - props.articles;
    const end = start + props.articles;
    return props.wiki.slice(start, end);
  };

  /**
   * Adds page numbers
   *
   * @returns   Returns the page numbers
   */
  const getPageNums = () => {
    let pages = props.total / props.articles;
    let nums = [];

    for (let i = 1; i <= pages; i++) {
      nums.push(i);
    }

    return nums;
  };

  return (
    <div id="paginate">
      <div id="articles">
        {getArticles().map((w, i) => {
          return (
            <Article
              key={i}
              index={i}
              title={w.title}
              descrip={w.description}
              url={w.fullurl}
            />
          );
        })}
      </div>

      {getPageNums().length > 1 ? (
        <div id="page-nums">
          <button
            id="prev"
            className={props.curPage === 1 ? "page-btn disabled" : "page-btn"}
            onClick={props.prevPage}
          >
            <i className="fas fa-angle-double-left fa-lg"></i>
          </button>

          {getPageNums().map((n, i) => (
            <button
              key={i}
              onClick={props.changePage}
              className={
                props.curPage === i + 1 ? "page-btn active" : "page-btn"
              }
            >
              {n}
            </button>
          ))}

          <button
            id="next"
            className={
              props.curPage === getPageNums()[getPageNums().length - 1]
                ? "page-btn disabled"
                : "page-btn"
            }
            onClick={props.nextPage}
          >
            <i className="fas fa-angle-double-right fa-lg"></i>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Paginate;
