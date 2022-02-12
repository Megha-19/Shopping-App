import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import Data from "../components/Data";
import { Rating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-elements";
import * as wishlistActions from "../store/actions/wishlist";
import * as cartActions from "../store/actions/cart";

const Wishlist = ({ navigation }) => {
  const wishlistItems = useSelector((state) => {
    const transformedWishlistItems = [];
    for (const key in state.wishlist.wishlisted) {
      transformedWishlistItems.push({
        id: key,
        category: state.wishlist.wishlisted[key].category,
        title: state.wishlist.wishlisted[key].title,
        image: state.wishlist.wishlisted[key].image,
        description: state.wishlist.wishlisted[key].description,
        price: state.wishlist.wishlisted[key].price,
        rating: state.wishlist.wishlisted[key].rating,
      });
    }
    return transformedWishlistItems.sort((a, b) => (a.id > b.id ? 1 : -1));
  });

  const result = wishlistItems.reduce(function (result, item) {
    var key = Object.keys(item)[0];
    result[key] = item[key];
    return result;
  }, {});
  const id = result.id;

  const selectedProduct = useSelector((state) =>
    state.products.product.find((prod) => prod.id === id)
  );
  const dispatch = useDispatch();

  if (wishlistItems.length <= 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0a111c",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center",
            color: "white",
          }}
        >
          Your wishlist seems empty. Try adding some!{" "}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0a111c" }}>
      <FlatList
        data={wishlistItems}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetail", { id: item.id })
              }
            >
              <View style={{ flex: 1, alignItems: "center", margin: 7 }}>
                <Image
                  source={{ uri: `${item.image}` }}
                  resizeMode="stretch"
                  style={{
                    marginTop: 5,
                    height: 350,
                    width: "95%",
                    justifyContent: "center",
                    borderColor: "white",
                    borderWidth: 1,
                  }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {" "}
                  {item.title}
                </Text>
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
                <Text
                  style={{
                    justifyContent: "center",
                    fontSize: 17,
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {" "}
                  Price : ${item.Price}{" "}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <Button
                type="outline"
                title="Remove"
                containerStyle={{ flex: 1 }}
                titleStyle={{ color: "red" }}
                onPress={() => {
                  dispatch(wishlistActions.removeFromWishlist(item.id));
                }}
              />
              <Button
                type="outline"
                title="Add to Cart "
                containerStyle={{ flex: 1 }}
                onPress={() => {
                  dispatch(cartActions.addToCart(selectedProduct));
                  dispatch(wishlistActions.removeFromWishlist(item.id));
                }}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Wishlist;
