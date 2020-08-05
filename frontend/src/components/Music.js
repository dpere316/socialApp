import React, { Component } from "react";
import axios from "axios";
import actions from "../services";

class Search extends Component {
  state = {
    searchValue: "",
    songs: [],
    data: null,
    show: false,
    showPrev: false,
    index: 0,
  };
  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };
  makeApiCall = () => {
    axios({
      method: "GET",
      url: "https://deezerdevs-deezer.p.rapidapi.com/search",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "3e5b90cb4emsh4609cea4ac6308dp1b5ce5jsn1be3f148de5c",
        useQueryString: true,
      },
      params: {
        q: this.state.searchValue,
        index: this.state.index,
      },
    })
      .then((response) => {
        // console.log(response);
        this.setState({
          data: response.data,
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  handleSearch = () => {
    this.makeApiCall();
    this.setState({ show: true });
  };
  addSong = async (song) => {
    // console.log("add", song);
    let res = await actions.addSong(song);
    // console.log(res);
  };

  returnSongs = () => {
    // this.state.data?.data[i].preview
    let arr = [];
    let self = this;
    arr = this.state.data?.data.map(function (song) {
      // console.log(this, song);
      return (
        <div className="search-container">
          <p className="song-title">
            {song.artist.name} - {song.title}
          </p>
          <audio className="songs" src={song.preview} controls></audio>
          <div>
            <a
              className="full-track"
              rel="noopener noreferrer"
              target="_blank"
              href={song.link}
            >
              Click Here For Full Track
            </a>
            <br></br>
            {console.log(song.preview)}
            <button
              className="add-song"
              onClick={() => self.addSong(song.preview)}
            >
              Add Song To Profile
            </button>
          </div>
        </div>
      );
    });
    return arr;
  };
  render() {
    // console.log(this);
    return (
      <div className="search">
        <p className=" para">
          <br></br>
          <b>Add a Song to Your Profile!</b>
        </p>
        <br></br>
        <input
          name="text"
          type="text"
          placeholder="Search"
          onChange={(event) => this.handleOnChange(event)}
          value={this.state.searchValue}
        />{" "}
        <button onClick={this.handleSearch}>Search</button>
        <br></br>
        <br></br>
        <div className="nextPrevBtns">
          {this.state.show && (
            <button
              onClick={(event) =>
                this.setState(
                  { index: this.state.index + 25 },
                  this.handleSearch
                )
              }
            >
              Next
            </button>
          )}
          {this.state.index > 0 && (
            <button
              onClick={(event) =>
                this.setState(
                  { index: this.state.index - 25 },
                  this.handleSearch
                )
              }
            >
              Prev
            </button>
          )}
        </div>
        <div id="songs">{this.returnSongs()}</div>
        <div className="nextPrevBtns">
          {this.state.show && (
            <button
              onClick={(event) =>
                this.setState(
                  { index: this.state.index + 25 },
                  this.handleSearch
                )
              }
            >
              Next
            </button>
          )}
          {this.state.index > 0 && (
            <button
              onClick={(event) =>
                this.setState(
                  { index: this.state.index - 25 },
                  this.handleSearch
                )
              }
            >
              Prev
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default Search;
