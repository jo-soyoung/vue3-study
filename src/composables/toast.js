import { ref, onUnmounted } from 'vue'

export const useToast = () => {
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastAlertType = ref('');
    const toastTimeout = ref(null)
    const triggerToast = (message, type = 'success') => {
        showToast.value = true
        toastMessage.value = message
        toastAlertType.value = type
        toastTimeout.value = setTimeout(()=>{
            toastMessage.value = '';
            toastAlertType.value = ''
            showToast.value = false
        }, 3000)
    }

    onUnmounted(() => {
        clearTimeout(toastTimeout.value)
    })

    return {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast
    }
}