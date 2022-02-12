import {ADD_TO_CART,REMOVE_FROM_CART,EMPTY_CART} from '../actions/cart';
import CartItem from '../../models/cart';

const initialState = {
    items: {},
    totalAmount: 0
  };
  
  
  export default (state = initialState, action) => {
  switch(action.type){
    case ADD_TO_CART:
      const addedProduct = action.product;
      const price = addedProduct.Price;
      const title = addedProduct.title;
      const image = addedProduct.image
 
      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          price,
          title,
          state.items[addedProduct.id].sum + price,
          image
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, price, title, price,image);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + +price
      };
      case REMOVE_FROM_CART:
        const selectedCartItem = state.items[action.pid];
        const currentQty = selectedCartItem.quantity;
        let updatedCartItems;
        if (currentQty > 1) {
          // need to reduce it, not erase it
          const updatedCartItem = new CartItem(
            selectedCartItem.quantity - 1,
            selectedCartItem.price,
            selectedCartItem.title,
            selectedCartItem.sum - selectedCartItem.price,
            image
          );
          updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
        } else {
          updatedCartItems = { ...state.items };
          delete updatedCartItems[action.pid];
        }
        return {
          ...state,
          items: updatedCartItems,
          totalAmount: state.totalAmount - +selectedCartItem.price
        };
        case EMPTY_CART:
          return{initialState}
      default:
          return state;
  }  
}
