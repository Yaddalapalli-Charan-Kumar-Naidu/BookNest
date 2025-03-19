import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'

import useAuthStore from "../../store/authStore"
const profile=()=>{
    const {logout}=useAuthStore();
    const handleLogout=()=>{
        logout();
        console.log("logged out");
    }
    return(
        <View style={styles.container}>
            <Text>Home page</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>logout</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
})
export default profile;