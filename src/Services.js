import config from "./config";

import axios from "axios"
axios.defaults.baseURL = config.baseUrl;
axios.defaults.headers.common['Content-Type'] = "application/json";
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}
export class Services {
    constructor(that) {
        this.that = that;
        this.BASE_URL = "https://hashmart.nyumbapap.com";
        this.AUTH = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*"
        };
        this.CONFIG = { headers: this.AUTH };
    }

    login = (data) => {
        data = {
            "email": "superadmin@hashmart.co.ke",
            "password": "Testing#2019"
        };
        console.log("Data", data);

        const url = this.BASE_URL + "/api/v1/hashmart/login";
        return axios.post(url, data, this.CONFIG).then(resp=>{
            localStorage.setItem("token", resp.data.token)
            let now = new Date();
            localStorage.setItem("expiry", now.setMinutes(now.getMinutes() + 10).toString())
        }).catch(err=>{this.__handleCatch(err);})
    };

    register = (data) => {
        const url = this.BASE_URL + "/api/v1/hashmart/register";
        return axios.post(url, data, this.CONFIG).then(resp=> {
            this.that.setState({isLoading: false})
        }).catch(err=>{this.__handleCatch(err);})
    };

    getAllBusinesses = () => {
        const url = this.BASE_URL + "/api/v1/hashmart/get-all-business";
        return axios.get(url, this.CONFIG).then(resp=> {
            this.that.setState({businessList: resp.data, isLoading: false})
        }).catch(err=>{this.__handleCatch(err);})
    };

    getAllProductCategories = () => {
        const url = this.BASE_URL + "/api/v1/hashmart/get-product-category";
        axios.get(url, this.CONFIG).then(resp=> {
            this.that.setState({productCategoryList: resp.data})
        }).catch(err=>{this.__handleCatch(err);})
    };

    getMyBusinesses = () => {
        const url = this.BASE_URL + "/api/v1/hashmart/get-my-business";
        return axios.get(url, this.CONFIG).then(resp=> {
            this.that.setState({businessList: resp.data, isLoading: false})
        }).catch(err=>{this.__handleCatch(err);})
    };

    createBusiness = (data) => {
        const url =  this.BASE_URL + "/api/v1/hashmart/create-business";
        this.__completeSubmission(url, data);
    };

    createCategory = (data) => {
        const url =  this.BASE_URL + "/api/v1/hashmart/create-category";
        this.__completeSubmission(url, data);
    };

    createProductCategory = (data) => {
        const url =  this.BASE_URL + "/api/v1/hashmart/create-product-category";
        this.__completeSubmission(url, data);
    };

    updateBusiness = (data) => {
        const url =  this.BASE_URL + "/api/v1/hashmart/create-business";
        return axios.post(url, data).then(resp=> {
            this.that.setState({isLoading: false})
        }).catch(err=>{this.__handleCatch(err);})
    };

    getSingleBusiness = (code) => {
        const url =  this.BASE_URL + `/api/v1/hashmart/get-single-business/${code}`;
        return axios.get(url).then(resp=> {
            this.that.setState({business: resp.data[0], isLoading: false})
        }).catch(err=>{this.__handleCatch(err);})
    };

    getSingleProductCategory = (code) => {
        const url =  this.BASE_URL + `/api/v1/hashmart/get-product-category/${code}`;
        axios.get(url).then(resp=> {
            this.that.setState({productCategory: resp.data[0], isLoading: false})
        }).catch(err=>{this.__handleCatch(err);})
    };

    getCategoriesUnderProductCategory = (code) => {
        const url =  this.BASE_URL + `/api/v1/hashmart/get-product-category/${code}`;
        axios.get(url).then(resp=> {
            this.that.setState({categoryList: resp.data, isLoading: false})
        }).catch(err=>{this.__handleCatch(err);})
    };

    getSingleCategory = (code) => {
        const url =  this.BASE_URL + `/api/v1/hashmart/get-product-category/${code}`;
        return axios.get(url).then(resp=> {
            this.that.setState({productCategory: resp.data[0], isLoading: false})
        }).catch(err=>{this.__handleCatch(err);})
    };

    refreshToken = (data) => {
        let _this = this;
        let now = new Date();
        let expiry = new Date(localStorage.getItem("expiry"))
        console.log("Now", now, expiry);
        if (now>expiry) {
            const url = this.BASE_URL + "/api/v1/hashmart/create-business";
            return axios.post(url, data).then(resp => {
                localStorage.setItem("token", resp.data.token);
                localStorage.setItem("expiry", now.setMinutes(now.getMinutes() + 10).toString());
                console.log("refreshed")
            }).catch(err => {
                _this.__handleCatch(err);
            })
        }
    };

    __handleCatch(error) {
        console.log(error);
        if (error.response) {
            let status = error.response.status;
            let data = error.response.data;
            let errorMessage = "Something went wrong processing your request! Please Try Again!"
            if (status === 428) {
                this.that.setState({
                    warning: true,
                    isLoading: false,
                    errorMessage: data.message
                });
            } else if (status === 400) {
                try {
                    errorMessage = data.errors[0].description
                } catch (e) {
                }
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
        console.log("A");
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
                    }, 3000

                );
            }).catch(err=>{this.__handleCatch(err);})
    };
}