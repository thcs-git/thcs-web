import { ApplicationState } from "../..";

export const getAttachment = (state: ApplicationState) =>
  state.attachmentsIntegration;
