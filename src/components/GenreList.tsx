import useGenere from "../hooks/useGenres";

const GenreList = () => {
  const { data } = useGenere();

  return (
    <ul>
      {data.map((genre) => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </ul>
  );
};

export default GenreList;
