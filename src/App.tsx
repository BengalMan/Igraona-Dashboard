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

import dataProvider from './providers/data-provider'
import ShowTournaments from "./content/tournaments/ShowTournaments";
import Home from "./content/Home";
import AppLayout from "./components/AppLayout/AppLayout";
import CreateTournament from "./content/tournaments/create/CreateT";
import EditTournament from "./content/tournaments/edit/EditT";
import { resources } from "./config/resources";

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
              <Route index element={<WelcomePage />} />
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
