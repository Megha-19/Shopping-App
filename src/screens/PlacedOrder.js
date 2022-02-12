import React from "react";
import {
  FlatList,
  Text,
  Platform,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-elements";
import { useSelector } from "react-redux";
import moment from "moment";

const PlacedOrder = ({ navigation }) => {
  const orders = useSelector((state) => state.orders.orders);

  const Date = ({ item }) => {
    const dat = moment(item).format("LLLL");
    return (
      <Text
        style={{
          color: "white",
          fontSize: 16,
          padding: 4,
          textAlign: "center",
        }}
      >
        {" "}
        Order placed on : {dat}
      </Text>
    );
  };

  if (orders.length <= 0) {
    return (
      <View style={styles.emptyOrderContainer}>
        <Text style={styles.emptyOrderText}>
          {" "}
          You haven't placed any order.
        </Text>
        <Button
          type="clear"
          title="Start Shopping"
          onPress={() => navigation.navigate("Shop")}
        />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#0a111c" }}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 5, marginTop: 5 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("OrderDetails", { item: item.items })
              }
            >
              <View style={styles.date}>
                <Date item={item.date} />
                <Text style={styles.totalAmount}>
                  Amount to be Paid: ${item.totalAmount}{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyOrderContainer: {
    flex: 1,
    backgroundColor: "#0a111c",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyOrderText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  date: {
    borderColor: "white",
    borderWidth: 2,
    marginVertical: 5,
    borderRadius: 7,
  },
  totalAmount: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    padding: 4,
  },
});

PlacedOrder.navigationOptions = (navigation) => {
  return {
    headerTitle: "Your Orders",
  };
};

export default PlacedOrder;
