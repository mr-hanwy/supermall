export default {
  getProductListForCart(state) {
    return state.cardProductList;
  },
  getProductListLengthForCart(state) {
    return state.cardProductList.length;
  }
}
