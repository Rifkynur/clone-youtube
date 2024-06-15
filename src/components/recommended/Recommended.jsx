import React, { useState, useEffect } from "react";
import "./Recommended.css";
import axios from "axios";
import { API_KEY, value_converter } from "../../data";
import { Link, useParams } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const { videoId } = useParams();

  const fetchData = () => {
    axios
      .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=ID&videoCategoryId=${categoryId}&key=${API_KEY}`)
      .then((result) => setApiData(result?.data?.items))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [videoId]);

  console.log(apiData);
  return (
    <div className="recommended">
      {apiData.map((item, index) => {
        return (
          <Link to={`/video/${item?.snippet?.categoryId}/${item?.id}`} key={index} className="side-video-list">
            <img src={item?.snippet?.thumbnails?.default?.url} alt="thumnail" />
            <div className="vid-info">
              <h4>{item?.snippet?.title}</h4>
              <p>{item?.snippet?.channelTitle}</p>
              <p>{value_converter(item?.statistics?.viewCount)} views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Recommended;
