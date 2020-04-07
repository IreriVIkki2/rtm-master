import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import Input from "../forms/Input";

const AuthLogin = () => {
    const { emailAndPasswordRegister, googleLogin } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    return (
        <div className="auth pt-7">
            <div className="auth__inner">
                <p className="mb-1 d-block title title--md">
                    <span>Hello</span>
                    <span className="ml-1 bolder text-secondary">stranger</span>
                </p>
                <p className="mb-3">Glad to see you making things official!</p>

                <div className="mb-2">
                    <Input
                        type="text"
                        onInputChange={(name) => setName(name)}
                        initialValue={name}
                        minLength={3}
                        inputId="name"
                        placeholder="Name"
                    />
                </div>
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
                    onClick={() =>
                        emailAndPasswordRegister(email, password, name)
                    }
                >
                    Register Now
                </button>

                <p className="mb-2 title title--md text-black">or</p>

                <div className="d-flex align-items-center text-center mb-2">
                    <button
                        onClick={googleLogin}
                        className="btn btn--primary mr-2"
                    >
                        Sign Up With Google
                    </button>
                    <button className="btn btn--primary">
                        Sign Up With Facebook
                    </button>
                </div>

                <p className="mb-1">
                    Already one of us?{" "}
                    <a
                        href="/auth/login"
                        className="lowercase btn btn__link btn__link--secondary "
                    >
                        login here
                    </a>
                </p>
                <p className=""> By signing up, you agree to Rhotimmi's</p>
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
