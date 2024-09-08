import useGenere from "../hooks/useGenres";

const GenreList = () => {
  const { genres } = useGenere();

  return (
    <ul>
      {genres.map((genre) => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </ul>
  );
};

export default GenreList;
