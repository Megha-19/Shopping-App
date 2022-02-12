import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Data from "../components/Data";
import ProductDetail from "./ProductDetail";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { withBadge, Badge, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import BadgeIcon from "../components/BadgeIcon";
import { Categories } from "../components/Categories";

const ProductsCircle = ({ navigation }) => {
  const wishlist = useSelector((state) => state.wishlist.wishlisted);
  const number = Object.keys(wishlist).length;
  useEffect(() => {
    navigation.setParams({ number: number });
  }, [number]);

  return (
    <View style={{ flex: 1, backgroundColor: "#0a111c" }}>
      <FlatList
        data={Categories}
        renderItem={({ item }) => (
          <View style={{ margin: 10 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductsList", { id: item.title })
              }
            >
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="stretch"
              >
                <Text style={styles.title}>{item.title} </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

ProductsCircle.navigationOptions = ({ navigation }) => {
  const num = navigation.getParam("number");

  return {
    headerRight: (
      <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Wishlist")}>
          <BadgeIcon badgeCount={num} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Order")}>
          <AntDesign
            style={{ paddingLeft: 5 }}
            name="shoppingcart"
            size={30}
            color="#0a111c"
          />
        </TouchableOpacity>
      </View>
    ),
    headerLeft: (
      <View style={{ marginLeft: 10 }}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Entypo name="menu" size={30} color="#0a111c" />
        </TouchableOpacity>
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    borderRadius: 6,
    height: 100,
    margin: 5,
    elevation: 0.8,
  },
  image: {
    borderColor: "white",
    borderWidth: 1,
    height: 200,
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
  },
  title: { fontSize: 20, color: "white", fontWeight: "bold", marginLeft: 10 },
});

export default ProductsCircle;
