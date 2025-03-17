import {View,Text,TouchableOpacity} from 'react-native'

import useAuthStore from "../../store/authStore"
const Home=()=>{
    const {logout}=useAuthStore();
    const handleLogout=()=>{
        logout();
        console.log("logged out");
    }
    return(
        <View>
            <Text>Home page</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>logout</Text>
            </TouchableOpacity>
        </View>
    )

}
export default Home;