import {
  Button,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useGenere, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

interface Props{
  onSelectedGenre:(genre:Genre)=>void;
}

const GenreList = ({onSelectedGenre}:Props) => {
  const { data, isLoading, error } = useGenere();

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <List>
      {data.map((genre) => (
        <ListItem paddingX={3} paddingY={"3px"} key={genre.id}>
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={"8"}
              src={getCroppedImageUrl(genre.image_background)}
            ></Image>
            <Button onClick={() => onSelectedGenre(genre)} variant="link" fontSize="lg">
              {genre.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;
