export const enum ValidationRule {
    Login = "login",
    Password = "password",
    Email = "email",
    First_name = "first_name",
    Second_name = "second_name",
    Phone = "phone",
}

const validateLogin = (login: string) => {
    const res = /(?!^\d+$)^[\w|-]*$/.test(login);
    return res;
};

const validatePassword = (password: string) => {
    const res = /^(?=.+[A-Z])(?=.+\d).*$/.test(password);
    return res;
};
const validateEmail = (email: string) => {
    const res =
        //eslint-disable-next-line
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/.test(
            email
        );
    return res;
};

const validateName = (name: string) => {
    const res = /^[A-Z][a-z-]*$/.test(name);
    return res;
};

const validatePhone = (phone: string) => {
    const res = /^\+?[0-9]{10,15}$/.test(phone);
    return res;
};

export function validateInput(rule: ValidationRule, value: string): string {
    if (rule === ValidationRule.Login) {
        if (value.length < 3 || value.length > 20) {
            return "Login must contain 3 to 20 symbols";
        } else if (!validateLogin(value)) {
            return "Numbers, letters ,'_' ,'-' are allowed. No space";
        }
    } else if (rule === ValidationRule.Password) {
        if (!validatePassword(value)) {
            return "At least one uppercase letter, at least one number";
        } else if (value.length < 8 || value.length > 40) {
            return "Login must contain 8 to 40 symbols";
        }
    } else if (rule === ValidationRule.First_name) {
        if (!validateName(value)) {
            return "First letter with uppercase. '-' are allowed";
        }
    } else if (rule === ValidationRule.Second_name) {
        if (!validateName(value)) {
            return "First letter with uppercase. '-' are allowed";
        }
    } else if (rule === ValidationRule.Phone) {
        if (!validatePhone(value)) {
            return "Numbers (10 to 15). May start with '+'";
        }
    } else if (rule === ValidationRule.Email) {
        if (!validateEmail(value)) {
            return "Check the format. Ex: 'email@gmail.com'";
        }
    }
    return "";
}
