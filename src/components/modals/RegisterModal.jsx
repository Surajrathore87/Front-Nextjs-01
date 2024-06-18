import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { passwordIcon } from "../../constants/imagesContains";
import * as Yup from "yup";
import { registerUser } from "../../services/auth";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { userLoggedIn } from "../../_redux/actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setUserLoggedIn: (data) => {
    dispatch(userLoggedIn(data));
  },
});

function RegisterModal(props) {
  const { openLoginPopup, closeModal, setUserLoggedIn } = props;
  const [registerLoading, setRegisterLoading] = useState(false);

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
      firstName: "",
      lastName: "",
      countryCode: "+91",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
      policy: false,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .required("First Name is required")
        .matches(/^[a-zA-Z ]+$/, "Please enter valid name")
        .trim(),
      lastName: Yup.string()
        .required("Last Name is required")
        .matches(/^[a-zA-Z ]+$/, "Please enter valid name")
        .trim(),
      countryCode: Yup.string(),
      mobile: Yup.string()
        .required("Mobile No. is required")
        .matches(/^[0-9]+$/, "Please enter valid mobile number")
        .min(10, "Number must be at least 10 digit"),
      email: Yup.string()
        .email("Please Enter Valid Email")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6)
        .max(20)
        .trim(),
      confirmPassword: Yup.string()
        .required("Password and Confirm password not Matched")
        .oneOf(
          [Yup.ref("password"), null],
          "Password and Confirm password not Matched"
        ),
      policy: Yup.boolean().oneOf(
        [true],
        "Please accept Terms and Conditions and Privacy Policy"
      ),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setRegisterLoading(true);
      const { firstName, lastName, countryCode, mobile, email, password } =
        values;

      const params = {
        first_name: firstName,
        last_name: lastName,
        country_id: 2,
        phone: countryCode + mobile,
        email: email,
        password: password,
        manufacture: "iPhone",
        longitude: 77.01217645059708,
        referral_code: "",
        package_name: "com.multiservice.user",
        model: "iPhone",
        unique_no: Date.now(),
        latitude: 28.983040295981752,
        apk_version: 2.0,
        operating_system: "IOS",
        device: 2,
        device_id: "cf86af69-6ef3-41a2-bcbe-a78440bddb43",
        player_id: "cf86af69-6ef3-41a2-bcbe-a78440bddb43",
      };

      const formData = new FormData();
      Object.keys(params).forEach((key) => {
        formData.append(key, params[key]);
      });

      // register user api call
      const { response } = await registerUser(formData);
      if (response.status) {
        const accessToken = response.data.access_token;
        Cookies.set("_access_token", accessToken);
        setUserLoggedIn(true);

        toastConfig["type"] = "success";
        toast(response.message, toastConfig);
        closeModal();
      } else {
        toastConfig["type"] = "error";
        toast(response.message, toastConfig);
      }
      setRegisterLoading(false);
    },
  });

  return (
    <>
      <Modal
        show={true}
        onHide={closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="signup-modal"
      >
        <Modal.Header closeButton className="border-0 pb-2 align-items-center">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="fs-23 w-100 m-0 fw-600 pb-2 font-sfpro"
          >
            SIGN UP
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="fs-18 px-3 font-sfpro label-color-10">
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex w-100 gap-4 mb-3">
                <Form.Group className="position-relative w-50 mb-3">
                  <Form.Label>First Name*</Form.Label>
                  <InputGroup className=" d-flex">
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formik.values.firstName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className="position-relative form-bar"
                      placeholder="First Name"
                    />
                    <FontAwesomeIcon
                      icon={faUser}
                      className="label-color-8 form-icon fs-20"
                    />
                  </InputGroup>
                  {formik.touched.firstName && formik.errors.firstName && (
                    <small className="text-danger">
                      {formik.errors.firstName}
                    </small>
                  )}
                </Form.Group>

                <Form.Group className="position-relative w-50 mb-3">
                  <Form.Label>Last Name*</Form.Label>
                  <InputGroup className=" d-flex">
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formik.values.lastName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className="position-relative form-bar"
                      placeholder="Last Name"
                    />
                    <FontAwesomeIcon
                      icon={faUser}
                      className="label-color-8 form-icon fs-20"
                    />
                  </InputGroup>
                  {formik.errors.lastName && (
                    <small className="text-danger">
                      {formik.errors.lastName}
                    </small>
                  )}
                </Form.Group>
              </div>

              <div className="d-flex w-100 gap-4 mb-3">
                <Form.Group className="mb-3 w-50">
                  <Form.Label>Phone*</Form.Label>
                  <InputGroup className=" d-flex w-100">
                    <Form.Select
                      aria-label="Default select example"
                      name="countryCode"
                      className="w-30 px-3 form-bar fs-16"
                      value={formik.values.countryCode}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    >
                      <option>+91</option>
                    </Form.Select>
                    <Form.Control
                      name="mobile"
                      type="text"
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
                  {formik.errors.mobile && (
                    <small className="text-danger">
                      {formik.errors.mobile}
                    </small>
                  )}
                </Form.Group>

                <Form.Group className="position-relative mb-4 w-50">
                  <Form.Label>Email*</Form.Label>
                  <InputGroup className=" d-flex">
                    <Form.Control
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className="position-relative form-bar"
                      placeholder="Email"
                    />
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="label-color-8 form-icon fs-22"
                    />
                  </InputGroup>
                  {formik.errors.email && (
                    <small className="text-danger">{formik.errors.email}</small>
                  )}
                </Form.Group>
              </div>

              <div className="d-flex w-100 gap-4 mb-3">
                <Form.Group className="position-relative w-50">
                  <Form.Label>Password*</Form.Label>
                  <InputGroup className=" d-flex">
                    <Form.Control
                      name="password"
                      type="password"
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className="position-relative form-bar"
                    />
                    <img
                      src={passwordIcon}
                      alt=""
                      className="form-icon"
                      width={20}
                    />
                  </InputGroup>
                  {formik.errors.password && (
                    <small className="text-danger">
                      {formik.errors.password}
                    </small>
                  )}
                </Form.Group>

                <Form.Group className="position-relative w-50">
                  <Form.Label>Confirm Password*</Form.Label>
                  <InputGroup className=" d-flex">
                    <Form.Control
                      name="confirmPassword"
                      type="password"
                      value={formik.values.confirmPassword}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className="position-relative form-bar"
                    />
                    <img
                      src={passwordIcon}
                      alt=""
                      className="form-icon"
                      width={20}
                    />
                  </InputGroup>
                  {formik.errors.confirmPassword && (
                    <small className="text-danger">
                      {formik.errors.confirmPassword}
                    </small>
                  )}
                </Form.Group>
              </div>

              <Form.Group className="mb-4">
                <div>
                  <Form.Check
                    type="checkbox"
                    id="check1"
                    inline
                    name="policy"
                    value={formik.values.policy}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <Form.Label htmlFor="check1">
                    By clicking checkbox, you agree to our{" "}
                    <span className="text-black fw-500">
                      Terms and Conditions
                    </span>{" "}
                    and{" "}
                    <span className="text-black fw-500">Privacy Policy</span>
                  </Form.Label>
                </div>
                {formik.errors.policy && (
                  <small className="text-danger">{formik.errors.policy}</small>
                )}
              </Form.Group>

              <div className="my-4 d-flex">
                <div>
                  <button
                    type="submit"
                    className={`fs-20 px-5 py-2 text-uppercase border-0 ${
                      registerLoading ? "btn-disabled " : "signup-btn"
                    }`}
                    disabled={registerLoading}
                    title="Sign Up"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="ms-auto text-end fw-500">
                  <span className="">Already having an account?</span>
                  <a
                    className="label-color-8 fs-20 text-decoration-none ms-1 cursor-pointer"
                    title="Login"
                    onClick={openLoginPopup}
                  >
                    Login
                  </a>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
