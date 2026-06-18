import { Text, View } from "react-native"
import { useSelector } from "react-redux"
import EditProfile from "../component/EditProfile"

const ProfileScreen = () =>
{
    const user = useSelector(
        (state:any)=> state.auth.user
    )

    return(
        <View>
            <View>
                <Text>{user?.username}</Text>
                <Text>{user?.email}</Text>
            </View> 
            <View>
                <Text>ACCOUNT</Text>
            </View>
            <EditProfile/>
        </View>
    )
}

export default ProfileScreen