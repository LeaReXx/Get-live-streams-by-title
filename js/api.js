import createStreamers from "./Main.js";
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
// get live by game, Api link
const apiLink = "https://api.twitch.tv/helix/streams?";
// game id, Ex: 32982 = Grand Theft Auto V
const gameid = 32982;
// stream type can receive one of these values: "all" or "live"
const streamType = "live";
// Receives the language of the stream Ex:"en"
const streamLang = "en";
let getUser = async () => {
    try {
        let getResponse = await getAPI();
        let response = await getResponse.json();
        let getChannels = await fetch(`${apiLink}game_id=${gameid}&first=100&type=${streamType}${cursor}&language=${streamLang}`, {
            method: "get",
            headers: {
                Authorization: `Bearer ${response.access_token}`,
                "Client-Id": clientID,
                "Content-Type": "application/json",
            },
        });
        let users = await getChannels.json();
        allStreams.push(...users.data);
        if (users.pagination.cursor) {
            cursor = `&after=${users.pagination.cursor}`;
            getUser();
        }
        else {
            filterStreams();
        }
    }
    catch (err) {
        console.log(err);
    }
};
let filterStreams = () => {
    let findedNpLiveStream = [];
    allStreams.forEach((eachStream) => {
        // 🚀 Response sample 🚀
        // id: number;
        // user_id: number;
        // user_login: string;
        // user_name: string;
        // game_id: number;
        // game_name: string;
        // type: string;
        // title: string;
        // viewer_count: number;
        // started_at: string;
        // language: string;
        // thumbnail_url: string;
        // tag_ids: [] | null;
        // tags: any;
        // is_mature: false;
        if (eachStream.title.toLowerCase().includes("nopixel")) {
            findedNpLiveStream.push(eachStream);
        }
    });
    createStreamers(findedNpLiveStream);
};
window.addEventListener("load", getUser);
