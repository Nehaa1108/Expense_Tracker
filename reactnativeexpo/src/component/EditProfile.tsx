import { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"

const EditProfile = () =>
{

    const [update,setUpdate] = useState('')

    const [formData,setFormData] = useState({
        
    })

    return (
        <View>
            <View>
                <Text>Edit Profile</Text>
            </View>
            <View>
                <TextInput 
                placeholder="Username"
                placeholderTextColor={'grey'}

                />
                <TextInput 
                placeholder="Email"
                placeholderTextColor={'grey'}
                />
            </View>
            <View>
                <TouchableOpacity>
                 
                 <Text>{update? 'Update' : 'Add'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditProfile