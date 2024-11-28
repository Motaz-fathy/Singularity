// ** React Imports
import { Suspense, useContext, lazy, useEffect } from "react";
// ** Utils
import { useLayout } from "@hooks/useLayout";
import { useRouterTransition } from "@hooks/useRouterTransition";
import LayoutWrapper from "@layouts/components/layout-wrapper";
// ** Router Components
import {
  BrowserRouter as AppRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// ** Routes & Default Routes
import { DefaultRoute, Routes } from "./routes";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import { IntlContext } from "../utility/context/Internationalization";

const Router = () => {
  // ** Hooks
  const [layout, setLayout] = useLayout();
  const [transition, setTransition] = useRouterTransition();
  const intlContext = useContext(IntlContext);

  useEffect(() => {
    const lang = window.location.pathname.split("/")[1] === "ar" ? "ar" : "en";
    intlContext.switchLanguage(lang);
  }, []);

  // ** Default Layout
  const DefaultLayout = "VerticalLayout";

  // ** All of the available layouts
  const Layouts = { BlankLayout, VerticalLayout, HorizontalLayout };

  // ** Current Active Item
  const currentActiveItem = null;

  // ** Return Filtered Array of Routes & Paths
  const LayoutRoutesAndPaths = (layout) => {
    const LayoutRoutes = [];
    const LayoutPaths = [];

    if (Routes(intlContext.locale)) {
      Routes(intlContext.locale).filter((route) => {
        if (
          route.layout === layout ||
          (route.layout === undefined && DefaultLayout === layout)
        ) {
          LayoutRoutes.push(route);
          LayoutPaths.push(route.path);
        }
      });
    }

    return { LayoutRoutes, LayoutPaths };
  };

  const Error = lazy(() => import("@src/pages/Error/Error"));

  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {
      const LayoutTag = Layouts[layout];
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout);
      const routerProps = {};

      return (
        <Route path={LayoutPaths} key={index}>
          <LayoutTag
            routerProps={routerProps}
            layout={layout}
            setLayout={setLayout}
            transition={transition}
            setTransition={setTransition}
            currentActiveItem={currentActiveItem}
          >
            <Switch>
              {LayoutRoutes.map((route) => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact === true}
                    render={(props) => {
                      Object.assign(routerProps, { ...props, meta: route.meta });

                      return (
                        <Suspense fallback={null}>
                          <LayoutWrapper
                            layout={DefaultLayout}
                            transition={transition}
                            setTransition={setTransition}
                            {...(route.appLayout ? { appLayout: route.appLayout } : {})}
                            {...(route.meta ? { routeMeta: route.meta } : {})}
                            {...(route.className ? { wrapperClass: route.className } : {})}
                          >
                            <route.component {...props} />
                          </LayoutWrapper>
                        </Suspense>
                      );
                    }}
                  />
                );
              })}
            </Switch>
          </LayoutTag>
        </Route>
      );
    });
  };

  return (
    <AppRouter basename={process.env.REACT_APP_BASENAME}>
      <Switch>
        <Route exact path={`/`} render={() => <Redirect to={`/${intlContext.locale}${DefaultRoute}`} />} />
        <Route exact path={`/${intlContext.locale}/`} render={() => <Redirect to={`/${intlContext.locale}${DefaultRoute}`} />} />
        {ResolveRoutes()}
        <Route exact path="*" component={Error} />
      </Switch>
    </AppRouter>
  );
};

export default Router;
