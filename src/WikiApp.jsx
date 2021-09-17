/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { censor } from "./setup/censor";
import { URL } from "./setup/url";
import { params } from "./setup/params";
import ArticleTitles from "./ArticleTitles";
import SearchSettings from "./SearchSettings";
import Paginate from "./Paginate";

/**
 * WikiApp Component
 * @module ./WikiApp
 *
 */
class WikiApp extends React.Component {
  constructor(props) {
    super(props);

    // States
    this.state = {
      input: "",
      titles: [],
      showSettings: false,
      limit: params.getGpslimit,
      filter: true,
      sort: "",
      wiki: [],
      error: null,
      loaded: false,
      currentPage: 1,
    };

    // Functions
    this.typing = this.typing.bind(this);
    this.fillDatalist = this.fillDatalist.bind(this);
    this.urlBuilder = this.urlBuilder.bind(this);
    this.finalResults = this.finalResults.bind(this);
    this.enterCheck = this.enterCheck.bind(this);
    this.displaySettings = this.displaySettings.bind(this);
    this.filterCheck = this.filterCheck.bind(this);
    this.changeLimit = this.changeLimit.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.closeSettings = this.closeSettings.bind(this);
    this.restoreSettings = this.restoreSettings.bind(this);
    this.getResults = this.getResults.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.changePage = this.changePage.bind(this);
    this.nextPage = this.nextPage.bind(this);

    // Add EventListener (without componentWillMount())
    window.addEventListener("keydown", this.enterCheck);
  }

  // Add EventListener (with componentWillMount())
  /*componentWillMount() {
    window.addEventListener("keydown", this.enterCheck);
  }*/

  typing(e) {
    this.setState({ input: e.target.value });

    setTimeout(() => {
      this.fillDatalist();
    }, 100);
  }

  fillDatalist() {
    fetch(this.urlBuilder(10))
      .then((res) => res.json())
      .then(
        (data) => {
          console.log("JSON:\n" + JSON.stringify(data));

          // If results are not found, then exit
          if (typeof data.query !== "object") return;

          // Gets the final results
          let pages = this.finalResults(
            data.query.pages,
            Object.keys(data.query.pages)
          );

          this.setState({ titles: pages.map((p) => p.title) });
        },
        (err) => console.error(err)
      );
  }

  urlBuilder(gpslimit) {
    // Adds all parameters to the API URL
    let url = URL + "?origin=*";

    params.setGpssearch = this.state.input;
    params.setGpslimit = gpslimit;

    Object.keys(params).forEach((k) => {
      url += "&" + k + "=" + params[k];
    });

    return url;
  }

  finalResults(queryPages, keys) {
    let pages = keys.map((k) => queryPages[k]);

    // Checks if the data should be filtered
    if (this.state.filter)
      pages = pages.filter((p) => !censor.isProfane(p.title));

    // Checks if dated should be sorted in ascending or descending order (by article title)
    if (this.state.sort === "asc") {
      pages = pages.sort((p1, p2) => p1.title.localeCompare(p2.title));
    } else if (this.state.sort === "desc") {
      pages = pages
        .sort((p1, p2) => p1.title.localeCompare(p2.title))
        .reverse();
    }

    return pages;
  }

  enterCheck(e) {
    // Allows user to select elements using "Tab" and use "Enter" to use elements
    if (
      e.key === "Enter" &&
      document.activeElement === document.querySelector("input[name='search']")
    )
      this.getResults();
  }

  displaySettings() {
    this.setState((state) => ({
      showSettings: !state.showSettings,
      prevLimit: state.limit,
      prevSort: state.sort,
      prevFilter: state.filter,
    }));

    setTimeout(() => {
      this.fillDatalist();
    }, 100);
  }

  filterCheck() {
    this.setState((state) => ({ filter: !state.filter }));
  }

  changeLimit(e) {
    this.setState({ limit: parseInt(e.target.value) });
  }

  changeSort(e) {
    this.setState({ sort: e.target.value });
  }

  closeSettings(e) {
    e.preventDefault();
    this.displaySettings();
  }

  restoreSettings() {
    this.setState((state) => ({
      limit: state.prevLimit,
      sort: state.prevSort,
      filter: state.prevFilter,
    }));

    this.displaySettings();
  }

  getResults() {
    const loader = document.querySelector("#loader");

    // Ensures that the datalist menu will always be closed
    document.activeElement.blur();

    // Displays loading animation
    loader.classList.remove("hide");

    // Determines if the API should be called
    if (params.getGpssearch === "Not set") {
      // Ends loading animation and saves error message
      setTimeout(() => {
        loader.classList.add("hide");

        this.setState({
          error: "This field is required",
          loaded: false,
        });
      }, 500);
    } else {
      fetch(this.urlBuilder(this.state.limit))
        .then((res) => res.json())
        .then(
          (data) => {
            console.log("JSON:\n" + JSON.stringify(data));

            // If results are not found, then exit
            if (typeof data.query !== "object") return;

            // Gets the final results
            let pages = this.finalResults(
              data.query.pages,
              Object.keys(data.query.pages)
            );

            // Ends loading animation and updates states
            setTimeout(() => {
              loader.classList.add("hide");

              this.setState({
                input: "",
                titles: [],
                wiki: pages,
                error: null,
                loaded: true,
                currentPage: 1,
              });
            }, 2000);
          },
          (err) => {
            // Hides loading animation and save API error messages
            setTimeout(() => {
              loader.classList.add("hide");

              this.setState({
                input: "",
                error: err,
                loaded: true,
              });
            }, 1000);

            console.error(err);
          }
        );
    }
  }

  prevPage() {
    this.setState((state) => ({ currentPage: state.currentPage - 1 }));
    window.scrollTo(0, 0);
  }

  changePage(e) {
    this.setState({ currentPage: parseInt(e.target.innerHTML) });
    window.scrollTo(0, 0);
  }

  nextPage() {
    this.setState((state) => ({ currentPage: state.currentPage + 1 }));
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div id="wiki-app">
        <div id="ctrl">
          <h2>Find Articles</h2>

          <div className="wrap">
            <input
              id="search"
              name="search"
              type="text"
              list="titles"
              placeholder="Search"
              value={this.state.input}
              onChange={this.typing}
            />

            <ArticleTitles options={this.state.titles} />

            <button onClick={this.getResults}>
              <i className="fas fa-search fa-lg"></i>
            </button>
          </div>

          <div id="error">{this.state.error}</div>

          <div className="wrap">
            <a
              href="https://en.wikipedia.org/wiki/Special:Random"
              target="_blank"
              rel="noreferrer"
            >
              Jump To Random Article
            </a>

            <a onClick={this.displaySettings}>Settings</a>
          </div>
        </div>

        {this.state.showSettings ? (
          <SearchSettings
            save={this.closeSettings}
            cancel={this.restoreSettings}
            articleLimit={this.state.limit}
            updateLimit={this.changeLimit}
            sortOrder={this.state.sort}
            updateSortOrder={this.changeSort}
            censor={this.state.filter}
            updateCensor={this.filterCheck}
          />
        ) : (
          ""
        )}

        {/* Displays articles */}
        {this.state.loaded && this.state.error === null ? (
          this.state.wiki.length > 0 ? (
            <Paginate
              curPage={this.state.currentPage}
              wiki={this.state.wiki}
              total={this.state.wiki.length}
              articles={25}
              prevPage={this.prevPage}
              changePage={this.changePage}
              nextPage={this.nextPage}
            />
          ) : (
            <h3>No articles were found</h3>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default WikiApp;
