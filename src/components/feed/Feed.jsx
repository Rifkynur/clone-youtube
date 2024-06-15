import React, { useState, useEffect } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_KEY, value_converter, toTopScroll } from "../../data";
import moment from "moment";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const fetchApi = () =>
    axios
      .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=ID&videoCategoryId=${category}&key=${API_KEY}`)
      .then((result) => setData(result?.data?.items))
      .catch((err) => console.log(err));

  useEffect(() => {
    fetchApi();
    toTopScroll();
    document.title = "Home";
  }, [category]);
  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          <Link key={index} to={`/video/${item?.snippet?.categoryId}/${item?.id}`} className={`card`}>
            <img src={item?.snippet?.thumbnails?.medium?.url} alt="thumnail" />
            <h2>{item?.snippet?.title}</h2>
            <h3>{item?.snippet?.channelTitle}</h3>
            <p>
              {value_converter(item?.statistics?.viewCount)} views &bull; {moment(item?.snippet?.publishedAt).fromNow()}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;
