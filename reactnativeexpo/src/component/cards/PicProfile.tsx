import { Image, Text, View } from "react-native"

const PicProfile = () =>
{
    return(
        <View>
           <Text>Profile Picture</Text>
           <Image
           source={{uri:'https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg'}}>

           </Image>
          
        </View>
    )
}

export default PicProfile