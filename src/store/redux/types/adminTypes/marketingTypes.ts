// src/store/redux/types/adminTypes/marketingTypes.ts
import { Announcement } from "@/app/(admin)/types/marketing";

export const PREVIEW_RECIPIENTS_REQUEST = "PREVIEW_RECIPIENTS_REQUEST";
export const PREVIEW_RECIPIENTS_SUCCESS = "PREVIEW_RECIPIENTS_SUCCESS";
export const PREVIEW_RECIPIENTS_FAIL = "PREVIEW_RECIPIENTS_FAIL";

export const SEND_BULK_EMAIL_REQUEST = "SEND_BULK_EMAIL_REQUEST";
export const SEND_BULK_EMAIL_SUCCESS = "SEND_BULK_EMAIL_SUCCESS";
export const SEND_BULK_EMAIL_FAIL = "SEND_BULK_EMAIL_FAIL";
export const SEND_BULK_EMAIL_RESET = "SEND_BULK_EMAIL_RESET";

export const ANNOUNCEMENTS_LIST_REQUEST = "ANNOUNCEMENTS_LIST_REQUEST";
export const ANNOUNCEMENTS_LIST_SUCCESS = "ANNOUNCEMENTS_LIST_SUCCESS";
export const ANNOUNCEMENTS_LIST_FAIL = "ANNOUNCEMENTS_LIST_FAIL";

export const ANNOUNCEMENT_SAVE_REQUEST = "ANNOUNCEMENT_SAVE_REQUEST";
export const ANNOUNCEMENT_SAVE_SUCCESS = "ANNOUNCEMENT_SAVE_SUCCESS";
export const ANNOUNCEMENT_SAVE_FAIL = "ANNOUNCEMENT_SAVE_FAIL";
export const ANNOUNCEMENT_SAVE_RESET = "ANNOUNCEMENT_SAVE_RESET";

export const ANNOUNCEMENT_DELETE_REQUEST = "ANNOUNCEMENT_DELETE_REQUEST";
export const ANNOUNCEMENT_DELETE_SUCCESS = "ANNOUNCEMENT_DELETE_SUCCESS";
export const ANNOUNCEMENT_DELETE_FAIL = "ANNOUNCEMENT_DELETE_FAIL";

interface PreviewRequest {
  type: typeof PREVIEW_RECIPIENTS_REQUEST;
}
interface PreviewSuccess {
  type: typeof PREVIEW_RECIPIENTS_SUCCESS;
  payload: { recipientCount: number; recipients: string[] };
}
interface PreviewFail {
  type: typeof PREVIEW_RECIPIENTS_FAIL;
  payload: string;
}

interface SendRequest {
  type: typeof SEND_BULK_EMAIL_REQUEST;
}
interface SendSuccess {
  type: typeof SEND_BULK_EMAIL_SUCCESS;
  payload: { recipientCount: number };
}
interface SendFail {
  type: typeof SEND_BULK_EMAIL_FAIL;
  payload: string;
}
interface SendReset {
  type: typeof SEND_BULK_EMAIL_RESET;
}

interface ListRequest {
  type: typeof ANNOUNCEMENTS_LIST_REQUEST;
}
interface ListSuccess {
  type: typeof ANNOUNCEMENTS_LIST_SUCCESS;
  payload: Announcement[];
}
interface ListFail {
  type: typeof ANNOUNCEMENTS_LIST_FAIL;
  payload: string;
}

interface SaveRequest {
  type: typeof ANNOUNCEMENT_SAVE_REQUEST;
}
interface SaveSuccess {
  type: typeof ANNOUNCEMENT_SAVE_SUCCESS;
  payload: Announcement;
}
interface SaveFail {
  type: typeof ANNOUNCEMENT_SAVE_FAIL;
  payload: string;
}
interface SaveReset {
  type: typeof ANNOUNCEMENT_SAVE_RESET;
}

interface DeleteRequest {
  type: typeof ANNOUNCEMENT_DELETE_REQUEST;
}
interface DeleteSuccess {
  type: typeof ANNOUNCEMENT_DELETE_SUCCESS;
  payload: string;
}
interface DeleteFail {
  type: typeof ANNOUNCEMENT_DELETE_FAIL;
  payload: string;
}

export type MarketingActionTypes =
  | PreviewRequest
  | PreviewSuccess
  | PreviewFail
  | SendRequest
  | SendSuccess
  | SendFail
  | SendReset
  | ListRequest
  | ListSuccess
  | ListFail
  | SaveRequest
  | SaveSuccess
  | SaveFail
  | SaveReset
  | DeleteRequest
  | DeleteSuccess
  | DeleteFail;
