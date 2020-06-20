import { defaultValue, IWebSite } from 'app/shared/model/website.model';
import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { ICrudGetAllAction } from 'react-jhipster';
import axios from 'axios';

export const ACTION_TYPES = {
  FETCH_WEBSITE_LIST: 'webSite/FETCH_LABEL_LIST',
  FETCH_WEBSITE: 'webSite/FETCH_LABEL',
  CREATE_WEBSITE: 'webSite/CREATE_LABEL',
  UPDATE_WEBSITE: 'webSite/UPDATE_LABEL',
  DELETE_WEBSITE: 'webSite/DELETE_LABEL',
  RESET: 'webSite/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IWebSite>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type WebSiteState = Readonly<typeof initialState>;

export default (state: WebSiteState = initialState, action): WebSiteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_WEBSITE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_WEBSITE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_WEBSITE_LIST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_WEBSITE_LIST): {
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/websites';

// Actions

export const getEntities: ICrudGetAllAction<IWebSite> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_WEBSITE_LIST,
  payload: axios.get<IWebSite>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
