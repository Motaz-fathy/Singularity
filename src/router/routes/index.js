import { lazy } from "react";
// ** Document title
const TemplateTitle = "%s - Motaz Admin Dashboard";
//force build
// ** Default Route
const DefaultRoute = "/home";

// ** Merge Routes
const Routes = lang => {
  return [
    {
      path: `/${lang}/home`,
      component: lazy(() => import("../../pages/Home/Home"))
    },
    {
      path: `/${lang}/profile/:token?`,
      component: lazy(() => import("../../pages/Profile/Profile"))
    },

    {
      path: `/${lang}/Projects-Team/add-project`,
      component: lazy(() => import("../../pages/ProjectsManagement/Projects/AddProject/AddEditProject")),
      exact: true,
    },
    {
      path: `/${lang}/Projects-Team`,
      component: lazy(() => import("../../pages/ProjectsManagement/ProjectsTeam/ProjectsTeam")),
      exact: true,
    },

    {
      path: `/${lang}/Projects-Team/view-project/:id`,
      component: lazy(() => import("../../pages/ProjectsManagement/Projects/viewProject/index.jsx")),
      exact: true,
    },

    // team management
    {
      path: `/${lang}/Teams`,
      component: lazy(() => import("../../pages/TeamManagement/Teams/index")),
      exact: true,
    },
    {
      path: `/${lang}/Teams/add-team`,
      component: lazy(() => import("../../pages/TeamManagement/Teams/AddTeam/index")),
      exact: true,
    },
    {
      path: `/${lang}/Teams/create-member`,
      component: lazy(() => import("../../pages/TeamManagement/Teams/CreateMember/index.jsx")),
      exact: true,
    },
    {
      path: `/${lang}/Teams/view-team/:team_id`,
      component: lazy(() => import("../../pages/TeamManagement/Teams/ViewTeam/index")),
      exact: true,
    },

    // task management 

    {
      path: `/${lang}/Tasks`,
      component: lazy(() => import("../../pages/Task/index.jsx")),
      exact: true,
    },
    {
      path: `/${lang}/Tasks/add-task`,
      component: lazy(() => import("../../pages/TeamManagement/Teams/ViewTeam/index")),
      exact: true,
    },
    {
      path: `/${lang}/Tasks/view-task/:id`,
      component: lazy(() => import("../../pages/Task/viewTask/index.jsx")),
      exact: true,
    },

    {
      path: `/${lang}/login/:token?`,
      component: lazy(() => import("../../pages/Login/Login")),
      layout: "BlankLayout",
      meta: {
        authRoute: true
      }
    },
    {
      path: `/${lang}/forget-password`,
      component: lazy(() =>
        import("../../pages/ForgetPassword/ForgetPassword")
      ),
      layout: "BlankLayout",
      meta: {
        authRoute: true
      }
    },
    {
      path: `/${lang}/reset-password/:token`,
      component: lazy(() => import("../../pages/ResetPassword/ResetPassword")),
      layout: "BlankLayout",
      meta: {
        authRoute: true
      }
    },
    {
      path: `/${lang}/error`,
      component: lazy(() => import("../../pages/Error/Error")),
      layout: "BlankLayout"
    },

  ];
};

export { DefaultRoute, TemplateTitle, Routes };
