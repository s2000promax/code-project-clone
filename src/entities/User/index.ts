export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export { getUserInited } from './model/selectors/getUserInited/getUserInited';

export {
  getUserRoles,
  isUserAdmin,
  isUserDesigner,
} from './model/selectors/roleSelectors';

export { userReducer, userActions } from './model/slice/userSlice';

export type { UserSchema, User } from './model/types/user';
export { UserRole } from '@/entities/User/model/consts/userConsts';

export { saveJsonSettings } from './model/services/saveJsonSettings';
export {
  useJsonSettings,
  getJsonSettings,
} from './model/selectors/jsonSettings';

export { initAuthData } from './model/services/initAuthData';
