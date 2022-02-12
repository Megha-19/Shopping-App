export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';

export const addToWishlist = product => {
  return { type: ADD_TO_WISHLIST, product: product };
};

export const removeFromWishlist = productId => {
  return { type: REMOVE_FROM_WISHLIST, pid: productId };
};
