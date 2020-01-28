import React from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import {toast} from "react-toastify";

export class Functions {

    constructor(that, ...requiredFields) {
        this.requiredFields = requiredFields;
        this.state = {
            that: that
        };
        this.that = that;
        this.that.services.login();
        this.that.services.refreshToken();
    }

    showForm = (name) => {
        if (this.that.state.form === name){
            this.that.setState({form: ""})
        } else {
            this.that.setState({form: name})
        }
    };

    float = value => {
        try {
            value = value.replace(/,/g, "");
        } catch (e) {
            value = value;
        }
        if (isNaN(value)) {
            value = 0;
        }
        return parseFloat(value);
    };

    twoDp = value => {
        value = this.float(value);
        return Math.ceil(value * 100) / 100;
    };

    showSuccess = () => {
        let alert = (
                <SweetAlert
                    success
                    title="Success!"
                    onConfirm={this.hideAlert}
                    showCloseButton={false}
                    timeout={1500}
                >
                </SweetAlert>
            );
        this.that.setState({alert: alert})
    };

    toastError = () => {
        toast.error('Error fetching some data!', {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true
        });
    };

    showFailed = () => {
        let alert = (
            <SweetAlert
                danger
                title="Failed!"
                onConfirm={this.hideAlert}
                showCloseButton={false}
            >
                {this.that.errorMessage}
            </SweetAlert>
        );
        this.that.setState({alert: alert})
    };

    showConfirm = () => {
        let alert = (
            <SweetAlert
                info
                title="Are you sure you want to proceed!"
                showCloseButton={false}
                onConfirm={this.proceedSubmission}
                onCancel={this.hideAlert}
            >
            </SweetAlert>
        );
        this.that.setState({alert: alert})
    };

    proceedSubmission = () => {
        this.hideAlert();
        this.that.setState({ isLoading: true });
        this.that.submitForm();
    };


    hideAlert = (event) => {
        this.that.setState({alert: "", errorMessage: "Something Went wrong !!"})
    };

    handleChange = (event) => {
        this.that.setState({[event.target.name]: event.target.value});
    };

    handleBlur = (event) => {
        let name = event.target.name;
        document.getElementById(name).classList.remove("is-valid");
        if ((this.requiredFields.includes(name)) && ((this.that.state[name] === "") || (this.that.state[name] === undefined) || (this.that.state[name] === null)) ) {
            document.getElementById(name).classList.add("is-invalid");
        }
    };

    handleFocus = (event) => {
        let name = event.target.name;
        document.getElementById(name).classList.remove("is-valid");
        document.getElementById(name).classList.remove("is-invalid");
    };

    refresh = () => {
        window.location.reload();
    };


    doNothing = (event) =>{
    };

    handleClickSubmit = () => {
        const empty = [];
        this.requiredFields.forEach(field =>
            this.that.state[`${field}`] === "" ? empty.push(field) : false
        );

        if (empty.length > 0) {
            this.that.setState({
                error: true,
                errorMessage: "It appears there are required fields you haven't filled!"
            });
            empty.forEach(emptyField =>
                document.getElementById(`${emptyField}`).classList.add("is-invalid")
            );
            setTimeout(() => {
                this.that.setState({ error: false, errorMessage: "" });
            }, 8000);
        } else {
            this.showConfirm();
        }
    };

    clearForm = () => {
        var inputs, index;
        inputs = document.getElementsByTagName("input");
        for (index = 0; index < inputs.length; ++index) {
            let input = inputs[index];
            let name = inputs[index].name;
            this.that.setState({ [name]: "" });
            input.value = "";
        }
    };

    clearFields = (...fields) => {
        for (let index = 0; index < fields.length; ++index) {
            let input = document.getElementById(fields[index]);
            if (input) {
                let name = input.name;
                this.that.setState({ [name]: "" });
                input.value = "";
            } else {
                console.log(fields["index"]);
                console.log(input);
            }
        }
    };

    logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("created");
    }

}
