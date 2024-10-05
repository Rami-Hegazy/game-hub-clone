import { GameQuery } from "../App";
import useData from "./useData";

export interface Platform {
  id: number;
  name: string;
  slug: string;
  metacritic?: number;
}

export interface Game {
  metacritic: number;
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  website?: string;
}

const useGames = (gameQuery: GameQuery) =>
  useData<Game>(
    "/games",
    {
      params: {
        genres: gameQuery.genre?.id,
        platform: gameQuery.platform?.id,
      },
    },
    [gameQuery]
  );
export default useGames;
