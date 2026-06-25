import { TextInput, View } from "react-native"

const EditProfilePic = () =>
{
    return (
        <View>
            <View>
                <TextInput
                placeholder="username"
                placeholderTextColor={"grey"}
                />
            </View>
            <View>
                <TextInput
                placeholder="email"
                placeholderTextColor={"grey"}
                />
            </View>
            <View>
                <TextInput
                placeholder="phone number"
                placeholderTextColor={"grey"}
                />
            </View>
            <View>
                <TextInput
                placeholder="Currency"/>
            </View>
            <View>
                <TextInput
                placeholder="DateofBirth"
                placeholderTextColor={"grey"}
                />
            </View>
        </View>
    )
}

export default EditProfilePic