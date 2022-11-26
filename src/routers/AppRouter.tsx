// router uses a media query for splitting mobile / desktop navigation
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Media from 'react-media';

import MobileHomePage from '../components/mobile/MobileHomePage';
import MobileSelectedCityContainer from '../components/mobile/MobileSelectedCityContainer';
import DesktopHomePage from '../components/desktop/DesktopHomePage';


const AppRouter = () => {
  return( 
    <BrowserRouter>
      <div>
        <Media query="(min-width: 996px)">
          {matches => matches ? (
            <Routes >
              <Route 
                path="/*" 
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