import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import i18n from "i18next";

export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUAGE = "add_language";

interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE;
  payload: "zh" | "en";
}

interface AddLanguageAction {
  type: typeof ADD_LANGUAGE;
  payload: {
    name: string;
    code: string;
  };
}

export type LanguageAction = ChangeLanguageAction | AddLanguageAction;

// export const changeLanguageActionCreator1 = (
//   languageCode: "zh" | "en"
// ): ChangeLanguageAction => {
//   return {
//     type: CHANGE_LANGUAGE,
//     payload: languageCode,
//   };
// };

export const changeLanguageActionCreator =
  (
    languageCode: "zh" | "en"
  ): ThunkAction<ChangeLanguageAction, RootState, unknown, LanguageAction> =>
  (dispatch, getState) => {
    i18n.changeLanguage(languageCode);

    return {
      type: CHANGE_LANGUAGE,
      payload: languageCode,
    };
  };

export const addLanguageActionCreator = (
  name: string,
  code: string
): AddLanguageAction => {
  return {
    type: ADD_LANGUAGE,
    payload: { name, code },
  };
};
