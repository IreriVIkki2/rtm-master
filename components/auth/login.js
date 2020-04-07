import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import Input from "../forms/Input";
import { AiOutlineGoogle, AiFillFacebook } from "react-icons/ai";

const AuthLogin = () => {
    const { emailAndPasswordLogin, googleLogin } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="auth pt-7">
            <div className="auth__inner">
                <p className="mb-1 d-block title title--md">
                    <span>Welcome</span>
                    <span className="ml-1 bolder text-secondary">back</span>
                </p>
                <p className="mb-3">
                    Login to your account to continue the{" "}
                    <span className="text-black">fit life</span>!
                </p>

                <div className="mb-2">
                    <Input
                        type="email"
                        onInputChange={(email) => setEmail(email)}
                        initialValue={email}
                        minLength={3}
                        inputId="email"
                        placeholder="Email"
                    />
                </div>

                <div className="mb-3">
                    <Input
                        type="password"
                        onInputChange={(password) => setPassword(password)}
                        initialValue={password}
                        minLength={3}
                        inputId="password"
                        placeholder="Password"
                    />
                </div>

                <button
                    className="btn btn--secondary mb-2"
                    onClick={() => emailAndPasswordLogin(email, password)}
                >
                    Login Now
                </button>

                <p className="mb-2 title title--md text-black">or</p>

                <div className="d-flex text-center mb-2">
                    <button
                        onClick={googleLogin}
                        className="btn btn--primary mr-1 d-flex"
                    >
                        <AiOutlineGoogle />
                        <span className="ml-1">Login With Google</span>
                    </button>
                    <button className="btn btn--primary d-flex">
                        <AiFillFacebook />
                        <span className="ml-1">Login With Facebook</span>
                    </button>
                </div>

                <p className="mb-1">
                    Not one of us yet?{" "}
                    <a
                        href="/auth/register"
                        className="lowercase btn btn__link btn__link--secondary "
                    >
                        sign up here
                    </a>
                </p>
                <p className=""> By signing in, you agree to Rhotimmi's</p>
                <p className="">
                    <a className="bolder text-black">Terms and Conditions</a>
                    <span className="ml-1 mr-1">&</span>
                    <a className="bolder text-black">Privacy Policy</a>
                </p>
            </div>
        </div>
    );
};

export default AuthLogin;
