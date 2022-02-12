import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Data from "../components/Data";
import { Rating } from "react-native-ratings";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import BadgeIcon from "../components/BadgeIcon";

const ProductsList = ({ navigation }) => {
  const category = navigation.getParam("id");
  const wishlist = useSelector((state) => state.wishlist.wishlisted);
  const number = Object.keys(wishlist).length;
  useEffect(() => {
    navigation.setParams({ number: number });
  }, [number]);

  const filterbyCategory = (category) => {
    return Data.filter((results) => {
      return results.category === category;
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0a111c" }}>
      <FlatList
        data={filterbyCategory(category)}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetail", {
                  id: item.id,
                  title: item.title,
                })
              }
            >
              <View style={{ flex: 1, alignItems: "center", margin: 7 }}>
                <Image
                  source={{ uri: `${item.image}` }}
                  resizeMode="stretch"
                  style={styles.image}
                />
                <Text style={styles.title}> {item.title}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "white", fontSize: 16 }}> Rating </Text>
                  <Rating
                    readonly
                    startingValue={item.rating}
                    imageSize={18}
                    ratingColor="#08244a"
                    tintColor="#0a111c"
                  />
                </View>
                <Text style={styles.price}> Price : ${item.Price} </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

ProductsList.navigationOptions = ({ navigation }) => {
  const num = navigation.getParam("number");
  return {
    headerTitle: navigation.getParam("id"),
    headerRight: (
      <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Wishlist")}>
          <BadgeIcon badgeCount={num} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Order")}>
          <AntDesign name="shoppingcart" size={30} color="#0a111c" />
        </TouchableOpacity>
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    borderRadius: 6,
  },
  image: {
    marginTop: 5,
    height: 350,
    width: "95%",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingTop: 8,
  },
  price: {
    justifyContent: "center",
    fontSize: 17,
    textAlign: "center",
    color: "white",
  },
});

export default ProductsList;
