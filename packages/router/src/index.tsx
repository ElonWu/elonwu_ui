import React, { Suspense, Component, ReactNode, ReactChild } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

export interface ElonRoute {
  key?: string;
  title?: string;
  path?: string;
  index?: boolean;
  component?: Component | string;
  redirect?: string;
  routes?: ElonRoute[];
  inMenu?: boolean;
  icon?: ReactNode;
}

// 生成嵌套路由
const genRoutesDom = (loading: ReactNode, routes?: ElonRoute[] | null) => {
  if (!Array.isArray(routes)) return null;

  return routes.map((route) => {
    const {
      path,
      index,
      component,
      redirect,
      key,
      routes: nestedRoutes,
    } = route;

    // 直接引入的组件
    const isReactComponent =
      component && React.Component.isPrototypeOf(component);

    // 当前渲染内容
    const Page: any = !component
      ? Outlet
      : isReactComponent
      ? (component as Component)
      : null;

    // 渲染 element
    let element = null;

    if (redirect) {
      element = <Navigate to={redirect} replace />;
    } else {
      element = (
        <Suspense fallback={loading as ReactChild}>
          <Page />
        </Suspense>
      );
    }

    const routeProps = index
      ? { index: true, element } // IndexRouteProps
      : !path
      ? {
          element, // 纯布局
          children: genRoutesDom(loading, nestedRoutes), // 渲染子路由节点
        }
      : {
          path,
          element,
          children: genRoutesDom(loading, nestedRoutes), // 渲染子路由节点
        }; // PathRouteProps | LayoutRouteProps

    // 渲染路由节点
    return <Route key={key} {...routeProps} />;
  });
};

export const ElonRouter = ({
  rootRoutes,
  loading,
  basename = '/',
}: {
  basename: string;
  rootRoutes: ElonRoute[];
  loading: ReactNode;
}) => {
  return (
    <Router basename={basename}>
      <Routes>{genRoutesDom(loading, rootRoutes)}</Routes>
    </Router>
  );
};

// 官方 Demo
{
  /* <Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
  </Route>
  <Route element={<PageLayout />}>
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/tos" element={<Tos />} />
  </Route>
  <Route path="contact-us" element={<Contact />} />
</Routes> */
}

// /privacy 会构建出如下布局

{
  /* <App>
  <PageLayout>
    <Privacy />
  </PageLayout>
</App> */
}
