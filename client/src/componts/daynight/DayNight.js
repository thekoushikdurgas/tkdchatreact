import React,{useState,useEffect} from "react";
import './daynight.css';

export default function DayNight() {
      const [daynight, setdaynight] = useState(false);
      const changedaynight = (t) => {
        setdaynight(t);
        var className = t ? "bodydark" : "";
        document.body.className = className;
      };
      const handleOnChange = () => {
        changedaynight(!daynight);
      };
      const positionsunmoon = () => {
        var e = new Date().getHours(),
          t = true;
        if (e <= 5) {
          e += 6;
        } else if (e >= 6 && e <= 17) {
          t = false;
          e -= 6;
        } else {
          e -= 18;
        }
        changedaynight(t);
      };
      setTimeout(() => {
        positionsunmoon();
      }, 6e4);
      useEffect(() => {
        positionsunmoon();
        // eslint-disable-next-line
      }, []);
    return (
        <div className="tkddarklight">
        <label>
            <input className="toggle-checkbox" type="checkbox" checked={daynight} onChange={handleOnChange} />
            <div className="toggle-slot">
            <div className="sun-icon-wrapper">
                <i className="fa fa-sun-bright" />
            </div>
            <div className="moon-icon-wrapper">
                <i className="fas fa-moon-cloud fa-fw" />
            </div>
            </div>
        </label>
        </div>
    )
}