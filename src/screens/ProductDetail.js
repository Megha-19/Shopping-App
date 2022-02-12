import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Dimensions,
  StyleSheet,
} from "react-native";
import Data from "../components/Data";
import { Text, Button, ThemeProvider } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import * as wishlistActions from "../store/actions/wishlist";
import * as cartActions from "../store/actions/cart";

const ProductDetail = ({ navigation }) => {
  const [wish, setWish] = useState(false);
  const id = navigation.getParam("id");
  const selectedProduct = useSelector((state) =>
    state.products.product.find((prod) => prod.id === id)
  );

  const dispatch = useDispatch();

  const result = (v) => {
    const results = Data.find((val) => val.id === v);
    return results;
  };
  const da = result(id);

  const array = Array(da);

  return (
    <View style={{ flex: 1, backgroundColor: "#0a111c" }}>
      <FlatList
        data={array}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ margin: 5 }}>
            <Image
              source={{ uri: `${item.image}` }}
              resizeMode="contain"
              style={styles.imageDimensions}
            />
            <Text style={styles.title}>{item.title} </Text>
            <View>
              <Text style={styles.description}> {item.Description}</Text>
            </View>
            <Text style={styles.price}> Price : ${item.Price}</Text>
            <View style={styles.cartContainer}>
              <Button
                type="outline"
                title="Add to Cart"
                containerStyle={{
                  backgroundColor: "#f0f6ff",
                  marginVertical: 10,
                  width: 200,
                }}
                onPress={() => {
                  Platform.OS === "android"
                    ? ToastAndroid.show("Added to Cart", 1000)
                    : null;

                  dispatch(cartActions.addToCart(selectedProduct));
                }}
              />

              {item.favourite || wish ? (
                <Button
                  type="outline"
                  title="Wishlisted"
                  containerStyle={{
                    borderColor: "red",
                    width: 200,
                    marginVertical: 10,
                  }}
                  buttonStyle={{ backgroundColor: "red" }}
                  titleStyle={{ color: "white" }}
                  onPress={() => {
                    item.favourite = false;
                    setWish(false);
                    dispatch(wishlistActions.removeFromWishlist(item.id));
                  }}
                />
              ) : (
                <Button
                  type="outline"
                  title="Wishlist"
                  containerStyle={{ width: 200, marginVertical: 10 }}
                  onPress={() => {
                    item.favourite = true;
                    setWish(true);
                    dispatch(wishlistActions.addToWishlist(selectedProduct));
                  }}
                />
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageDimensions: { height: "85%", width: "100%" },
  title: { color: "white", textAlign: "center", marginTop: 10, fontSize: 25 },
  description: {
    color: "white",
    fontSize: 14,
    textAlign: "left",
    marginTop: 5,
    letterSpacing: 1,
  },
  price: { color: "white", fontSize: 18, marginTop: 10, textAlign: "center" },
  cartContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute", //Here is the trick
    marginTop: Dimensions.get("screen").height / 1.25,
  },
});

ProductDetail.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam("title"),
    headerRight: (
      <View style={{ marginRight: 5 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Order")}>
          <AntDesign name="shoppingcart" size={30} color="#0a111c" />
        </TouchableOpacity>
      </View>
    ),
  };
};

export default ProductDetail;
