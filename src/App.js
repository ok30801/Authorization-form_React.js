import Authorization from './pages/Authorization/index'
import RecoveryPassword from './pages/RecoveryPassword/index'
import Registration from './pages/Registration/index'
import PersonalArea from './pages/PersonalArea/index'
import NotFound from './pages/404'
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'

const App = () => {

    return (
        <div className="App">
            <Switch>
                <Route path="/" exact component={Authorization}/>
                <Route path="/recovery-password" component={RecoveryPassword}/>
                <Route path="/registration" component={Registration}/>
                <Route path="/person-area" component={PersonalArea}/>
                <Route path='/404' component={NotFound}/>
                <Redirect to="/404"/>
            </Switch>
        </div>
    )
}

export default App
