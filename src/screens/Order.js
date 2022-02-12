import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ToastAndroid,
  Platform,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, ThemeProvider } from "react-native-elements";
import * as cartActions from "../store/actions/cart";
import * as wishlistActions from "../store/actions/wishlist";
import * as ordersActions from "../store/actions/order";

const Order = ({ navigation }) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        id: key,
        price: state.cart.items[key].Price,
        title: state.cart.items[key].title,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
        image: state.cart.items[key].image,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const result = cartItems.reduce(function (result, item) {
    var key = Object.keys(item)[0];
    result[key] = item[key];
    return result;
  }, {});
  const id = result.id;

  const selectedProduct = useSelector((state) =>
    state.products.product.find((prod) => prod.id === id)
  );

  const dispatch = useDispatch();

  if (cartItems.length <= 0 || cartTotalAmount === 0) {
    return (
      <View style={styles.emptyBagContainer}>
        <Text style={styles.emptyBagText}>
          Your bag is empty. Start shopping now!!!
        </Text>
      </View>
    );
  }

  return (
    <View style={{}}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 5 }}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: `${item.image}` }}
                style={styles.imageDimensions}
                resizeMode="stretch"
              />
              <View>
                <Text style={styles.title}>{item.title} </Text>
                <Text style={{ color: "white" }}> Price: $ {item.price} </Text>
                <Text style={{ color: "white" }}>
                  {" "}
                  Quantity : {item.quantity}{" "}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                //    marginVertical: 5,
                justifyContent: "space-evenly",
              }}
            >
              <Button
                type="clear"
                title="Remove"
                containerStyle={{ flex: 1 }}
                titleStyle={{ color: "red" }}
                onPress={() => {
                  dispatch(cartActions.removeFromCart(item.id));
                }}
              />
              <Button
                type="clear"
                title="Move to wishlist"
                containerStyle={{ flex: 1 }}
                onPress={() => {
                  dispatch(cartActions.removeFromCart(item.id));
                  dispatch(wishlistActions.addToWishlist(selectedProduct));
                }}
              />
            </View>
          </View>
        )}
      />

      <View style={styles.bag}>
        <Text style={styles.bagText}>Total</Text>
        <Text
          style={{
            color: "white",
            fontSize: 19,
            marginVertical: 10,
            padding: 5,
          }}
        >
          ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
        </Text>
      </View>
      <Button
        type="solid"
        title="Place Order"
        buttonStyle={{ backgroundColor: "red", marginBottom: 20, marginTop: 5 }}
        onPress={() => {
          Platform.OS === "android" && ToastAndroid.show("Order Placed", 1000);
          navigation.navigate("OrderPlaced");
          dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
          dispatch(cartActions.emptyCart());
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyBagContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#0a111c",
  },
  emptyBagText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  bagContainer: {
    flex: 1,
    backgroundColor: "#0a111c",
  },
  imageDimensions: { height: 150, width: 150 },
  title: { color: "white", fontSize: 20, marginLeft: 5 },
  bag: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#f5f5ff",
    elevation: 0.8,
    borderWidth: 0.4,
    marginVertical: 5,
    borderRadius: 7,
    paddingHorizontal: 10,
  },
  bagText: {
    color: "white",
    fontSize: 19,
    marginEnd: 5,
    marginVertical: 10,
    padding: 5,
  },
});

export default Order;
