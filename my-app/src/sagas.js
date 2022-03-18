import { takeLatest, call, put, all } from "redux-saga/effects";

export default function* rootSaga() {
    yield all([
        watcherSaga(),
        watcherPostSaga()
    ])
}

const watcherSaga = function* () {
    yield takeLatest("fetching", workerSaga);
}
const watcherPostSaga = function* () {
    yield takeLatest("posting", workerPostSaga);
}
const workerSaga = function* () {
    try {
        const fetchFun = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                return data;
            } catch (err) {
                console.log(err);
            }
        };
        const response = yield call(fetchFun);
        yield put({ type: "success", response });
    } catch (err) {
        console.log(err);
    }
}
// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify({
//         title: this.state.title,
//         body: this.state.body,
//         userId: this.state.userId,
//     }),
//     headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//     },
// })
//     .then((response) => response.json())
//     .then((json) => console.log(json));
const workerPostSaga = function* (action) {
    try {
        const postfun = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: action.data,
                        body: action.body,
                        userId: action.userId,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });
                const data = await response.json();
                return data;
            } catch (err) {
                console.log(err);
            }
        };
        const response = yield call(postfun);
        yield put({ type: "postData", response });
    } catch (err) {
        console.log(err);
    }
}
