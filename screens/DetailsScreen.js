import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { API_KEY, BASE_URL } from "@env";

export default function DetailsScreen ({route}){
    
    const [movieData, setMovieData] = useState(null);
    const searchId = route.params.movie.imdbID;
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async ()=>{
        try {
            const fetchDataById = await fetch(`${BASE_URL}?i=${searchId}&apikey=${API_KEY}`);
            const data = await fetchDataById.json();
            setMovieData(data);
        } catch (error) {
            console.log("Error Occured...!");
        }
        setLoading(false);
    }

    const saveToFavorites = async ()=>{
            try {
              let existingFavorites = await AsyncStorage.getItem("favorites");
              existingFavorites = existingFavorites ? JSON.parse(existingFavorites) : [];
        
              if (existingFavorites.some((fav) => fav.imdbID === movieData.imdbID)) {
                Alert.alert("Already Saved", "This movie is already in your favorites.");
                return;
              }
        
              existingFavorites.push(movieData);
              await AsyncStorage.setItem("favorites", JSON.stringify(existingFavorites));
              Alert.alert("Saved!", "Movie has been added to favorites.");
            } catch (error) {
              console.error("Error saving movie:", error);
            }
    };

    

    return (
        <>
        {movieData && !loading ? (<View className="bg-gray-900 h-full pt-10">
            <View className="flex justify-center items-center">
            <Image source={{uri:movieData.Poster}} className="w-8/12 rounded-lg h-80 border-2"/>
            </View>
            <View className="flex mt-4 justify-center items-center mx-4">
            <Text className="text-blue-200 text-3xl font-semibold">{movieData.Title}</Text>
            <Text className="text-gray-200 text-lg font-light">({movieData.Year})</Text>
            </View>
            <View className="flex items-end mr-10">
                <Text className="text-gray-300 font-medium text-2xl">⭐ {movieData.Ratings[0].Value}</Text>
            </View>
            <View className="flex ml-6 my-4">
                <View className="flex-row">
                    <Text className="text-gray-300 text-xl font-semibold">Genre: </Text>
                    <Text className="text-gray-200 text-lg font-normal">{movieData.Genre}</Text>
                </View>
                <View className="flex my-2 mr-2">
                    <Text className="text-gray-300 text-xl font-semibold">Plot: </Text>
                    <Text className="text-gray-200 text-lg font-light">{movieData.Plot}</Text>
                </View>
            </View>
            <View className="flex justify-center items-center">
            <TouchableOpacity onPress={saveToFavorites} className="bg-green-500 flex justify-center items-center w-7/12 px-4 py-2 mt-4 rounded-lg">
        <Text className="text-gray-100 text-lg font-semibold ">Add To Favorites</Text>
      </TouchableOpacity>
      </View>

        </View>) : <ActivityIndicator className="" size="large" color="black" />}
        </>
    )
}