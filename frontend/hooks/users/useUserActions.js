import { deleteUserAction, updateUserByAdminAction } from "@/actions/userActions";
import { openModalDelete } from "@/store/slices/modalDeleteSlice";
import { showToast } from "@/store/slices/toastSlice";
import { useDispatch } from "react-redux";
import { useLanguage } from "@/providers/LanguageProvider";

const useUserActions = (refetch) => {
    const dispatch = useDispatch();
    const { language } = useLanguage();
    const isEn = language === "en";

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
            title: isEn ? "Delete User" : "حذف المستخدم",
            message: isEn
                ? `Are you sure you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`
                : `هل أنت متأكد من حذف ${user.firstName} ${user.lastName}؟ لا يمكن التراجع عن هذا الإجراء.`,
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
