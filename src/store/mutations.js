import {ADD_PRODUCT_TO_CART, UPDATE_PRODUCT_COUNT_FOR_CART, UPDATE_PRODUCT_SELECT_STATE_FOR_CART} from "./mutations-types";

export default {
  [ADD_PRODUCT_TO_CART](state, product) {
    product.selected = true;
    state.cardProductList.push(product);
  },
  [UPDATE_PRODUCT_COUNT_FOR_CART](state, product) {
    product.count++;
  },
  [UPDATE_PRODUCT_SELECT_STATE_FOR_CART](state, product) {
    product.selected = !product.selected;
  }
}
