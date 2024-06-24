import { all, call } from 'typed-redux-saga/macro';

import { usersSaga } from './user/user.saga';

export function* rootSaga() {
    yield* all([call(usersSaga)]);
}