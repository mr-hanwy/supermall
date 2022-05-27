import {ADD_PRODUCT_TO_CART, UPDATE_PRODUCT_COUNT_FOR_CART, UPDATE_PRODUCT_SELECT_STATE_FOR_CART} from "./mutations-types";

export default {
  addProductToCart({state, commit}, product) {
    return new Promise((resolve, reject) => {
      let findProduct = state.cardProductList.find(item => item.iid === product.iid);

      if (findProduct) {
        commit(UPDATE_PRODUCT_COUNT_FOR_CART, findProduct);
        resolve('购物车商品数量 +1！');
      } else {
        product.count = 1;
        commit(ADD_PRODUCT_TO_CART, product);
        resolve('商品已加入购物车！');
      }
    });
  },
  selectProduct({state, commit}, iid) {
    let findProduct = state.cardProductList.find(item => item.iid === iid);
    commit(UPDATE_PRODUCT_SELECT_STATE_FOR_CART, findProduct);
  }
}
