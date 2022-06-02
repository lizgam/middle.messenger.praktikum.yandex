import Block from "../core/Block";
export class LoginPage extends Block {
    // submitHandler(e: Event) {
    //     e.preventDefault();
    //     if (this.state.values.login && this.state.values.password) {
    //         console.log("SUBMITED values: ", this.state);
    //     }
    // }

    // onFocusHandler(e: Event) {}

    // onBlureHandler(e: Event) {}

    protected getStateFromProps() {
        this.state = {
            staticData: {
                pageName: "Login page",
                textForReffer: "Don’t have a Chatopolis account?",
                href: "/register",
                linkText: "Register",
            },
            values: {
                login: "",
                password: "",
            },
            errors: {
                login: "",
                password: "",
            },
            onLogin: () => {
                const loginData = {
                    login: (
                        document.getElementById("login") as HTMLInputElement
                    ).value,
                    password: (
                        document.getElementById("password") as HTMLInputElement
                    ).value,
                };

                console.log("---Result in LoginPage - loginData:", loginData);

                console.log(
                    "----in LoginPage -  parent el(div). Login???:",
                    this.refs.login
                );

                //VALIDATION:
                //for every click: clean object with errors & save values
                const newState = {
                    errors: {
                        login: "",
                        password: "",
                    },
                    values: { ...loginData }, //save values in state
                };

                //validateLogin

                const validateLogin = (login: string) => {
                    const res = /(?!^\d+$)^[\w|-]*$/.test(login);
                    return res;
                };

                const validatePassword = (password: string) => {
                    const res = /^(?=.+[A-Z])(?=.+\d).*$/.test(password);
                    return res;
                };

                if (loginData.login.length < 3 || loginData.login.length > 20) {
                    newState.errors.login =
                        "Login must contain 3 to 20 symbols";
                } else if (!validateLogin(loginData.login)) {
                    newState.errors.login =
                        "Numbers, letters ,'_' ,'-' are allowed. No space.";
                }

                if (!validatePassword(loginData.password)) {
                    newState.errors.password =
                        "At least one uppercase letter, at least one number";
                } else if (
                    loginData.password.length < 8 ||
                    loginData.password.length > 40
                ) {
                    newState.errors.password =
                        "Login must contain 8 to 40 symbols";
                }

                this.setState(newState); //??????? setProps
                console.log("~~~~~~~", newState);

                console.log("Collected Data:>> ", loginData);
                debugger;
            },
        };
    }

    render() {
        console.log("changing state on login page happened!");
        const { staticData, errors, values } = this.state;
        console.log("render in login Page. this.state: ", { ...this.state });
        //console.log(this.state);
        return `
            <section class="form_container">
                <h2>${staticData.pageName}</h2>
                <form action="#" method="post">
                {{{Input
                    label = "Login"
                    id="login"
                    name = "login"
                    ref="login"
                    inputType = "text"
                    error = "${errors.login}"
                    value = "${values.login}"
                }}}
                {{{Input
                    label = "Password"
                    id="password"
                    name = "password"
                    ref="password"
                    inputType = "password"
                    error = "${errors.password}"
                    value = "${values.password}"
                }}}
                {{{ Button
                    btn_text="Log in"
                    onClick=onLogin
                }}}

                <span>${staticData.textForReffer}</span>
                {{{ Link
                    reasonText=textForReffer
                    address="${staticData.href}"
                    linkText="${staticData.linkText}"
                }}}
                </form>
            </section>
                    `;
    }
}
