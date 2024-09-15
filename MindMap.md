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
  - map the data to a <List> Component

- Created <GameGrid> 
 - const { data, error, isLoading } = useGames();
   const skeletons = [1, 2, 3, 4, 5, 6];
 - <SimpleGrid> "view unlimeted cards"
 - padding='10px' spacing='10px' coulumns= {sm:..,md:.. , lg:..} "view unlimeted cards"
 - {error && <Text>{error}</Text>}
 - conditional renderting to the skeletons if loading , mapping the data to render games
 - Peak at the file

 - <PlatformSelector> component
  - we made an state hook of type <Genre | null> in the <App> for sharing the status
  - made Props in <GenreList> of onSelectGenre:(genre: Genre) => void for the onClick button
  - pass the prop to the app component (genre) => setSelctedGenre(genre)
  - made an interface selctedGenre: Genre | null  in the <GameGrid> to pass to the useGames when fetching the games
  - made our useData Hook more flexible by adding  requestConfig? and deps?:any[] and conditional updating in the [] 
  -pass the needed stuff to our useGame 
  -peak at file

 - Filter by Platform
  - we made an state hook of type <Platform | null> in the <App> for sharing the stauts
  - made Props in <PlatformList> of onSelectPlatform:(platform:Platform) => void for the onClick button we made onClick button () => onSelectPlatform(platform)
  - Pass the platform in the <App> onSelectPlatform{(platform) => setSelectedPlatform(platform)}
  - Pass the selectedPlatform to the <GameGrid> in <App> after defining the prop in the <GameGrid>
  - Add the selectedPlatform as a second argument in the useGame in the <GameGrid>
  - Make changes to useGame.ts 
   - pass another property to the params{}
    - platforms: selectedPlatform?.id
   -update the depencies array
    - [selectedGenre?.id, selectedPlatform?.id]

