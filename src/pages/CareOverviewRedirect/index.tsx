/**
 * REACT
 */
import React, { useEffect } from "react";

/**
 * MODULES
 */
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

/**
 * UTILS
 */
import redirect from "../../utils/redirect";

/**
 * COMPONENTS
 */
import Sidebar from "../../components/Sidebar";
import CareRedirect from "../../components/Redirect/CareRedirect";

/**
 * STATE
 */
import { ApplicationState } from "../../store";

/**
 * Interface For Component
 * @typedef ICareOverviewRedirect
 * @prop {string} id
 */
interface ICareOverviewRedirect {
  id: string;
}

/**
 * Page For Display Info About Redirect
 * @constructor
 */
function CareOverviewRedirect() {
  const { id } = useParams();
  const layoutState = useSelector((state: ApplicationState) => state.layout);
  useEffect(() => {
    if (layoutState.success) {
      redirect(`/care/${id}/overview`);
    }
  }, [layoutState.success]);

  return (
    <Sidebar>
      <CareRedirect />
    </Sidebar>
  );
}

export default CareOverviewRedirect;
