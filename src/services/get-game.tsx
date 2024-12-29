import apiClient from "./api-client";

const getGame = (gameId: number) => {
  const contoller = new AbortController();
  apiClient
    .get(`/games/${gameId}`, { signal: contoller.signal })
    .then((res) => {
      if (res.data.website) {
        window.open(res.data.website, "_blank");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getGame;
