import { ref, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'

export const useToast = () => {
    const store = useStore()
    const toastMessage = computed(() => store.getters['toast/toastMessageWithSmile'])
    const showToast = computed(() => store.state.toast.showToast)
    const toastAlertType = computed(() => store.state.toast.toastAlertType)

    const triggerToast = (message, type = 'success') => {
        store.dispatch('toast/triggerToast', message, type)
    }

    return {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast
    }
}