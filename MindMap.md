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
        - interface <T>(endpoint : string, requestConfig?: AxiosRequestConfig, deps?: any[] ), 
        - apiClient.get('endpoint',{signal: controller.signal, ...requestConfig}) , 
        - setData(res.data.results) , setLoading('false') 
        - controller with AbortController catch error insatceof Canceled ,
        - , deps ? [...deps] : []
        - return { data, error, isLoading } 
    -Peak at the file
- Create <useGenres.ts> , <useGames.ts> , export required interfaces.
    -<useGenres.ts> 
        - import <useData.ts>
        - export interface Genre
        - id: number , name: string , image_background
        - <useGenere> = () => useData<Genre>("genres")
    -<useGames.ts>
        - import useData from "./useData";
        - export interface Platform {id: number;name: string;slug: string;metacritic?: number;}
        - export interface Game {metacritic: number;id: number;name: string;background_image: string; parent_platforms: { platform: Platform }[]; website?: string;}
        -const useGames = (gameQuery: GameQuery) => useData<Game>("/games",{params: {genres: gameQuery.genre?.id,platform: gameQuery.platform?.id,},},[gameQuery]);
        -Peak at the file
- <GenreList>
  - import useGenere from "../hooks/useGenres";
  - const { data, isLoading, error} = useGenere(); "in the body"
  - map the data to a <List> Component

- Created <GameGrid> 
 - interface Props {gameQuery: GameQuery;}
 - const { data, error, isLoading } = useGames(gameQuery);
   const skeletons = [1, 2, 3, 4, 5, 6];
 - {error && <Text>{error}</Text>}
 - <SimpleGrid> "view unlimeted cards"
 - padding='10px' spacing='10px' coulumns= {sm:..,md:.. , lg:..} "view unlimeted cards"
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
  - made Props in <PlatformIconList> of onSelectPlatform:(platform:Platform) => void for the onClick button we made onClick button () => onSelectPlatform(platform)
  - Pass the platform in the <App> onSelectPlatform{(platform) => setSelectedPlatform(platform)}
  - Pass the selectedPlatform to the <GameGrid> in <App> after defining the prop in the <GameGrid>
  - Add the selectedPlatform as a second argument in the useGame in the <GameGrid>
  - Make changes to useGame.ts 
   - pass another property to the params{}
    - platforms: selectedPlatform?.id
   -update the depencies array
    - [selectedGenre?.id, selectedPlatform?.id]

- Refactor: Extract a Query object
 -Changes in the <App>
  - export interface GameQuery {genre: Genre | null;platform: Platform | null;}
  - const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  - update the selectedGenere and selectedPlatform with gameQuery: GameQuery in every file
  - update the onselectedGenere with setGameQuery({ ...gameQuery, genre }) in <App>
  - update <useGames> to have const useGames = (gameQuery: GameQuery) 
  - update <useGames> to have gameQuery.genre? and gameQuery.platform? 
  - deps array = [gameQuery]
  - set gameQuery={gameQuery} and get rid of selectedGenre in <App>
  
- Made <SortSelector> similar to <PlatformSelector>

-  Added sortOrder list object and map it to have value and key
- set on click to a prop  and define 
-- interface Props {onSelectSortOrder: (sortOrder: string) => void;}
-- set onClick to 
              onClick={() => onSelectSortOrder(order.value)}
- update <App>  add   sortOrder: string; GameQuery interface
--          onSelectSortOrder={(sortOrder) =>setGameQuery({ ...gameQuery, sortOrder })}
- update <useGames> params to have:
        ordering: gameQuery.sortOrder
- create a sortOrder prop in the <SortSelector>:  sortOrder: string;
- pass it to the <App> : sortOrder={gameQuery.sortOrder}
- 
- make a const of the current sortOrder 
 const currentSortOrder = sortOrders.find((order) => order.value === sortOrder);
- Change the label to:
        Order by : {currentSortOrder?.label || "Relevance"}

- created <SearchInput> component add to <NavBar> and made nowrap for the text



