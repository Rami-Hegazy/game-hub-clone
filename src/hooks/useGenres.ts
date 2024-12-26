import genres from "../data/genres";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenere = () => ({data:genres, isLoading:false, error:null})

export default useGenere;
