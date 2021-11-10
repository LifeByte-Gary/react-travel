import {
  RecommendedProductsAction,
  FETCH_RECOMMENDED_PRODUCTS_START,
  FETCH_RECOMMENDED_PRODUCTS_FAIL,
  FETCH_RECOMMENDED_PRODUCTS_SUCCESS,
} from "./recommendedProductsActions";

interface RecommendedProductsState {
  loading: boolean;
  error: string | null;
  productList: any;
}

const defaultState: RecommendedProductsState = {
  loading: true,
  error: null,
  productList: [],
};

const recommendedProductsReducer = (
  state: RecommendedProductsState = defaultState,
  action: RecommendedProductsAction
) => {
  switch (action.type) {
    case FETCH_RECOMMENDED_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      };

    case FETCH_RECOMMENDED_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        productList: action.payload,
      };

    case FETCH_RECOMMENDED_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default recommendedProductsReducer;
