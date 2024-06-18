import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const TaxiHistory = dynamic(() => import("../TaxiService/Order/TaxiHistory"));

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({});

function MyOrder(props) {
  const { isLoggedIn } = props;
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return (
    <>
      <section className="mt-70 py-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 courier-header">
              {/* <div className="rounded p-md-2 p-2 courier-paging ps-md-5 fs-23 font-proxima bg-color-4 mb-md-4 mb-2">
                My Accounts &gt;{" "}
                <span className="label-color-13">Orders History</span>
              </div> */}
              <div className="pt-3 font-proxima fs-30 fw-600">
                <h1 className="label-color-2">Orders History</h1>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
      </section>

      <TaxiHistory />
    </>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);
