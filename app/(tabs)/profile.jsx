import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons"; // For trash icon
import useAuthStore from "../../store/authStore";
import styles from "../../assets/styles/profile.styles";

const Profile = () => {
const [refreshing, setRefreshing] = useState(false);

  const [books, setBooks] = useState([]);
  const { logout, token, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    console.log("Logged out");
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      if (!refreshing) setRefreshing(true); // Start refreshing
      const response = await fetch(
        `https://booknest-backend-7tfy.onrender.com/api/books/user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      setBooks(responseData.books);
    } catch (err) {
      Alert.alert("Error", "Error fetching your recommendations");
      console.log("Error", err.message);
    } finally {
      setRefreshing(false); // End refreshing
    }
  };
  
  const handleDelete=async(id)=>{
    console.log("Id to delete:",id);
    try{
        setRefreshing(true);
        const response=await fetch(`https://booknest-backend-7tfy.onrender.com/api/books/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"applications/json",
                Authorization:`Bearer ${token}`
            }
        })
        const responseData=response.json();
        console.log(responseData);
        console.log(response);
        Alert.alert("Success","Recommendation deleted successfully");
        fetchBooks();
        
    }catch(err){
        console.log("Error",err.message);
        Alert.alert("Error","Error while deletion of recommendation");
    }finally{
        setRefreshing(false);
    }
  }
  const renderBook = ({ item }) => (
    <View style={styles.bookItem}>
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Ionicons
              key={index}
              name={
                index < Math.floor(item.rating)
                  ? "star"
                  : index < item.rating
                  ? "star-half"
                  : "star-outline"
              }
              size={16}
              color="#f1c40f"
            />
          ))}
        </View>
        <Text style={styles.bookCaption}>{item.caption}</Text>
        <Text style={styles.bookDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={()=>handleDelete(item._id)}>
        <Ionicons name="trash-outline" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user.profileImage }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.memberSince}>
            🗓️ Joined {new Date().toLocaleString("default", { month: "short", year: "numeric" })}
          </Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Book List Header */}
      <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>Your Recommendations 📚</Text>
        <Text style={styles.booksCount}>{books?.length} books</Text>
      </View>
   {!books || books?.length==0?( <View><Text style={styles.noBooks}>No recommendations posted</Text></View>):(<View></View>)}
      {/* Book List */}
      <FlatList
  data={books}
  keyExtractor={(item) => item._id}
  renderItem={renderBook}
  contentContainerStyle={styles.booksList}
  refreshing={refreshing}
  onRefresh={fetchBooks}
/>

    </View>
  );
};

export default Profile;
