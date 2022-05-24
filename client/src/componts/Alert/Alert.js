import React from "react";
import "./alert.css";

export default function Alert(props) {
  const [toast, settoast] = React.useState(false);
  const [toast1, settoast1] = React.useState(false);
  const alerts={
    'Error': {'class':"danger",'icon':"fa-solid fa-octagon-xmark fa-fw me-2",'header': 'Error',},
    'Success': {'class':"success",'icon':"fa-solid fa-badge-check fa-fw me-2",'header': 'Success',},
    'Warning': {'class':"warning",'icon':"fa-solid fa-octagon-exclamation fa-fw me-2",'header': 'Warning',},
  }
  React.useEffect(() => {
    if (props.alertactive[0]) {
      settoast(true);
      settoast1(true);
      setTimeout(() => {settoast(false)}, 5000);
      setTimeout(() => {settoast1(false)}, 5300);
    }
  }, [props.alertactive]);
  if (props.alertactive[0]) {
    return (
      <div className={`toast ${toast ? "active" : ""} text-${alerts[props.alertactive[1]]['class']}`}>
        <div className="toast-content">
          <i className={`fa-solid fa-${alerts[props.alertactive[1]]['icon']}`}></i>
          <div className="message">
            <span className="text text-1">{props.alertactive[1]}</span>
            <span className="text text-2">{props.alertactive[2]}</span>
          </div>
        </div>
        <i className="fa-solid fa-xmark close" onClick={()=>{settoast(false);setTimeout(() => {settoast1(false)}, 300);}}></i>
        <div className={`progress ${toast1 ? "active" : ""}  progress-${alerts[props.alertactive[1]]['class']}`}></div>
      </div>
    );
  }else{
    return(
      <></>
    );
  }
}
