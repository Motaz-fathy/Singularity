// !Do not remove the Layout import

import Layout from "@layouts/VerticalLayout";
import Loader from "../components/Loader/Loader";
import Snackbar from "../components/Snackbar/Snackbar";
import { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { setHistoryPath } from "../redux/actions/general";
import { IntlContext } from "../utility/context/Internationalization";

import { DataProvider } from "../utility/context/serviceProviderData";
import { DataProduct } from "../utility/context/ProductData";
import { DataProductRequest } from "../utility/context/productRequestData";
import { AppConstantsProvider } from "../utility/context/appConstants";
import { ProductsProvider } from "../utility/context/productsFilterContext";
import { PackageData } from "../utility/context/packageData";
import { removeItemFromLocalStorage } from "../utility/Utils";
import { PackagesProvider } from "../utility/context/packagesFilterContext";
import { PackageProductsProvider } from "../utility/context/packageProductsContext";
import { CustomersProvider } from "../utility/context/customersContext";
import { HapinessAdvisorProvider } from "../utility/context/hapinessAdvisorFiltersContext";
import { requestAllCountries } from "../redux/thunk/countries";

const VerticalLayout = (props) => {
  const {
    loader,
    snackbar: { visible },
    historyPath,
  } = useSelector((state) => state.general);
  const dispatch = useDispatch();
  const history = useHistory();
  const { locale } = useContext(IntlContext);

  useEffect(() => {
    return history.listen((location) => {
      if (location.pathname !== `/${locale === "en" ? "ar" : "en"}/profile`) {
        removeItemFromLocalStorage("profileTab");
      }
      if (
        location.pathname !==
        `/${locale === "en" ? "ar" : "en"}/occasions/groups`
      ) {
        removeItemFromLocalStorage("occasions_groups_gp_status_filter");
        removeItemFromLocalStorage("occasions_groups_gp_name_filter");
      }
      if (
        location.pathname !==
        `/${locale === "en" ? "ar" : "en"}/occasions/occasion`
      ) {
        removeItemFromLocalStorage("occasions_name_filter");
        removeItemFromLocalStorage("occasions_group_filter");
        removeItemFromLocalStorage("occasions_status_filter");
      }
    });
  }, [history]);




  return (
    <Layout {...props}>
      <CustomersProvider>
        <PackageData>
          <PackageProductsProvider>
            <DataProvider>
              <AppConstantsProvider>
                <DataProduct>
                  <DataProductRequest>
                    <ProductsProvider>
                      <HapinessAdvisorProvider>
                        <PackagesProvider>
                          {loader && <Loader />}
                          {visible && <Snackbar />}
                          {props.children}
                        </PackagesProvider>
                      </HapinessAdvisorProvider>
                    </ProductsProvider>
                  </DataProductRequest>
                </DataProduct>
              </AppConstantsProvider>
            </DataProvider>
          </PackageProductsProvider>
        </PackageData>
      </CustomersProvider>
    </Layout>
  );
};

export default VerticalLayout;
