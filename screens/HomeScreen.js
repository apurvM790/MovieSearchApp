import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, Image, ActivityIndicator, Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { API_KEY , BASE_URL} from "@env";

export default function HomeScreen () {

    const [ searchText , setSearchText ] = useState("");
    const [ movies, setMovies ] = useState([]);
    const [ page, setPage ] = useState(1);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [ searchData, setSearchData ] = useState([]);
    const [isSearching, setIsSearching] = useState(false);


    useEffect(()=>{
        fetchMovies();
    },[])

    const fetchMovies = async ()=>{
        if(loading) return;
        setLoading(true);
        try {

            const fetchData = await fetch(`${BASE_URL}?s=Marvel&page=${page}&apikey=${API_KEY}`);
            const data = await fetchData.json();
            if(data.Search){
                setMovies((previous)=>[...previous,...data.Search]);
                setPage((previous)=>previous+1);
            }
            
        } catch (error) {
            console.log("Error Occured...!");
        }
        setLoading(false);
    }

    const searchMovies = async ()=>{
        try {
            
            if(!searchText.trim()){
                Alert.alert("Error","Please enter the correct movie name to search..");
                return;
            }

            setIsSearching(true);

            let searchTemp = (searchText.split(" ")).filter((val)=>val!="").join("_");
            const searchFetch = await fetch(`${BASE_URL}?t=${searchTemp}&apikey=${API_KEY}`);
            const data = await searchFetch.json();

            if (data.Response === "True") {
                setSearchData([data]); 
            } else {
                setSearchData(null); 
                Alert.alert("Not Found", "No movie found with this name.");
            }

        } catch (error) {
            console.log("Error Occured...!");
        }
    }

    const cancelSearch = () => {
        setSearchText("");
        setSearchData(null);
        setIsSearching(false);
    };

    return (
        <View className="flex py-6 px-4 bg-gray-900 h-full">
            <View className="flex flex-row mb-4">
                <View className="flex w-9/12 flex-row items-center bg-gray-700 rounded-2xl px-2 py-1 shadow-md">
                    <Icon name="search" size={20} color="white" /> 
                      <TextInput
                        className="flex-1 text-white pl-3 text-base"
                        placeholder="Search for movies..."
                        placeholderTextColor="#bbb"
                        value={searchText}
                        onChangeText={setSearchText}
                      />
                      {searchText.length > 0 && (
                        <TouchableOpacity onPress={cancelSearch}>
                            <Icon name="x" size={20} color="white" />
                        </TouchableOpacity>
                    )}
                    </View>

            <TouchableOpacity onPress={searchMovies} className="ml-3  bg-gradient-to-r from-green-400 to-blue-500 py-3 rounded-full shadow-lg">
              <Text className="text-white text-center rounded-lg bg-blue-300 w-20 font-semibold text-lg">Search</Text>
            </TouchableOpacity>
            </View>

            {isSearching && searchData && (
                <FlatList
                data={searchData}
                keyExtractor={(item) => item.imdbID}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Details", { movie: item })}
                        className="bg-gray-600 p-3 mb-2 rounded-lg flex-row"
                    >
                        <Image source={{ uri: item.Poster }} className="w-20 h-20 rounded-lg border" />
                        <View className="ml-2">
                            <Text className="font-semibold text-lg text-white">{item.Title}</Text>
                            <Text className="text-gray-200">{item.Year}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            )}
            
            {!isSearching && (movies.length==0 && loading ?(
                <ActivityIndicator size="large" color="white" />
            )
            :(
                <FlatList 
                    className="border-t-2"    
                    data={movies}
                    keyExtractor={(item)=>item.imdbID}

                    renderItem={({item})=>(
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate("Details", {movie:item})}
                        className="bg-gray-600 p-3 mb-2 rounded-lg flex-row"
                        >
                            <Image source={{uri:item.Poster}} className="w-20 h-20 rounded-lg border" />
                            <View className="ml-2">
                            <Text className="font-semibold text-lg text-white">{item.Title}</Text>
                            <Text className="text-gray-200">{item.Year}</Text>
                            </View>
                        </TouchableOpacity>
                )}
                />
            ))}


            {movies.length>0 && (
                <View className="flex flex-row justify-around">
                <View className="">
                <TouchableOpacity onPress={fetchMovies} className="bg-green-300 px-4 py-2 mt-3 mb-3  rounded-xl flex justify-center items-center">
                    {loading ? <ActivityIndicator size="large" color="white" /> :<Text className="text-gray-500 text-lg">Load More</Text>}
                </TouchableOpacity>
                </View>
                <View>
                <TouchableOpacity onPress={()=>navigation.navigate("Favorites")} className="bg-purple-400 px-4 py-2 mt-3 mb-3  rounded-xl flex justify-center items-center">
                    <Text className="text-white text-lg">View Favorite</Text>
                </TouchableOpacity>
                </View>
                </View>
            )}

                


    </View>
    )

}
