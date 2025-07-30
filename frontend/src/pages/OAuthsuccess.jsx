import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../features/auth/authSlicer";
import LoadingPage from "../components/LoadingPage";
import axios from "axios";

function OAuthsuccess() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            axios
                .post(`${import.meta.env.VITE_BACKEND_URL}/me`, { token })
                .then((response) => {
                    dispatch(setAuth({ user: response.data.user, token }));
                    console.log("this is from GithubAuth",response.data.user);
                    navigate("/playground");
                })
                .catch(() => {
                    // dispatch(setAuth({ token }));
                    navigate("/");
                });
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate]);

    return <LoadingPage />;
}

export default OAuthsuccess;