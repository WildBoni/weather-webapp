// router uses a media query for splitting mobile / desktop navigation
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Media from 'react-media';

import MobileHomePage from '../components/MobileHomePage';
import MobileSelectedCityContainer from '../components/MobileSelectedCityContainer';
import DesktopHomePage from '../components/DesktopHomePage';

// export const history = createBrowserHistory();

const AppRouter = () => {
  return( 
    // <Router history={history}>
    <BrowserRouter>
      <div>
        <Media query="(min-width: 997px)">
          {matches => matches ? (
            <Routes >
              <Route 
                path="/" 
                element = {<DesktopHomePage/>}
              />
            </Routes>
          ) : (
            <>
              <Routes>
                <Route 
                  path="/" 
                  element={<MobileHomePage/>}
                />
                <Route 
                  path="/city/:id"
                  element={<MobileSelectedCityContainer/>}
                />
              </Routes>
              
            </>
          )}
        </Media>
      </div>
    </BrowserRouter>
  )
};

export default AppRouter;