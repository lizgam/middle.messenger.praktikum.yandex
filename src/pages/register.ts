import Block from "../core/Block";

export class RegisterPage extends Block {
    protected getStateFromProps() {
        this.state = {
            staticData: {
                pageName: "Registration Page",
                textForReffer: "Already have a Chatopolis account?",
                href: "/login",
                linkText: "Log in",
            },
            values: {
                email: "",
                login: "",
                first_name: "",
                second_name: "",
                password: "",
                phone: "",
            },
            errors: {
                email: "",
                login: "",
                first_name: "",
                second_name: "",
                password: "",
                phone: "",
            },
            onRegister: () => {
                const registerData = {
                    login: (
                        document.getElementById("login") as HTMLInputElement
                    ).value,
                    first_name: (
                        document.getElementById(
                            "first_name"
                        ) as HTMLInputElement
                    ).value,
                    second_name: (
                        document.getElementById(
                            "second_name"
                        ) as HTMLInputElement
                    ).value,
                    email: (
                        document.getElementById("email") as HTMLInputElement
                    ).value,
                    password: (
                        document.getElementById("password") as HTMLInputElement
                    ).value,
                    phone: (
                        document.getElementById("phone") as HTMLInputElement
                    ).value,
                };
                console.log(">>>>>REGISTER", registerData);
                //return;

                //VALIDATION:
                //for every click: clean object with errors & save values
                const errorState = {
                    errors: {
                        email: "",
                        login: "",
                        first_name: "",
                        second_name: "",
                        password: "",
                        phone: "",
                    },
                    values: { ...registerData }, //save values in state
                };

                const validateLogin = (login: string) => {
                    const res = /(?!^\d+$)^[\w|-]*$/.test(login);
                    console.log("login>>>", res);
                    return res;
                };

                const validateEmail = (email: string) => {
                    const res =
                        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/.test(
                            email
                        );
                    console.log(">>>", res);
                    return res;
                };

                const validateName = (name: string) => {
                    const res = /^[A-Z][a-z-]*$/.test(name);
                    console.log(">>>", res);
                    return res;
                };

                const validatePassword = (password: string) => {
                    const res = /^(?=.+[A-Z])(?=.+\d).*$/.test(password);
                    console.log("psw>>>", res);
                    return res;
                };

                const validatePhone = (phone: string) => {
                    const res = /^\+?[0-9]{10,15}$/.test(phone);
                    console.log("phone>>>", res);
                    return res;
                };

                if (!validateLogin(registerData.login)) {
                    errorState.errors.login =
                        "Numbers, letters ,'_' ,'-' are allowed. No space.";
                } else if (
                    registerData.login.length < 3 ||
                    registerData.login.length > 20
                ) {
                    errorState.errors.login =
                        "Login must contain 3 to 20 symbols";
                }

                if (!validateName(registerData.first_name)) {
                    errorState.errors.first_name =
                        "First letter with uppercase. '-' are allowed.";
                }

                if (!validateName(registerData.second_name)) {
                    errorState.errors.second_name =
                        "First letter with uppercase. '-' are allowed.";
                }

                if (!validatePhone(registerData.phone)) {
                    errorState.errors.phone =
                        "Numbers (10 to 15). May start with '+'.";
                }

                if (!validateEmail(registerData.email)) {
                    errorState.errors.email =
                        "Check the format. Ex: 'email@gmail.com'";
                }

                if (!validatePassword(registerData.password)) {
                    errorState.errors.password =
                        "At least one uppercase letter, at least one number";
                } else if (
                    registerData.password.length < 8 ||
                    registerData.password.length > 40
                ) {
                    errorState.errors.password =
                        "Login must contain 8 to 40 symbols";
                }

                this.setState(errorState); ////??????setProps???

                console.log("Collected Data:>> ", registerData);
            },
        };
    }

    render() {
        const { staticData, errors, values } = this.state;
        console.log("RENDERING state:", { ...this.state });
        console.log(this.state);
        return `
            <section class="form_container">
                <h2>${staticData.pageName}</h2>
                <form action="#" method="post">
                    {{{ Input label="Email" id="email" name="email" ref="email" inputType="email" placeholder="email@gmail.com" error="${errors.email}" value="${values.email}"}}}
                    {{{ Input label="Login" id="login" name="login" ref="login" inputType="text" error="${errors.login}" value="${values.login}"}}}
                    {{{ Input label="First Name" id="first_name" name="first_name" ref="first_name" inputType="text" error="${errors.first_name}" value="${values.first_name}"}}}
                    {{{ Input label="Second Name" id="second_name" name="second_name" ref="second_name" inputType="text" error="${errors.second_name}" value="${values.second_name}"}}}
                    {{{ Input label="Password" id="password" name="password" ref="password" inputType="password"  error="${errors.password}" value="${values.password}"}}}
                    {{{ Input label="Phone" id="phone" name="phone" ref="tel" inputType="tel" placeholder="+1234567890" error="${errors.phone}" value="${values.phone}"}}}
                    {{{ Button btn_text="Register" onClick=onRegister}}}
                    <span>${staticData.textForReffer}</span>
                    {{{ Link reasonText=textForReffer address="${staticData.href}" linkText="${staticData.linkText}"}}}
                </form>
            </section>
        `;
    }
}
//
