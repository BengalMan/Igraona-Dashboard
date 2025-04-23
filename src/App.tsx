import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";
import { BrowserRouter, Route, Routes } from "react-router";

import dataProvider from './dashboardApp/providers/data-provider'
import ShowTournaments from "./dashboardApp/content/tournaments/ShowTournaments";
import Home from "./dashboardApp/content/Home";
import CreateTournament from "./dashboardApp/content/tournaments/create/CreateT";
import EditTournament from "./dashboardApp/content/tournaments/edit/EditT";
import { resources } from "./dashboardApp/config/resources";
import AppLayout from "./dashboardApp/components/AppLayout/AppLayout";
import LandingApp from "./landingPage/LandingApp"
import SignUpScreen from "./landingPage/landingTournaments/SignUpScreen";
import ShowTLanding from "./landingPage/landingTournaments/ShowTLanding";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <AntdApp>
          <Refine
            dataProvider={dataProvider}
            notificationProvider={useNotificationProvider}
            routerProvider={routerBindings}
            resources={resources}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: "4cEHo1-TlgDsX-WcifnB",
            }}
          >
            <Routes>
              <Route index element={<LandingApp />} />
              <Route path="/t" element={<ShowTLanding />} />
              <Route path="/t/:id" element={<SignUpScreen />} />
              <Route element={<AppLayout />}>
                <Route path="/tournaments" >
                  <Route index element={<ShowTournaments />} />
                  <Route path="new" element={<CreateTournament />} />
                  <Route path="edit/:id" element={<EditTournament />} />
                </Route>
                <Route path="/dashboard" element={<Home />} />
              </Route>
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
