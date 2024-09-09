- <Grid> in the app with conditional template area {sm:..,lg:..}
- <GridItem> with the count of template areas and assign area="" to each
- <Show> for conditional <Nav> of above=""
    - Build <NavBar>
    -import image as an object with set boxSize="" , src={}
    -<HStack> the image and the <ColorModeSwitch>
    --<HStack> the <Switch> and the text
    ---<Switch> with isChecked="" colorScheme="" onChange="" --> toggleColorMode=useState('')
- Create axios apiClient with with key:"..." , and baseUrl: ""
- Create image crop function file
- Create a generic <useData> to fetch the data
 - <useData.ts> effect hook with all of:
    - generic [data] [error] [isLoading] , interface FetchResponse<T> , 
        interface <T>(endpoint : string) , apiClient.get('endpoint',{signal: controller.signal}) , setData(res.data.results) , setLoading('true') , controller with AbortController catch error insatceof Canceled ,
        return { data, error, isLoading } 
    -Peak at the file
- Create <useGenres.ts> , <useGames.ts> , export required interfaces.
    -<useGenres.ts> 
        - import <useData.ts>
        - export interface Genre
        - id: number , name: string
    - <useGenere> = () => useData<Genre>("genres")
        -<useGames.ts>
        - import useData from "./useData";
        - export interface Platform {id: number;name: string;slug: string;metacritic: number;}
        - export interface Game {metacritic: number;id: number;name: string;background_image: string; parent_platforms: { platform: Platform }[];}
        - <useGames> = () => useData<Game>("games")
- <GenreList>
  - import useGenere from "../hooks/useGenres";
  - const { data } = useGenere(); "in the body"
  - map the data to a ul

- Created <GameGrid> 
 - const { data, error, isLoading } = useGames();
   const skeletons = [1, 2, 3, 4, 5, 6];
 - <SimpleGrid> "view unlimeted cards"
 - padding='10px' spacing='10px' coulumns= {sm:..,md:.. , lg:..} "view unlimeted cards"
 - {error && <Text>{error}</Text>}
 - conditional renderting to the skeletons if loading , mapping the data to render games
 - Peak at the file

 - 
