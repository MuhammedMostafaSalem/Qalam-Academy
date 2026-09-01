import { deleteCategoryAction, updateCategoryFieldAction } from "@/actions/categoryActions";
import { openModalDelete } from "@/store/slices/modalDeleteSlice";
import { showToast } from "@/store/slices/toastSlice";
import { useDispatch } from "react-redux";
import { useLanguage } from "@/providers/LanguageProvider";

const useCategoryActions = (refetch) => {
    const dispatch = useDispatch();
    const { language, localize } = useLanguage();
    const isEn = language === "en";

    const handleUpdateField = async (userId, field, value) => {
        const res = await updateCategoryFieldAction(userId, { [field]: value });

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
        const categoryName = localize(category.title, isEn ? "this category" : "هذا التصنيف");
        dispatch(openModalDelete({
            title: isEn ? "Delete Category" : "حذف التصنيف",
            message: isEn
                ? `Are you sure you want to delete ${categoryName}? This action cannot be undone.`
                : `هل أنت متأكد من حذف ${categoryName}؟ لا يمكن التراجع عن هذا الإجراء.`,
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
