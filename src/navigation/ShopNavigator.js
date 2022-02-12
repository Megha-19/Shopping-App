import React from "react";
import { View, TouchableOpacity, Button, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerActions,
  DrawerItems,
} from "react-navigation-drawer";
import ProductsCircle from "../screens/ProductsCircle";
import ProductsList from "../screens/ProductsList";
import ProductDetail from "../screens/ProductDetail";
import Wishlist from "../screens/Wishlist";
import Order from "../screens/Order";

import PlacedOrder from "../screens/PlacedOrder";
import OrderDetails from "../screens/OrderDetails";

import { Entypo } from "@expo/vector-icons";
import Signin from "../screens/Signin";
import StartupScreen from "../screens/StartupScreen";

const navigator = createStackNavigator(
  {
    Shop: { screen: ProductsCircle },
    ProductsList,
    ProductDetail,
    Wishlist,
    Order,
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#0a111c",
    },
  }
);

const OrderNavigator = createStackNavigator(
  {
    OrderPlaced: {
      screen: PlacedOrder,
      navigationOptions: {
        headerTitle: "Orders",
        headerLeft: (
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={() => DrawerActions.toggleDrawer()}>
              <Entypo name="menu" size={30} color="#0a111c" />
            </TouchableOpacity>
          </View>
        ),
      },
    },
    OrderDetails,
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#0a111c",
    },
  }
);
const AdminNavigator = createStackNavigator(
  {
    Auth: Signin,
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#0a111c",
    },
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Shop: navigator,
    Orders: OrderNavigator,
  },
  {
    contentOptions: {
      activeTintColor: "#0a111c",
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color="#0a111c"
              onPress={() => {
                dispatch(authActions.logout());
                // props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AdminNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
