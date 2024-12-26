- <Grid> in the app with conditional template area {sm:..,lg:..}
- <GridItem> with the count of template areas and assign area="" to each
- <Show> for conditional <Nav> of above=""
  - Build <NavBar>
    -import image as an object with set boxSize="" , src={} -<HStack> the image and the <ColorModeSwitch>
    --<HStack> the <Switch> and the text
    ---<Switch> with isChecked="" colorScheme="" onChange="" --> toggleColorMode=useState('')
- Create axios apiClient with with key:"..." , and baseUrl: ""
- Create image crop function file
- Create a generic <useData> to fetch the data
- <useData.ts> effect hook with all of:
  - generic [data] [error] [isLoading] , interface FetchResponse<T> , - interface <T>(endpoint : string, requestConfig?: AxiosRequestConfig, deps?: any[] ), - apiClient.get('endpoint',{signal: controller.signal, ...requestConfig}) , - setData(res.data.results) , setLoading('false') - controller with AbortController catch error insatceof Canceled , - , deps ? [...deps] : [] - return { data, error, isLoading }
    -Peak at the file
- Create <useGenres.ts> , <useGames.ts> , export required interfaces.
  -<useGenres.ts> - import <useData.ts> - export interface Genre - id: number , name: string , image_background - <useGenere> = () => useData<Genre>("genres")
  -<useGames.ts> - import useData from "./useData"; - export interface Platform {id: number;name: string;slug: string;metacritic?: number;} - export interface Game {metacritic: number;id: number;name: string;background_image: string; parent_platforms: { platform: Platform }[]; website?: string;}
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
- made an interface selctedGenre: Genre | null in the <GameGrid> to pass to the useGames when fetching the games
- made our useData Hook more flexible by adding requestConfig? and deps?:any[] and conditional updating in the []
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

- Added sortOrder list object and map it to have value and key
- set on click to a prop and define
  -- interface Props {onSelectSortOrder: (sortOrder: string) => void;}
  -- set onClick to
  onClick={() => onSelectSortOrder(order.value)}
- update <App> add sortOrder: string; GameQuery interface
  -- onSelectSortOrder={(sortOrder) =>setGameQuery({ ...gameQuery, sortOrder })}
- update <useGames> params to have:
  ordering: gameQuery.sortOrder
- create a sortOrder prop in the <SortSelector>: sortOrder: string;
- pass it to the <App> : sortOrder={gameQuery.sortOrder}
-
- make a const of the current sortOrder
  const currentSortOrder = sortOrders.find((order) => order.value === sortOrder);
- Change the label to:
  Order by : {currentSortOrder?.label || "Relevance"}

\_**\_Git\_\_**

- created <SearchInput> component add to <NavBar> and made nowrap for the text
- removed justifyContent={"space-between"} from <NavBar>
- const ref = useRef<HTMLInputElement>(null); in the <SearchInput>
- made form width 100% in the <index.css>

---

-Created <GameHeading>
-interface gameQuery: GameQuery
-Made conditional heading by adding a ${game || ''} so it renders the name of the platform only if it exist

- Align both componenets in one <Box> and apply only one padding to them

---

-Code clean up at <GenreList>
--> <Button>
whiteSpace='normal'
textAlign='left'
--> <Image>
objectFit='cover'
--> Added <Genre> Heading with a fragment
fontSize'2xl' marginBottom='3'

---

-Code clean up at <GameCard>
--> move <Heading> after <HStack>

-Code clean up at <GameGrid>
--> spacing{6}
--> columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}

---

<useGames> add rating_top: number; to Game Interface
we use something called Index signature emojiMap:{[key:number]:ImageProps}
added a boxSize property to the object and this makes it add all the properties when rendered
add it to <GameCard>

---

Console --> Network--> Genre request --> Preview --> Copy Value
new folder for data new file for genres.ts
export default {Paste};
go to useGenres and
--> const useGenere = () => ({data:null, isLoading:false, error:null})
we set the data to the new genres stored in the module
we don't need the data hook anymore at the top
--> import genres from "../data/genres"
--> const useGenere = () => ({data:genres, isLoading:false, error:null})

Console --> Network--> Platform request --> Preview --> Copy Value
new folder for data new file for platforms.ts
export default {Paste};
go to usePlatforms and
--> const usePlatforms = () => (({data:null, isLoading:false, error:null}))
we set the data to the new platform stored in the module
we don't need the data hook anymore at the top
--> import platforms from "../data/platforms";
--> const usePlatforms = () => (({data:platforms, isLoading:false, error:null}))

---

Look at theme.ts

---

refactor Game grid
if (error) return <Text>{error}</Text>;
return (...)
