import { getSessionToken } from "../service/cookies.service";
import { isNill } from "../utils/comon.utils";


const useSessionHandler = () => {

    const isSessionActive = ():boolean => {
        const token = getSessionToken();

		if (!isNill(token)) {
			return true;
		} else {
            return false;
        }
    }

    return (
        isSessionActive
    )
	

};

export default useSessionHandler

