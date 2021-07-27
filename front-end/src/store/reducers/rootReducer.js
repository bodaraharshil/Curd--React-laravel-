import { combineReducers } from "redux";

import Userreducer from './user';
import Authreducer from './auth';

const rootReducer = combineReducers({
    Userreducer,
    Authreducer
})

export default rootReducer;