<template>
    <div class="form-group">
        <label>{{label}}</label>
        <input :value="subject" type="text" class="form-control" @input="onInput">
        <div v-if="subjectErr" class="text-danger">{{error}}</div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        error: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
    },
    setup(props, { emit }) {
        const onInput = (e) => {
            emit('update:subject', e.target.value)
        }

        return {
            onInput
        }
    }
}
</script>