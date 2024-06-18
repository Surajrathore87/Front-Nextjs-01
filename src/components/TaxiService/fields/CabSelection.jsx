import React, { useEffect, useState } from "react";

function CabSelection(props) {
  const { cabsData, setVehicleId } = props;
  const [isActive, setIsActive] = useState(cabsData?.[0]);
  const [id, setId] = useState(cabsData?.[0]?.id);

  function handleChangeCabModel(value) {
    setIsActive(value);
    setId(value.id);
  }

  useEffect(() => {
    setVehicleId(id);
  }, [id]);
  return (
    <>
      <div className=" mb-3  ">
        <h6 className="fs-26 fw-600 mb-3  label-color-1">Choose Cab</h6>
        <div className="cab-type ms-2 mb-4 font-sfpro">
          <div className="d-flex mb-4 font-sfpro">
            {cabsData?.map((item, key) => {
              return (
                <div
                  className={`cab-model ${
                    isActive?.id == item.id ? "active" : ""
                  } `}
                  key={key}
                  onClick={() => handleChangeCabModel(item)}
                >
                  <img src={item.vehicleTypeImage} alt="" width={70} />
                  <span className="mt-2 fw-500">{item.vehicleTypeName}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default CabSelection;
