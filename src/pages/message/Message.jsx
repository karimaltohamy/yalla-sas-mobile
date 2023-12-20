import React from "react";
import "./message.scss";
import { useTranslation } from "react-i18next";

const Message = () => {
  const { t } = useTranslation();
  return (
    <div className="message h-[100vh] flex items-center justify-center">
      <p>
        {t(
          "The transaction is being verified and the subscription will be activated if the transaction is completed"
        )}
      </p>
    </div>
  );
};

export default Message;
