import React, { useEffect, useState } from "react";

function OutstationCabs(props) {
  const { cabData, setVehicleId } = props;
  const [isActive, setIsActive] = useState(cabData?.[0]);
  const [id, setId] = useState(cabData?.[0]?.vehicle_type_id);

  function handleChangeCabModel(value) {
    setIsActive(value);
    setId(value.vehicle_type_id);
  }

  useEffect(() => {
    setVehicleId(id);
  }, [id]);

  return (
    <>
      <h6 className="fs-26 fw-600  mb-3 label-color-1">Choose cab</h6>
      <div className="d-flex mb-4 font-sfpro">
        {cabData?.map((item, key) => {
          return (
            <div
              className={`cab-model ${
                isActive?.id == item.id ? "active" : ""
              } `}
              key={key}
              onClick={() => handleChangeCabModel(item)}
            >
              <img src={item.vechile_image} alt="" width={70} />
              <span className="mt-2 fw-500">{item.vechile_name}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default OutstationCabs;
