import { View, Text, FlatList } from "react-native"

const Expense = ()=>
{
    const expense=[
        {
            id:1,
            "expense":"item"
        },
         {
            id:2,
            "expense":"item1"
        },
         {
            id:3,
            "expense":"item3"
        }
    ]

    return (
        <View>
            <View>
              <Text>
                Expense Card
              </Text>
            </View>
            <FlatList
            data={expense}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item})=>
            (
                <View>
                    <Text></Text>
                </View>
            )}
            />
        </View>
    )
}

export default Expense