import { FlatList, Text, View } from "react-native"

const card=[
    {
        id:1,
        "totalAmount":3000

    },
     {
        id:2,
        "totalAmount":7000

    },
     {
        id:3,
        "totalAmount":2000

    },

]
const BalanceCard = () =>
{

    return(
        <View>
            <View>
                <Text>Total Balance</Text>
            </View>
            <FlatList
        data={card}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              marginVertical: 5,
              backgroundColor: "#f5f5f5",
              borderRadius: 10,
            }}
          >
            <Text>ID: {item.id}</Text>
            <Text>Total Amount: ₹{item.totalAmount}</Text>
          </View>
        )}
      />
        </View>
    )
}

export default BalanceCard