import {ADD_PRODUCT_TO_CART, UPDATE_PRODUCT_COUNT_FOR_CART, UPDATE_PRODUCT_SELECT_STATE_FOR_CART} from "./mutations-types";

export default {
  addProductToCart({state, commit}, product) {
    let findProduct = state.cardProductList.find(item => item.iid === product.iid);

    if (findProduct) {
      commit(UPDATE_PRODUCT_COUNT_FOR_CART, findProduct);
    } else {
      product.count = 1;
      commit(ADD_PRODUCT_TO_CART, product);
    }
  },
  selectProduct({state, commit}, iid) {
    let findProduct = state.cardProductList.find(item => item.iid === iid);
    commit(UPDATE_PRODUCT_SELECT_STATE_FOR_CART, findProduct);
  }
}
