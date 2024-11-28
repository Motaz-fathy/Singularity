import {
  Home,
  Circle,
  User,
  Calendar,
  Star,
  Percent,
  DollarSign,
  Package,
  Bell, Move, ShoppingBag,
} from "react-feather";
import { balloons, service_provider } from "../../utility/images";
import ar from '@src/assets/data/locales/ar.json'
import en from '@src/assets/data/locales/en.json'

const locales = {
  ar: ar.SIDE_MENU,
  en: en.SIDE_MENU
}
// eslint-disable-next-line import/no-anonymous-default-export
export default (lang) => {
  return [
    {
      id: "home",
      title: locales[lang]['HOME'],
      icon: <Home size={20} />,
      navLink: `/${lang}/home`,
      localeKey: "HOME",
    },

    {
      id: "teamManagement",
      title: lang === "en" ? "Team Management" : "المنتجات",
      icon: <ShoppingBag size={20} />,
      navLink: `/${lang}/Team-Management`,
      localeKey: "Team_Management",
      children: [
        {
          id: "teams",
          title: lang === "en" ? "Teams" : "الفرق",
          icon: <Circle size={20} />,
          navLink: `/${lang}/Teams`,
          localeKey: "Teams",
        },

      ],
    },

    {
      id: "projectManagement",
      title: lang === "en" ? "Project Management" : "ادارة المشروع",
      icon: (
        <img
          alt="Project icon"
          src={balloons}
          className="occasions_balloons_icon"
        />
      ),
      localeKey: "Project_Management",
      children: [

        {
          id: "Project",
          title: lang === "en" ? "Project Team" : "فرق المشاريع",
          icon: <Circle size={20} />,
          navLink: `/${lang}/Projects-Team`,
          localeKey: "PROJECTS",
        },
       
      ],
    },

    {
      id: "Tasks_Management",
      title: lang === "en" ? "Task Management" : "المنتجات",
      icon: <ShoppingBag size={20} />,
      navLink: `/${lang}/Tasks`,
      localeKey: "Tasks_Management",
      children: [
        {
          id: "Tasks",
          title: lang === "en" ? "Tasks" : "المهام",
          icon: <Circle size={20} />,
          navLink: `/${lang}/Tasks`,
          localeKey: "Tasks",
        },

      ],
    },

  ];
};
