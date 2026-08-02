// src/store/redux/actions/adminAction/marketingActions.ts
import { Dispatch } from "redux";
import { adminAxios } from "@/app/(admin)/lib/axiosInstance";
import {
  BulkEmailFormValues,
  TargetGroup,
} from "@/app/(admin)/types/marketing";
import { AnnouncementFormValues } from "@/app/(admin)/admin/marketing/AnnouncementFormModal";
import {
  PREVIEW_RECIPIENTS_REQUEST,
  PREVIEW_RECIPIENTS_SUCCESS,
  PREVIEW_RECIPIENTS_FAIL,
  SEND_BULK_EMAIL_REQUEST,
  SEND_BULK_EMAIL_SUCCESS,
  SEND_BULK_EMAIL_FAIL,
  SEND_BULK_EMAIL_RESET,
  ANNOUNCEMENTS_LIST_REQUEST,
  ANNOUNCEMENTS_LIST_SUCCESS,
  ANNOUNCEMENTS_LIST_FAIL,
  ANNOUNCEMENT_SAVE_REQUEST,
  ANNOUNCEMENT_SAVE_SUCCESS,
  ANNOUNCEMENT_SAVE_FAIL,
  ANNOUNCEMENT_SAVE_RESET,
  ANNOUNCEMENT_DELETE_REQUEST,
  ANNOUNCEMENT_DELETE_SUCCESS,
  ANNOUNCEMENT_DELETE_FAIL,
  MarketingActionTypes,
} from "../../types/adminTypes/marketingTypes";

const getErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.message || error?.message || fallback;

// --- Preview Recipients (no send) ---
export const previewRecipientsAdmin =
  (targetGroup: TargetGroup, customRecipients: string) =>
  async (dispatch: Dispatch<MarketingActionTypes>) => {
    dispatch({ type: PREVIEW_RECIPIENTS_REQUEST });
    try {
      const payload =
        targetGroup === "CUSTOM"
          ? {
              recipients: customRecipients
                .split(",")
                .map((e) => e.trim())
                .filter(Boolean),
            }
          : { targetGroup };

      const { data } = await adminAxios.post(
        "/marketing/preview-recipients",
        payload,
      );
      dispatch({
        type: PREVIEW_RECIPIENTS_SUCCESS,
        payload: {
          recipientCount: data.data.recipientCount,
          recipients: data.data.recipients,
        },
      });
    } catch (error: any) {
      dispatch({
        type: PREVIEW_RECIPIENTS_FAIL,
        payload: getErrorMessage(error, "Failed to preview recipients"),
      });
    }
  };

// --- Send Bulk Campaign ---
export const sendBulkCampaign =
  (values: BulkEmailFormValues) =>
  async (dispatch: Dispatch<MarketingActionTypes>) => {
    dispatch({ type: SEND_BULK_EMAIL_REQUEST });
    try {
      const payload =
        values.targetGroup === "CUSTOM"
          ? {
              subject: values.subject,
              htmlContent: values.htmlContent,
              recipients: values.customRecipients
                .split(",")
                .map((e) => e.trim())
                .filter(Boolean),
              bannerImageUrl: values.bannerImageUrl || undefined,
              ctaText: values.ctaText || undefined,
              ctaUrl: values.ctaUrl || undefined,
            }
          : {
              subject: values.subject,
              htmlContent: values.htmlContent,
              targetGroup: values.targetGroup,
              bannerImageUrl: values.bannerImageUrl || undefined,
              ctaText: values.ctaText || undefined,
              ctaUrl: values.ctaUrl || undefined,
            };

      const { data } = await adminAxios.post("/marketing/send-bulk", payload);
      dispatch({
        type: SEND_BULK_EMAIL_SUCCESS,
        payload: { recipientCount: data.data.recipientCount },
      });
    } catch (error: any) {
      dispatch({
        type: SEND_BULK_EMAIL_FAIL,
        payload: getErrorMessage(error, "Failed to send bulk campaign"),
      });
    }
  };

export const resetBulkEmailSend = () => ({ type: SEND_BULK_EMAIL_RESET });

// --- Announcements CRUD ---
export const fetchAnnouncements =
  () => async (dispatch: Dispatch<MarketingActionTypes>) => {
    dispatch({ type: ANNOUNCEMENTS_LIST_REQUEST });
    try {
      const { data } = await adminAxios.get("/announcements");
      dispatch({
        type: ANNOUNCEMENTS_LIST_SUCCESS,
        payload: data.data.announcements,
      });
    } catch (error: any) {
      dispatch({
        type: ANNOUNCEMENTS_LIST_FAIL,
        payload: getErrorMessage(error, "Failed to fetch announcements"),
      });
    }
  };

export const saveAnnouncement =
  (values: AnnouncementFormValues, editingId: string | null) =>
  async (dispatch: Dispatch<MarketingActionTypes>) => {
    dispatch({ type: ANNOUNCEMENT_SAVE_REQUEST });
    try {
      const payload = {
        title: values.title,
        message: values.message,
        imageUrl: values.imageUrl || undefined,
        ctaText: values.ctaText || undefined,
        ctaUrl: values.ctaUrl || undefined,
        status: values.status,
      };

      const { data } = editingId
        ? await adminAxios.patch(`/announcements/${editingId}`, payload)
        : await adminAxios.post("/announcements", payload);

      dispatch({
        type: ANNOUNCEMENT_SAVE_SUCCESS,
        payload: data.data.announcement,
      });
      dispatch(fetchAnnouncements() as any);
    } catch (error: any) {
      dispatch({
        type: ANNOUNCEMENT_SAVE_FAIL,
        payload: getErrorMessage(error, "Failed to save announcement"),
      });
    }
  };

export const resetAnnouncementSave = () => ({ type: ANNOUNCEMENT_SAVE_RESET });

export const deleteAnnouncementAdmin =
  (id: string) => async (dispatch: Dispatch<MarketingActionTypes>) => {
    dispatch({ type: ANNOUNCEMENT_DELETE_REQUEST });
    try {
      await adminAxios.delete(`/announcements/${id}`);
      dispatch({ type: ANNOUNCEMENT_DELETE_SUCCESS, payload: id });
    } catch (error: any) {
      dispatch({
        type: ANNOUNCEMENT_DELETE_FAIL,
        payload: getErrorMessage(error, "Failed to delete announcement"),
      });
    }
  };
