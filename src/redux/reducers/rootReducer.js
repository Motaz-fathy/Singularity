// ** Redux Imports
import {combineReducers} from "redux"

// ** Reducers Imports
import general from "./general.js"
import auth from "./auth.js"
import navbar from "./navbar.js"
import layout from "./layout.js"
import profile from "./profile.js"
import occasions from "./occasions.js"
import service_providers from "./service_providers.js"
import service_providers_requests from "./service_providers_requests"
import orders from "./orders"
import products from "./products"
import packages from "./packages"
import subCategories from "./subCategories"
import customers from './customers'
import customers_occasions from "./customers_occasions.js"
import category from "./category.js"
import productsRequests from "./productsRequests.js"
import hapinessAdvisor from "./hapiness-advisor.js"
import reviews from "./reviews"
import coupons from "./coupons.js"
import commission_rate from "./commission_rate.js"
import organizers from "./organizers.js"
import countries from "./countries.js"
const rootReducer = combineReducers({
  general,
  navbar,
  layout,
  auth,
  profile,
  occasions,
  service_providers,
  service_providers_requests,
  orders,
  products,
  packages,
  subCategories,
  customers,
  category,
  productsRequests,
  hapinessAdvisor,
  reviews,
  customers_occasions,
  coupons,
  commission_rate,
  organizers,
  countries
})

export default rootReducer
