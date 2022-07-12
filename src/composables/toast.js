import { ref, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'

export const useToast = () => {
    const store = useStore()
    const toastMessage = computed(() => store.getters.toastMessageWithSmile)
    const showToast = computed(() => store.state.showToast)
    const toastAlertType = computed(() => store.state.toastAlertType)
    const toastTimeout = computed(() => store.state.toastTimeout)

    const triggerToast = (message, type = 'success') => {
        store.dispatch('triggerToast', message, type)
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