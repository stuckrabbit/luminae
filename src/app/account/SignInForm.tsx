import FormButton from "./FormButton";
import FormExternalServiceButton from "./FormExternalServiceButton";
import FormHeading from "./FormHeading";
import FormInputField from "./FormInputField";
import FormOrSection from "./FormOrSection";
import styles from './SignInForm.module.css';

function SignInForm()
{
    return (<form className={styles.container}>
        <FormHeading heading="Sign In"/>
        <FormInputField fieldName="Email" isRequired={true} placeholder="Email Address" type="email"/>
        <FormInputField fieldName="Password" isRequired={true} placeholder="password" type="password"/>
        <div className={styles.checkBoxAndLinkContainer}>
            <div className={styles.checkboxWithText}>
                <input className={styles.checkBox} type="checkbox"/>
                <label>Remember for 30 days</label>
            </div>
            <div>
                <a className={styles.forgotPasswordLink} href="/account">Forgot password?</a>
            </div>
        </div>
        <div className={styles.formButton}>
            <FormButton text="SIGN IN"/>
        </div>
    </form>);
}

export default SignInForm;