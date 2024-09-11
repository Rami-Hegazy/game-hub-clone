import {
  Card,
  Heading,
  Image,
  CardBody,
  HStack,
  Button,
} from "@chakra-ui/react";
import { Game } from "../hooks/useGames";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../services/image-url";
import getGameWebsite from "../services/get-game";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const handleClick = () => {
    getGameWebsite(game.id);
  };
  return (
    <Card padding={4}>
      <Image src={getCroppedImageUrl(game.background_image)} alt={game.name} />
      <CardBody padding={4}>
        <Heading fontSize={"2xl"}>{game.name}</Heading>
        <HStack justifyContent={"space-between"}>
          <PlatformIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </HStack>
        <Button onClick={handleClick}>Website</Button>
      </CardBody>
    </Card>
  );
};

export default GameCard;
