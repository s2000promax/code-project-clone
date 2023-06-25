import { rtkApi } from '@/shared/api/rtkApi';
import type { Notification } from '../model/types/notifications';

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotification: build.query<Notification[], null>({
      query: () => ({
        url: '/notifications',
      }),
    }),
  }),
});

export const useNotifications = notificationApi.useGetNotificationQuery;
