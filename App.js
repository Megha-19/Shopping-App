import React from 'react';
import {Provider} from 'react-redux';
import {createStore,combineReducers,applyMiddleware} from 'redux'
import {createAppContainer,createSwitchNavigator} from 'react-navigation';


import ordersReducer from './src/store/reducer/order';
import cartReducer from './src/store/reducer/cart';
import wishlistReducer from './src/store/reducer/wishlist';
import productReducer from './src/store/reducer/product';
import ShopNavigator from './src/navigation/ShopNavigator';
import NavigationContainer from './src/navigation/NavigationContainer';
import authReducer from './src/store/reducer/auth'
import ReduxThunk from 'redux-thunk';


const rootReducer = combineReducers({
  cart: cartReducer,
  orders: ordersReducer,
  wishlist:wishlistReducer,
  products:productReducer,
  auth:authReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))



export default function App () {
  return <Provider store={store}>
    <NavigationContainer />
  </ Provider>
}
