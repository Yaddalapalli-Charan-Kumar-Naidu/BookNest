import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  ActivityIndicator,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import styles from "../../assets/styles/create.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/color";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system'
import useAuthStore from "../../store/authStore"
export default function create() {
    const {token}=useAuthStore();
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState("");
  const [imageBase64,setImageBase64] = useState("");
  const [caption,setCaption]=useState("");
  const [loading,setLoading]=useState(false);
  const router=useRouter();
  const ratingComponent = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={styles.starButton}
        >
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={32}
            color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
  };
  const pickImage = async () => {
    // Ask for permission
    try{
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied","Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:"images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
      base64:true,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      if(result.assets[0].base64){
        setImageBase64(result.assets[0].base64);
      }
      else{
        const base64=await FileSystem.readAsStringAsync(result.assets[0].url,{
            encoding:FileSystem.EncodingType.Base64,
        })
        setImageBase64(base64);
      }
    }
}catch(err){
    console.log("error:",err.message);
    Alert.alert("Error:",err.message);
}
  };
  const handleSubmit = async () => {
    // Check if all fields are filled
    if (!title || !caption || !imageBase64 || !rating) {
      Alert.alert("Error:", "Please fill all fields.");
      return;
    }
  
    try {
      setLoading(true);
  
      // Prepare data for submission
      const uriParts = image.split(".");
      const fileExtension = uriParts[uriParts.length - 1].toLowerCase(); // Get the last part after split (file extension)
      const allowedExtensions = ["jpg", "jpeg", "png"]; // List of allowed extensions
      const imageType = allowedExtensions.includes(fileExtension)
        ? `image/${fileExtension}`
        : "image/jpeg"; // Default to 'image/jpeg' if invalid type
  
      // Make sure the image is base64-encoded
      const imageDataUrl = `data:${imageType};base64,${imageBase64}`;
  
      // Prepare form data for submission
      const formData = {
        title,
        rating: rating.toString(),
        image: imageDataUrl, // Send the base64 image data
        caption,
      };
  
      // Example API call to submit data (replace with your actual API endpoint)
      const response = await fetch('https://booknest-backend-7tfy.onrender.com/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add token if required
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }
  
      Alert.alert("Success", "Your book recommendation has been posted!");
      setTitle("");
      setCaption("");
      setRating(3);
      setImage(null);
      setImageBase64(null);
      router.push("/");
  
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error:', error.message || 'An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.os === "ios" ? "padding" : "height"}

    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Book Recommendation</Text>
            <Text style={styles.subtitle}>Share your favorite books</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter book title"
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Rating</Text>
              {ratingComponent()}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Image</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons
                      name="image-outline"
                      size={40}
                      color={COLORS.textSecondary}
                    />
                    <Text style={styles.placeholderText}>
                      Tap to select image
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Captions</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Write your review or thoughts about this book..."
                    placeholderTextColor={COLORS.placeholderText}
                    value={caption}
                    onChangeText={setCaption}
                    multiline
                    />
            </View>
            <View style={styles.formGroup}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                    {
                        loading?(
                            <ActivityIndicator color={COLORS.white} />
                        ):
                        (
                            <>
                            <Ionicons name="cloud-upload-outline" size={20} colors={COLORS.white} style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>Post</Text>
                            </>
                        )
                    }
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
