import { respondTypes } from "../types/Api";
const loading = document.querySelector(".loading") as HTMLDivElement;
const streamersElem = document.querySelector(".streams") as HTMLDivElement;

let createStreamers = (streams: respondTypes[]) => {
  loading.style.display = "none";

  streams.reverse().forEach((stream: respondTypes) => {
    streamersElem.insertAdjacentHTML(
      "afterbegin",
      `
        <a href="https://www.twitch.tv/${stream.user_login}" data-aos="fade-up" data-aos-once="false"  data-aos-delay="200" class="streams-item" target="_blank">
        <div class="streams-thumbnail-parent">
          <img
            src="https://static-cdn.jtvnw.net/previews-ttv/live_user_${stream.user_login}-600x350.jpg"
            alt="${stream.user_login}"
            class="streams-thumbnail-img"
          />
        </div>
        <div class="streams-detail-parent">
          <div class="streams-name-view">
            <p class="stream-name">${stream.user_name}</p>
            <div class="stream-viewers-count">
              <i class="fa-regular fa-eye"></i>
              <span>${stream.viewer_count}</span>
            </div>
          </div>
          <div class="stream-title-parent">
            <p class="stream-title" title="${stream.title}">${stream.title}</p>
          </div>
        </div>
      </a>
        `
    );
  });
};

export default createStreamers;
