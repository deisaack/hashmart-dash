import config from "./config";

import axios from "axios";
axios.defaults.baseURL = config.baseUrl;
axios.defaults.headers.common["Content-Type"] = "application/json";
const token = localStorage.getItem("authToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}
export class Services {
  constructor(that) {
    this.that = that;
    this.BASE_URL = "https://hashmart.nyumbapap.com";
    this.AUTH = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Access-Control-Allow-Origin": "*"
    };
    this.CONFIG = { headers: this.AUTH };
  }

  register = data => {
    const url = this.BASE_URL + "/api/v1/hashmart/register";
    return axios
      .post(url, data, this.CONFIG)
      .then(resp => {
        this.that.setState({ isLoading: false });
      })
      .catch(err => {
        this.__handleCatch(err);
      });
  };

  getAllBusinesses = () => {
    const url = this.BASE_URL + "/api/v1/hashmart/get-all-business";
    return axios
      .get(url, this.CONFIG)
      .then(resp => {
        this.that.setState({ businessList: resp.data, isLoading: false });
      })
      .catch(err => {
        this.__handleCatch(err);
      });
  };

  getAllProducts = () => {
    const url = this.BASE_URL + "/api/v1/hashmart/get-product-admin";
    return axios
      .get(url, this.CONFIG)
      .then(resp => {
        this.that.setState({ productList: resp.data, isLoading: false });
      })
      .catch(err => {
        this.__handleCatch(err);
      });
  };

  getBusinessProducts = companycode => {
    const url = `${this.BASE_URL}/api/v1/hashmart/get-product-by-business/${companycode}`;
    return axios
      .get(url, this.CONFIG)
      .then(resp => {
        this.that.setState({ productList: resp.data, isLoading: false });
      })
      .catch(err => {
        this.__handleCatch(err);
      });
  };

  getProductChangeInStock = productcode => {
    const url = `${this.BASE_URL}/api/v1/hashmart/get-changes-in-product-stock/${productcode}`;
    axios
      .get(url, this.CONFIG)
      .then(resp => {
        this.that.setState({
          changesInProductStock: resp.data,
          isLoading: false
        });
      })
      .catch(err => {
        this.__handleCatch(err);
      });
  };

  getSingleProduct = productcode => {
    const url =
      this.BASE_URL + `/api/v1/hashmart/get-single-product/${productcode}`;
    axios
      .get(url, this.CONFIG)
      .then(resp => {
        this.that.setState({
          product: resp.data.products[0],
          features: resp.data.products[0].features,
          isLoading: false
        });
      })
      .catch(err => {
        this.__handleCatch(err);
      });
  };

  getProductReview = productcode => {
    const url =
      this.BASE_URL + `/api/v1/hashmart/get-single-product/${productcode}`;
    axios
      .get(url, this.CONFIG)
      .then(resp => {
        this.that.setState({
          product: resp.data.products[0],
          features: resp.data.products[0].features,
          isLoading: false
        });
      })
      .catch(err => {
        this.__handleCatch(err);
      });
  };

  getAllProductCategories = () => {
    const url = this.BASE_URL + "/api/v1/hashmart/get-product-category";
    axios
      .get(url, this.CONFIG)
      .then(resp => {
        this.that.setState({ productCategoryList: resp.data });
      })
      .catch(err => {
        this.__handleCatch(err);
      });
  };

  getMyBusinesses = token => {
    const url = this.BASE_URL + "/api/v1/hashmart/get-my-business";
    this.AUTH = {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*"
    };
    this.CONFIG = { headers: this.AUTH };
    axios
      .get(url, this.CONFIG)
      .then(resp => {
        this.that.setState({
          businessList: resp.data,
          isLoading: false,
          display: ""
        });
      })
      .catch(err => {
        this.__handleCatch(err);
      });
  };

  createBusiness = data => {
    const url = this.BASE_URL + "/api/v1/hashmart/create-business";
    this.__completeSubmission(url, data);
  };

  createCategory = data => {
    const url = this.BASE_URL + "/api/v1/hashmart/create-category";
    this.__completeSubmission(url, data);
  };

  createSubCategory = data => {
    const url = this.BASE_URL + "/api/v1/hashmart/create-sub-category";
    this.__completeSubmission(url, data);
  };

  addProductFeature = (code, data) => {
    const url = `${this.BASE_URL}/api/v1/hashmart/add-product-feature/${code}`;
    this.__completeSubmission(url, data);
  };

  increaseProductStock = data => {
    const url = this.BASE_URL + "/api/v1/hashmart/increase-product-stock";
    this.__completeSubmission(url, data);
  };
  createBrand = data => {
    const url = this.BASE_URL + "/api/v1/hashmart/create-brand";
    this.__completeSubmission(url, data);
  };

  createProduct = data => {
    const url = this.BASE_URL + "/api/v1/hashmart/create-product";
    this.__completeSubmission(url, data);
  };

  createProductCategory = data => {
    const url = this.BASE_URL + "/api/v1/hashmart/create-product-category";
    this.__completeSubmission(url, data);
  };

  getSingleBusiness = code => {
    const url = this.BASE_URL + `/api/v1/hashmart/get-single-business/${code}`;
    return axios
      .get(url, this.CONFIG)
      .then(resp => {
        this.that.setState({ business: resp.data[0], isLoading: false });
      })
      .catch(err => {
        this.__handleCatch(err);
      });
  };

  getProductItem = (
    productCategory,
    categoryCode,
    subCategoryCode,
    brandCode
  ) => {
    const url =
      this.BASE_URL +
      `/api/v1/hashmart/get-product-category/${productCategory}`;
    axios
      .get(url, this.CONFIG)
      .then(resp => {
        let productCategory = resp.data[0];
        let categoryList = productCategory.category;
        let category = {};
        let subCategories = [];
        let subCategory = {};
        let brandsList = [];
        let brand = {};
        categoryList.map((item, key) => {
          if (item.categoryCode === categoryCode) {
            category = item;
            subCategories = item.subCategory;
            subCategories.map((obj, id) => {
              if (obj.subCategoryCode === subCategoryCode) {
                subCategory = obj;
                brandsList = obj.brand;
                brandsList.map((o, id) => {
                  if (o.brandCode === brandCode) {
                    brand = o;
                  }
                });
              }
            });
          }
        });
        this.that.setState({
          productCategory: resp.data[0],
          isLoading: false,
          categoryList: resp.data[0].category,
          category: category,
          subCategories: subCategories,
          subCategory: subCategory,
          brandsList: brandsList,
          brand: brand
        });
        console.log("productCategory", productCategory);
        console.log("categoryList", categoryList);
        console.log("category", category);
        console.log("subCategory", subCategory);
        console.log("brandsList", brandsList);
        console.log("brand->", brand);
        console.log("<-brand");
      })
      .catch(err => {
        this.__handleCatch(err);
      });
  };

  refreshToken = data => {
    return;
    let _this = this;
    let now = new Date();
    let expiry = new Date(localStorage.getItem("expiry"));
    console.log("Now", now, expiry);
    if (now > expiry) {
      const url = this.BASE_URL + "/api/v1/hashmart/refresh-token";
      return axios
        .post(url, data)
        .then(resp => {
          localStorage.setItem("authToken", resp.data.authToken);
          localStorage.setItem(
            "expiry",
            now.setMinutes(now.getMinutes() + 1).toString()
          );
          console.log("refreshed");
        })
        .catch(err => {
          _this.__handleCatch(err);
        });
    }
  };

  __handleCatch(error) {
    console.log(error);
    if (error.response) {
      let status = error.response.status;
      let data = error.response.data;
      let errorMessage =
        "Something went wrong processing your request! Please Try Again!";
      if (status === 428) {
        this.that.setState({
          warning: true,
          isLoading: false,
          errorMessage: data.message
        });
      } else if (status === 400) {
        try {
          errorMessage = data.errors[0].description;
        } catch (e) {}
        this.that.setState({
          isLoading: false,
          error: true,
          errorMessage: errorMessage
        });
      } else {
        this.that.setState({
          isLoading: false,
          error: true,
          errorMessage: errorMessage
        });
      }
      this.that.funcs.toastError();
      // this.that.funcs.showFailed()
    } else {
      this.that.setState({
        isLoading: false,
        error: true,
        errorMessage: "Something went wrong processing your request"
      });
    }
    setTimeout(() => {
      this.that.setState({
        error: false,
        isLoading: false,
        errorMessage: "",
        warning: false
      });
    }, 7000);
  }

  __completeSubmission = (url, data) => {
    console.log("A", data);
    axios
      .post(url, data, this.CONFIG)
      .then(response => {
        this.that.setState({
          error: false,
          isLoading: false,
          errorMessage: "",
          voucherNumber: response.data.voucherNumber,
          successMessage: response.data.message
        });

        this.that.funcs.showSuccess();
        setTimeout(() => {
          this.that.funcs.clearForm();
          this.that.funcs.refresh();
          console.log("D");
        }, 3000);
      })
      .catch(err => {
        this.__handleCatch(err);
      });
  };

  handleFileUpload = (formId, name) => {
    let formData = new FormData();
    formData.append("file", document.getElementById(formId)[name].files[0]);
    return formData;
  };

  searchUser = term => {
    if (term.trim() !== "")
      axios
        .get(`/api/v1/hashmart/search-user/${term}`, this.CONFIG)
        .then(response => {
          let users = [];
          response.data.forEach(user =>
            users.push({
              label: user.name,
              value: user.userCode,
              phoneNumber: user.phoneNumber,
              normalizedEmail: user.normalizedEmail,
              profilePicture: user.profilePicture
            })
          );
          this.that.setState({ users });
        });
  };

  getUsers = () => {
    axios.get(`/api/v1/hashmart/get-all-users`, this.CONFIG).then(response => {
      this.that.setState({ users: response.data });
      console.log(response.data);
    });
  };
}
