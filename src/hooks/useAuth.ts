import { login, resetPassword, resetRequest, signup } from "@/api/auth.api";
import { LoginProps } from "@/pages/Login";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./useAlert";
import { SignupProps } from "@/pages/Signup";
import { useState } from "react";

export const useAuth = () => {
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const { storeLogin, storeLogout, isLoggedIn } = useAuthStore();
    const [resetRequested, setResetRequested] = useState(false);

    const userLogin = (data: LoginProps) => {
        login(data)
            .then((res) => {
                storeLogin(res.accessToken);
                showAlert("로그인 완료");
                navigate("/");
            })
            .catch((error) => {
                showAlert("로그인 실패");
            });
    };

    const userSignup = (data: SignupProps) => {
        signup(data)
            .then(() => {
                showAlert("회원가입 완료");
                navigate("/login");
            });
    };

    const userResetPassword = (data: SignupProps) => {
        resetPassword(data)
            .then(() => {
                showAlert("비밀번호 초기화 완료");
                navigate("/login");
            });
    };

    const userResetRequest = (data: SignupProps) => {
        resetRequest(data)
            .then(() => {
                setResetRequested(true);
            });
    };

    return { userLogin, userSignup, resetRequested, userResetPassword, userResetRequest };
};
