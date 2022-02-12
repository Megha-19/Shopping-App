
import {ADD_TO_WISHLIST,REMOVE_FROM_WISHLIST} from '../actions/wishlist'
import Wishlist from '../../models/wishlist'

const initialState = {
    wishlisted: []
  };
  export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_WISHLIST:
          
            const addedProduct = action.product;
            const id = addedProduct.id;
            const title = addedProduct.title;
            const category = addedProduct.category;
            const image = addedProduct.image
            const description = addedProduct.description; 
            const price = addedProduct.Price;
            const rating = addedProduct.rating;
            

      
      let updatedOrNewWishlistItem;

      if (state.wishlisted[addedProduct.id]) {
       return state;
      } else {
        updatedOrNewWishlistItem = new Wishlist(id, category, title, image, description, price,rating);
       
      }
      return{
        ...state,
        wishlisted: { ...state.wishlisted, [addedProduct.id]: updatedOrNewWishlistItem }
      }
      case REMOVE_FROM_WISHLIST:
        let updatedWishlistItems;
          updatedWishlistItems = { ...state.wishlisted };
          delete updatedWishlistItems[action.pid];
      
        return {
          ...state,
          wishlisted: updatedWishlistItems
        }

      default:
          return state;
    }
}