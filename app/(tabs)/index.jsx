import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import {Image} from "expo-image"
import styles from "../../assets/styles/home.styles";
import COLORS from "../../constants/color";
import useAuthStore from "../../store/authStore";
import { useLocalSearchParams } from 'expo-router';
const PAGE_SIZE = 3;

const HomeScreen = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true); // ✅ track if more books exist
const {token}=useAuthStore();

const { refresh } = useLocalSearchParams();

  useEffect(() => {
    if (refresh) {
      fetchBooks(); // Call your data fetch
    }
  }, [refresh]);
  const fetchBooks = async (pageNumber = 1, refreshing = false) => {
    try {
      if (refreshing) setRefreshing(true);
      else if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await fetch(
        `https://booknest-backend-7tfy.onrender.com/api/books?page=${pageNumber}&limit=${PAGE_SIZE}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add token if required
          },
        }
      );
      const data = await response.json();
      console.log("data:",data);
      const newBooks = data.books;
      console.log("books:",newBooks)
      if (refreshing || pageNumber === 1) {
        setBooks(newBooks);
      } else {
        setBooks((prevBooks) => {
          const existingIds = new Set(prevBooks.map(book => book._id)); // or book.id
          const filteredNewBooks = newBooks.filter(book => !existingIds.has(book._id));
          return [...prevBooks, ...filteredNewBooks];
        });
      }
      

      setPage(data.page);
      setHasMore(data.page < data.totalPages); // ✅ compare page with totalPages
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onRefresh = useCallback(() => {
    setPage(1);
    setHasMore(true);
    fetchBooks(1, true);
  }, []);

  const loadMore = () => {
    if (!hasMore || loadingMore) return;
    fetchBooks(page + 1);
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.user?.profileImage }} style={styles.avatar} />
          <Text style={styles.username}>{item.user?.username}</Text>
        </View>
      </View>

      <View style={styles.bookImageContainer}>
        <Image source={{ uri: item.image }} style={styles.bookImage} />
      </View>

      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>

        <View style={styles.ratingContainer}>
          {Array.from({ length: item.rating }).map((_, index) => (
            <Text key={index}>⭐</Text>
          ))}
        </View>

        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.date}>
          Shared on {new Date(item.createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item, index) => item._id || index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator style={styles.footerLoader} color={COLORS.primary} />
          ) : null
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>BookNest 📗</Text>
            <Text style={styles.headerSubtitle}>
              Discover great reads from the community 👇
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default HomeScreen;
