import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import registrationReducer from './redux/Reducers/registrationReducer'
import authReducer from './redux/Reducers/authReducer'
import personalAreaReducer from './redux/Reducers/personalAreaReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
    registration: registrationReducer,
    auth: authReducer,
    personalArea: personalAreaReducer
})

export const store = createStore(rootReducer,  composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
)

