import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { loginUser } from "../../services/auth";
import { userLoggedIn } from "../../_redux/actions";
import Cookies from "js-cookie";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setUserLoggedIn: (data) => {
    dispatch(userLoggedIn(data));
  },
});

function LoginModal(props) {
  const { openRegisterPopup, closeModal, setUserLoggedIn } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const toastConfig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const formik = useFormik({
    initialValues: {
      mobile: "",
      countryCode: "+91",
      password: "",
    },
    validationSchema: Yup.object().shape({
      countryCode: Yup.string(),
      mobile: Yup.string()
        .required("Mobile No. is required")
        .matches(/^[0-9]+$/, "Please enter valid mobile number"),
      // .min(10, "Number must be at least 10 digit"),
      password: Yup.string().required("Mobile No. is required").min(6).max(20),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoginLoading(true);
      const { mobile, countryCode, password } = values;
      const params = {
        package_name: "com.multiservice.user",
        apk_version: 2.0,
        phone: countryCode + mobile,
        manufacture: "iPhone",
        model: "iPhone",
        operating_system: "IOS",
        device_id: "cf86af69-6ef3-41a2-bcbe-a78440bddb43",
        device: "2",
        unique_no: Date.now(),
        password: password,
        player_id: "cf86af69-6ef3-41a2-bcbe-a78440bddb43",
      };

      const formData = new FormData();
      Object.keys(params).forEach((key) => {
        formData.append(key, params[key]);
      });

      //login user api call
      const { response } = await loginUser(formData);
      if (response.status) {
        const accessToken = response.data.access_token;
        Cookies.set("_access_token", accessToken);
        setUserLoggedIn(true);

        toastConfig["type"] = "success";
        toast("Login successfully done", toastConfig);
        closeModal();
      } else {
        toastConfig["type"] = "error";
        toast(response.message, toastConfig);
      }
      setLoginLoading(false);
    },
  });

  return (
    <Modal
      show={true}
      onHide={closeModal}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="login-modal"
    >
      <Modal.Header closeButton className="border-0 pb-2 align-items-center">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="fs-23 w-100 m-0 fw-600 pb-2 font-sfpro"
        >
          LOGIN
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="fs-18 px-3 font-sfpro label-color-10">
          <form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Phone*</Form.Label>
              <InputGroup className="d-flex w-100">
                <Form.Select
                  name="countryCode"
                  value={formik.values.countryCode}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  aria-label="Default select example"
                  className="w-25 ps-3 form-bar fs-16"
                >
                  <option>+91</option>
                  <option>+91</option>
                </Form.Select>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={formik.values.mobile}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="position-relative w-70 form-bar"
                  maxLength={10}
                />
                <FontAwesomeIcon
                  icon={faPhoneAlt}
                  className="label-color-8 form-icon"
                />
              </InputGroup>
              {formik.touched.mobile && formik.errors.mobile && (
                <small className="text-danger">{formik.errors.mobile}</small>
              )}
            </Form.Group>

            <Form.Group className="position-relative mb-3">
              <Form.Label>Password*</Form.Label>
              <InputGroup className=" d-flex">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="position-relative form-bar"
                />
                {!showPassword && (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="label-color-8 form-icon fs-14 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
                {showPassword && (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="label-color-8 form-icon fs-14 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                )}
              </InputGroup>
              {formik.touched.password && formik.errors.password && (
                <small className="text-danger">{formik.errors.password}</small>
              )}
            </Form.Group>

            {/* <div className="d-flex">
              <a
                className="ms-auto label-color-9 fs-18 text-decoration-none"
                title="forgot password"
              >
                Forgot Password ?
              </a>
            </div> */}

            <div className="my-4 d-md-flex">
              <div className="">
                <button
                  type="submit"
                  className={`fs-20 px-5 py-2 text-uppercase border-0 ${
                    loginLoading ? "btn-disabled " : "login-btn "
                  }`}
                  title="login"
                  disabled={loginLoading}
                >
                  Login
                </button>
              </div>
              <div className="ms-auto text-end">
                <p className="p-0 m-0 fw-500"> Don&apos;t have an account? </p>
                <a
                  className="label-color-8 fs-20 text-decoration-none cursor-pointer "
                  title="sign up"
                  onClick={openRegisterPopup}
                >
                  Sign Up
                </a>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
