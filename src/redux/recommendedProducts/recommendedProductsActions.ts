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

export const FetchRecommendedProductsFailActionCreator = (
  error: any
): FetchRecommendedProductsFailAction => {
  return {
    type: FETCH_RECOMMENDED_PRODUCTS_FAIL,
    payload: error,
  };
};
