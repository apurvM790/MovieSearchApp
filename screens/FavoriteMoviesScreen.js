import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function FavoriteMoviesScreen (){

    const [movieList, setMovieList] = useState([]);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(()=>{
        getFavorites();
    },[])
    );

    const getFavorites = async () => {
        try {
            let favorites = await AsyncStorage.getItem("favorites");

            favorites = favorites ? JSON.parse(favorites) : [];
            setMovieList(favorites);

        } catch (error) {
            console.log("Error retrieving favorites:", error);
            return [];
        }
    };

    return (
        <>
        { !movieList.length  ? (<View className="flex h-full justify-center items-center bg-gray-900">
            <Text className="text-white text-2xl font-bold">Please Add Movies To Favorite!</Text>
            </View>) :
            (<View className="flex pt-10 h-full  justify-center items-center bg-gray-900">
            <FlatList 
             className="w-full"
             data={movieList}
             keyExtractor={(item)=>item.imdbID}
             renderItem={({item})=>(
                <TouchableOpacity onPress={()=>navigation.navigate("Favorite_Movie",{movie:item , onRemove:getFavorites})} className="bg-gray-600 w-11/12 mx-3 p-3 mb-2 rounded-lg flex-row">
                    <Image source={{uri:item.Poster}} className="w-20 h-20 rounded-lg border" />
                    <View className="ml-2">
                    <Text className="font-semibold text-lg text-white">{item.Title}</Text>
                    <Text className="text-gray-200">{item.Year}</Text>
                    </View>
                </TouchableOpacity>
             )}
            />
        </View>)}
        </>
    )
}