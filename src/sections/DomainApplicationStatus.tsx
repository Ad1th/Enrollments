import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

interface Props {
  domain: "tech" | "design" | "management";
}

const DomainApplicationStatus = ({ domain }: Props) => {
  const [status, setStatus] = useState("");
  const [redirect, setRedirect] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const id = secureLocalStorage.getItem("id");
    if (!id) {
      console.error("User id not found in secureLocalStorage");
      return;
    }

    api
      .get(`/applicatiostatus/status${domain}/${id}`)
      .then((response) => {
        setStatus(response.data?.message ?? "");
        setRedirect(response.data?.redirectTo ?? "");
      })
      .catch((error) => console.error(error));
  }, [domain]);

  return (
    <>
      <p className="text-prime text-sm ">{status}</p>
      {redirect !== "" && (
        <button
          type="button"
          className="nes-btn is-error nes-btn-task  w-[47%] md:w-[40%] aspect-[6] custom-nes-error text-s"
          onClick={() => navigate(redirect)}
        >
          Schedule a Meeting
        </button>
      )}
    </>
  );
};

export default DomainApplicationStatus;
