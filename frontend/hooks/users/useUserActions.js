import { deleteUserAction, updateUserByAdminAction } from "@/actions/userActions";
import { openModalDelete } from "@/store/slices/modalDeleteSlice";
import { showToast } from "@/store/slices/toastSlice";
import { useDispatch } from "react-redux";

const useUserActions = (refetch) => {
    const dispatch = useDispatch();

    const handleUpdateField = async (userId, field, value) => {
        const res = await updateUserByAdminAction(userId, { [field]: value });

        if (res.success) {
            dispatch(showToast({
                message: "تم التعديل بنجاح",
                type: "success"
            }));

            if (refetch) refetch();
        } else {
            dispatch(showToast({
                message: res.message,
                type: "error"
            }));
        }
    }

    const handleDelete = async (userId) => {
        const res = await deleteUserAction(userId);

        if (res.success) {
            dispatch(showToast({
                message: res.message,
                type: "success"
            }));
            if (refetch) refetch();
        } else {
            dispatch(showToast({
                message: res.message,
                type: "error"
            }));
        }
    }

    const handleDeleteRequest = (user) => {
        dispatch(openModalDelete({
            title: "حذف المستخدم",
            message: `هل أنت متأكد من حذف ${user.firstName} ${user.lastName}؟ لا يمكن التراجع عن هذا الإجراء.`,
            itemId: user._id,
        }));
    }

    return {
        handleUpdateField,
        handleDelete,
        handleDeleteRequest,
    }
}

export default useUserActions