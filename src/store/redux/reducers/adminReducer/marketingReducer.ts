// src/store/redux/reducers/marketingReducer.ts
import { Announcement } from "@/app/(admin)/types/marketing";
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

interface MarketingState {
  previewCount: number | null;
  previewRecipients: string[];
  previewLoading: boolean;
  previewError: string | null;

  sendLoading: boolean;
  sendSuccess: boolean;
  sendError: string | null;
  lastSentCount: number | null;

  announcements: Announcement[];
  announcementsLoading: boolean;
  announcementsError: string | null;

  saveLoading: boolean;
  saveSuccess: boolean;
  saveError: string | null;

  deleteLoading: boolean;
  deleteError: string | null;
}

const initialState: MarketingState = {
  previewCount: null,
  previewRecipients: [],
  previewLoading: false,
  previewError: null,

  sendLoading: false,
  sendSuccess: false,
  sendError: null,
  lastSentCount: null,

  announcements: [],
  announcementsLoading: false,
  announcementsError: null,

  saveLoading: false,
  saveSuccess: false,
  saveError: null,

  deleteLoading: false,
  deleteError: null,
};

export const marketingReducer = (
  state = initialState,
  action: MarketingActionTypes,
): MarketingState => {
  switch (action.type) {
    case PREVIEW_RECIPIENTS_REQUEST:
      return { ...state, previewLoading: true, previewError: null };
    case PREVIEW_RECIPIENTS_SUCCESS:
      return {
        ...state,
        previewLoading: false,
        previewCount: action.payload.recipientCount,
        previewRecipients: action.payload.recipients,
      };
    case PREVIEW_RECIPIENTS_FAIL:
      return { ...state, previewLoading: false, previewError: action.payload };

    case SEND_BULK_EMAIL_REQUEST:
      return {
        ...state,
        sendLoading: true,
        sendError: null,
        sendSuccess: false,
      };
    case SEND_BULK_EMAIL_SUCCESS:
      return {
        ...state,
        sendLoading: false,
        sendSuccess: true,
        lastSentCount: action.payload.recipientCount,
      };
    case SEND_BULK_EMAIL_FAIL:
      return { ...state, sendLoading: false, sendError: action.payload };
    case SEND_BULK_EMAIL_RESET:
      return {
        ...state,
        sendSuccess: false,
        sendError: null,
        previewCount: null,
      };

    case ANNOUNCEMENTS_LIST_REQUEST:
      return { ...state, announcementsLoading: true, announcementsError: null };
    case ANNOUNCEMENTS_LIST_SUCCESS:
      return {
        ...state,
        announcementsLoading: false,
        announcements: action.payload,
      };
    case ANNOUNCEMENTS_LIST_FAIL:
      return {
        ...state,
        announcementsLoading: false,
        announcementsError: action.payload,
      };

    case ANNOUNCEMENT_SAVE_REQUEST:
      return {
        ...state,
        saveLoading: true,
        saveError: null,
        saveSuccess: false,
      };
    case ANNOUNCEMENT_SAVE_SUCCESS:
      return { ...state, saveLoading: false, saveSuccess: true };
    case ANNOUNCEMENT_SAVE_FAIL:
      return { ...state, saveLoading: false, saveError: action.payload };
    case ANNOUNCEMENT_SAVE_RESET:
      return { ...state, saveSuccess: false, saveError: null };

    case ANNOUNCEMENT_DELETE_REQUEST:
      return { ...state, deleteLoading: true, deleteError: null };
    case ANNOUNCEMENT_DELETE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        announcements: state.announcements.filter(
          (a) => a.id !== action.payload,
        ),
      };
    case ANNOUNCEMENT_DELETE_FAIL:
      return { ...state, deleteLoading: false, deleteError: action.payload };

    default:
      return state;
  }
};
