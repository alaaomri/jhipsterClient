import { defaultValue, IWebSite } from 'app/shared/model/website.model';
import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { ICrudDeleteAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import axios from 'axios';
import { cleanEntity } from 'app/shared/util/entity-utils';

export const ACTION_TYPES = {
  FETCH_WEBSITE_LIST: 'webSite/FETCH_WEBSITE_LIST',
  FETCH_WEBSITE: 'webSite/FETCH_WEBSITE',
  CREATE_WEBSITE: 'webSite/CREATE_WEBSITE',
  UPDATE_WEBSITE: 'webSite/UPDATE_WEBSITE',
  DELETE_WEBSITE: 'webSite/DELETE_WEBSITE',
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
    case REQUEST(ACTION_TYPES.CREATE_WEBSITE):
    case REQUEST(ACTION_TYPES.UPDATE_WEBSITE):
    case REQUEST(ACTION_TYPES.DELETE_WEBSITE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.DELETE_WEBSITE):
    case FAILURE(ACTION_TYPES.FETCH_WEBSITE):
    case FAILURE(ACTION_TYPES.CREATE_WEBSITE):
    case FAILURE(ACTION_TYPES.UPDATE_WEBSITE):
    case FAILURE(ACTION_TYPES.FETCH_WEBSITE_LIST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };

    case SUCCESS(ACTION_TYPES.FETCH_WEBSITE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_WEBSITE_LIST): {
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    }
    case SUCCESS(ACTION_TYPES.CREATE_WEBSITE):
    case SUCCESS(ACTION_TYPES.UPDATE_WEBSITE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_WEBSITE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
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

export const getEntity: ICrudGetAction<IWebSite> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_WEBSITE,
    payload: axios.get<IWebSite>(requestUrl),
  };
};

export const deleteEntity: ICrudDeleteAction<IWebSite> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_WEBSITE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const createEntity: ICrudPutAction<IWebSite> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_WEBSITE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IWebSite> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_WEBSITE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};
