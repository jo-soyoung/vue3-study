import { ref, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'

export const useToast = () => {
    const store = useStore()

    const toastMessage = computed(() => store.state.toastMessage)
    const showToast = computed(() => store.state.showToast)
    const toastAlertType = computed(() => store.state.toastAlertType)
    const toastTimeout = computed(() => store.state.toastTimeout)

    const triggerToast = (message, type = 'success') => {
        // TODO: vuex의 state를 바꾸고 싶다면 mutation을 쓴다
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