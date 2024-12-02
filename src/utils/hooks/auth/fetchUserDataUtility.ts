import { useAppDispatch } from '../../../redux/hooks';
import { getUserDetails } from '../../../redux/slices/auth/features';
import { ERROR_OCCURED_MESSAGE } from '../../constant';
import useToast from '../../helpers/general/useToast';

export const fetchUserDataUtility = async (dispatch: ReturnType<typeof useAppDispatch>) => {
  const toast = useToast();

  const dispatchAlert = (message: string) => {
    toast.error(message);
  };

  try {
    const actionResult = await dispatch(getUserDetails());
    if (getUserDetails.rejected.match(actionResult)) {
      const errorMessage = actionResult.error?.message || ERROR_OCCURED_MESSAGE;

      dispatchAlert(errorMessage);
    }
  } catch (err) {
    dispatchAlert(ERROR_OCCURED_MESSAGE);
    console.log(err);
  }
};
