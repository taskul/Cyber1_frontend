export default function calcTotalPrice(cart) {
  // tally is our accumulator of reduce and CartItem,
  return cart.reduce((tally, cartItem) => {
    // products could be deleted, but they could still be in your cart
    if (!cartItem.product) return tally;
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}
