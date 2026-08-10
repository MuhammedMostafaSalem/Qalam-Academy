import { deleteCategoryAction, updateCategoryAction } from "@/actions/categoryActions";
import { openModalDelete } from "@/store/slices/modalDeleteSlice";
import { showToast } from "@/store/slices/toastSlice";
import { useDispatch } from "react-redux";

const useCategoryActions = (refetch) => {
    const dispatch = useDispatch();

    const handleUpdateField = async (userId, field, value) => {
        const res = await updateCategoryAction(userId, { [field]: value });

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
        const res = await deleteCategoryAction(userId);

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

    const handleDeleteRequest = (category) => {
        dispatch(openModalDelete({
            title: "حذف المستخدم",
            message: `هل أنت متأكد من حذف ${category.title} ؟ لا يمكن التراجع عن هذا الإجراء`,
            itemId: category._id,
        }));
    }

    return {
        handleUpdateField,
        handleDelete,
        handleDeleteRequest,
    }
}

export default useCategoryActions