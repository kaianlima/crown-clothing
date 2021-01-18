import { all, call, takeLatest, put } from "redux-saga/effects";

import CartActionTypes from "../cart/cart.types";
import UserActionTypes from "../user/user.types";
import { clearCart } from "./cart.actions";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* clearCartOnPaymentSuccess() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onPaymenSuccess() {
  yield takeLatest(CartActionTypes.CLEAR_CART, clearCartOnPaymentSuccess);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
