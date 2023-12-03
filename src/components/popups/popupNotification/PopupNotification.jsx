import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import "./popupNotification.scss";

import { MdOutlineNotificationsActive } from "react-icons/md";

const PopupNotification = ({ open, setOpen }) => {
  return (
    <div className={`popup_notification ${open ? "active" : ""}`}>
      <div className="top flex items-center justify-between">
        <div className="back" onClick={() => setOpen(false)}>
          <IoMdArrowBack size={25} />
        </div>

        <h4 className="font-semibold">Notifications</h4>
      </div>
      <div className="content mt-10 px-3">
        <div className="notifications_items">
          <div className="notification">
            <div className="icon">
              <MdOutlineNotificationsActive size={25} />
            </div>
            <div className="text">
              <h4 className="title font-semibold text-[19px] mb-2">
                Bank account
              </h4>
              <p className="message">A new bank account has been added</p>
              <span className="date text-[13px] text-gray-400">
                Sunday, December 3, 2023
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupNotification;
