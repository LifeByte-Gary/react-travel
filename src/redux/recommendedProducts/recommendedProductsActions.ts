import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";

export const FETCH_RECOMMENDED_PRODUCTS_START =
  "fetch_recommended_products_start";
export const FETCH_RECOMMENDED_PRODUCTS_SUCCESS =
  "fetch_recommended_products_success";
export const FETCH_RECOMMENDED_PRODUCTS_FAIL =
  "fetch_recommended_products_fail";

interface FetchRecommendedProductsStartAction {
  type: typeof FETCH_RECOMMENDED_PRODUCTS_START;
}

interface FetchRecommendedProductsSuccessAction {
  type: typeof FETCH_RECOMMENDED_PRODUCTS_SUCCESS;
  payload: any;
}

interface FetchRecommendedProductsFailAction {
  type: typeof FETCH_RECOMMENDED_PRODUCTS_FAIL;
  payload: any;
}

export type RecommendedProductsAction =
  | FetchRecommendedProductsStartAction
  | FetchRecommendedProductsSuccessAction
  | FetchRecommendedProductsFailAction;

export const fetchRecommendedProductsStartActionCreator =
  (): FetchRecommendedProductsStartAction => {
    return {
      type: FETCH_RECOMMENDED_PRODUCTS_START,
    };
  };

export const fetchRecommendedProductsSuccessActionCreator = (
  data: any
): FetchRecommendedProductsSuccessAction => {
  return {
    type: FETCH_RECOMMENDED_PRODUCTS_SUCCESS,
    payload: data,
  };
};

export const fetchRecommendedProductsFailActionCreator = (
  error: any
): FetchRecommendedProductsFailAction => {
  return {
    type: FETCH_RECOMMENDED_PRODUCTS_FAIL,
    payload: error,
  };
};

export const giveMeDataActionCreator =
  (): ThunkAction<void, RootState, unknown, RecommendedProductsAction> =>
  async (dispatch, getState) => {
    dispatch(fetchRecommendedProductsStartActionCreator());

    try {
      const { data } = await axios.get(
        "http://123.56.149.216:8080/api/productCollections"
      );
      dispatch(fetchRecommendedProductsSuccessActionCreator(data));
    } catch (error: any) {
      dispatch(fetchRecommendedProductsFailActionCreator(error.message));
    }
  };
