import React from 'react';
import {
  createMemoryRouter,
  createRoutesFromElements,
  RouterProvider,
  useRouteError,
  Outlet,
  Route,
  Link as ReactRouterLink, useLocation,
} from 'react-router-dom';
import UnlockScreen from "../screens/UnlockScreen";
import ProfilesScreen, {AccountSwitcher} from "../screens/ProfilesScreen";
import AssetsScreen from "../screens/AssetsScreen";
import NetworksScreen from "../screens/NetworksScreen";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Link as ChakraLink, Select,
} from "@chakra-ui/react";
import CredentialsScreen from "../screens/CredentialsScreen";



const Root = () => {
  const location = useLocation();
  return (
    <div className="nautilus-wallet-app">
      <header className="nautilus-wallet-header">
        <div className="nautilus-wallet-header-nav">
          {
          location.pathname != '/' && <MainMenu></MainMenu>
          }
          <span className="nautilus-wallet-title">Nautilus Wallet</span>
          {
            location.pathname != '/' && <AccountSwitcher></AccountSwitcher>
          }
        </div>
      </header>
      <div className="nautilus-wallet-content">
        <Outlet/>
      </div>
    </div>
  )
}

const Error = (e: any, b: any) => {
  let error: any = useRouteError();
  return (
    <>
      <pre className="error">{error.toString()}</pre>
    </>
  )
}

const router = createMemoryRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root/>} errorElement={<Error/>}>
      <Route path="/" element={<UnlockScreen/>}/>
      <Route path="/profiles" element={<ProfilesScreen/>}/>
      <Route path="/networks" element={<NetworksScreen/>}/>
      <Route path="/assets" element={<AssetsScreen/>}/>
      <Route path="/credentials" element={<CredentialsScreen/>}/>
    </Route>
  )
);

const MainMenu = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
      />
      <MenuList>
        <MenuItem><ChakraLink as={ReactRouterLink} to="/profiles">Profiles</ChakraLink></MenuItem>
        <MenuItem><ChakraLink as={ReactRouterLink} to="/networks">Networks</ChakraLink></MenuItem>
        <MenuDivider/>
        <MenuItem><ChakraLink as={ReactRouterLink} to="/assets">My Assets</ChakraLink></MenuItem>
        <MenuItem><ChakraLink as={ReactRouterLink} to="/credentials">My Credentials</ChakraLink></MenuItem>
      </MenuList>
    </Menu>
  )
}

const RouteBuilder = () => {
  return (
    <React.Fragment>
      <RouterProvider router={router}/>
    </React.Fragment>
  );
};

export default RouteBuilder;
