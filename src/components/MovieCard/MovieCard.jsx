import React, { Component } from "react";
import { Rate, Image, Tag } from "antd";
import MoviedbApi from "../../services/MoviedbApi";

import "./MovieCard.css";
export default class MovieCard extends Component {
  moviesService = new MoviedbApi();

  rankingMarks = (rating) => {
    const ratingMarks = {
      moreThanZoro: "#E90000",
      moreThanTree: "#E97E00",
      moreThanFive: "#E9D100",
      moreThanSeven: "#66E900",
    };
    if (rating > 0 && rating <= 3) return ratingMarks.moreThanZoro;
    if (rating > 3 && rating <= 5) return ratingMarks.moreThanTree;
    if (rating > 5 && rating <= 7) return ratingMarks.moreThanFive;
    if (rating > 7) return ratingMarks.moreThanSeven;
    return false;
  };

  transformGenres(genres) {
    const { genresAll } = this.props;
    const newArr = [];
    genres.forEach((item) => {
      genresAll.forEach((genre) => {
        if (item === genre.id) {
          newArr.push(genre);
        }
      });
    });
    return newArr.map((item) => (
      <Tag key={item.id} color="default">
        {item.name}
      </Tag>
    ));
  }

  getRate = (num) => {
    const {
      moviesData: { id },
      guestSessionId,
    } = this.props;
    this.moviesService.ratedMovie(guestSessionId, id, num);
  };

  render() {
    const {
      moviesData: {
        id,
        name,
        date,
        rated,
        rating,
        desriptions,
        poster,
        genres,
      },
    } = this.props;
    const isValidPoster = (poster) => {
      let path = poster ? `https://image.tmdb.org/t/p/w500${poster}` : "";
      return path;
    };
    const posterPath = isValidPoster(poster);
    const newRated = `${Math.floor(rated)},${Math.round(rated,-1)}`;

    return (
      <div className="movie-card" key={id}>
        <Image
          src={posterPath}
          style={{ float: "left", width: 180, height: 278 }}
        />
        <div className="movie-card__content">
          <h2 
            style={{
              marginTop: 10,
              fontSize: 20,
              textAlign: "left",
              paddingRight: 30,
              marginBottom: 5,
            }}
          >
            {name}
          </h2>
          <p
            style={{
              fontSize: 12,
              textAlign: "left",
              color: "#827E7E",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            {date}
          </p>
          <div
            className="movie-card__rating-ring"
            style={{ border: `3px solid ${this.rankingMarks(rated)}` }}
          >
            {newRated}
          </div>
          <div className="movie-card__tags">{this.transformGenres(genres)}</div>
          <p className="movie-card__desc" style={{ fontSize: 12, textAlign: "left",marginTop: 5 }}>{desriptions}</p>
          <div className="movie-card__stars">
            <Rate
              count={10}
              defaultValue={rating}
              style={{ fontSize: 15, marginBottom: "25", textAlign: "left", }}
              onChange={this.getRate}
            />
          </div>
        </div>
      </div>
    );
  }
}
