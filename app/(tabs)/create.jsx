import { View, Text, KeyboardAvoidingView, ScrollView, Platform, TextInput } from 'react-native'
import React, { useState } from 'react'
import styles from '../../assets/styles/create.styles'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../../constants/color'
export default function create() {
    const [title,setTitle]=useState("");
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.os==="ios"?"padding":"height"}>
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>Add Book Recommendation</Text>
                <Text style={styles.subtitle}>Share your favorite books</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Title</Text>
                    <View style={styles.inputContainer} >
                        <Ionicons
                        name='book-outline'
                        size={20}
                        color={COLORS.textSecondary}
                        style={styles.inputIcon}
                        />
                        <TextInput
                        style={styles.input}
                        placeholder='Enter book title'
                        placeholderTextColor={COLORS.placeholderText}
                        value={title}
                        onChangeText={setTitle}
                        />
                    </View>
                </View>
            </View>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}