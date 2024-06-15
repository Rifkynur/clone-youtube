import React, { useState, useEffect } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import axios from "axios";
import { API_KEY, value_converter, toTopScroll } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = () => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentsData, setCommentsData] = useState([]);

  const { videoId } = useParams();

  const fetchVideoData = () => {
    axios
      .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`)
      .then((result) => setApiData(result?.data?.items[0]))
      .catch((err) => console.log(err));
  };

  const fetchChannelData = () => {
    axios
      .get(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData?.snippet?.channelId}&key=${API_KEY}`)
      .then((result) => setChannelData(result?.data?.items[0]))
      .catch((err) => console.log(err));
  };

  const fetchCommentsData = () => {
    axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`).then((result) => setCommentsData(result?.data?.items));
  };

  useEffect(() => {
    fetchVideoData();
    toTopScroll();
  }, [videoId]);

  useEffect(() => {
    fetchChannelData();
    fetchCommentsData();
  }, [apiData]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=    `}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData?.snippet?.title || "title here"}</h3>
      <div className="play-video-info">
        <p>
          {value_converter(apiData?.statistics?.viewCount) || "16k"} views &bull; {moment(apiData?.snippet?.publishedAt).fromNow() || ""}
        </p>
        <div>
          <span>
            <img src={like} alt="like icon" />
            {value_converter(apiData?.statistics?.likeCount)}
          </span>
          <span>
            <img src={dislike} alt="dislike icon" />
          </span>
          <span>
            <img src={share} alt="share icon" />
            share
          </span>
          <span>
            <img src={save} alt="save icon" />
            save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData?.snippet?.thumbnails?.default?.url} alt="channel" />
        <div>
          <p>{apiData?.snippet?.channelTitle || "Channel Title"}</p>
          <span>{value_converter(channelData?.statistics?.subscriberCount)} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="video-describtion">
        <p>{apiData?.snippet.description.slice(0, 300) || "Description"}</p>

        <hr />
        <h4>{value_converter(apiData?.statistics?.commentCount || "120")} comments</h4>

        {/* comments section */}
        {commentsData.map((item, index) => {
          return (
            <div key={index} className="comment">
              <img src={item?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} alt="icon_profile" />
              <div>
                <h3>
                  {item?.snippet?.topLevelComment?.snippet?.authorDisplayName} <span>1 day ago</span>
                </h3>
                <p>{item?.snippet?.topLevelComment?.snippet?.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="likeIcon" />
                  <span>{value_converter(item?.snippet?.topLevelComment?.snippet?.likeCount)}</span>
                  <img src={dislike} alt="dislikeIcon" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
