let clientID = "ziyrb5v49cybtar32bhc8wmg10quy2";
let clientSecret = "05ci5wa7mzat8q9tqenrfaiobz8wah";

let bodyOption = {
  client_id: clientID,
  client_secret: clientSecret,
  grant_type: "client_credentials",
};

let getAPI = async () => {
  return await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyOption),
  });
};

let allStreams = [];
let cursor = "";
// let resPerReq = 100;
let getUser = async () => {
  try {
    let getResponse = await getAPI();
    let response = await getResponse.json();
    let getChannels = await fetch(
      `https://api.twitch.tv/helix/streams?game_id=32982&first=100&type=live${cursor}&language=en`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${response.access_token}`,
          "Client-Id": clientID,
          "Content-Type": "application/json",
        },
      }
    );
    let users = await getChannels.json();
    console.log(users);
    allStreams.push(...users.data);
    console.log(allStreams);
    if (users.pagination.cursor) {
      cursor = `&after=${users.pagination.cursor}`;
      getUser();
    } else {
      generateToDom();
    }
  } catch (err) {
    console.log(err);
  }
};

let generateToDom = () => {
  console.log("Start Searching");
  let findedNpLiveStream = [];
  allStreams.forEach((eachStream) => {
    if (eachStream.title.toLowerCase().includes("nopixel")) {
      findedNpLiveStream.push(eachStream);
    }
  });
  console.log(findedNpLiveStream);
};
window.onload = getUser();