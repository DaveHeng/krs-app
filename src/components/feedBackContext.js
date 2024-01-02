import { message as messageIntacne, Modal } from 'ant-design-vue'

let message = null
let modal = null

export default function feedBackContext() {
	const [messageApi, contextHolder] = messageIntacne.useMessage()
	const modalIntance = Modal.useModal()
	message = messageApi
	modal = modalIntance[0]
	return [contextHolder, modalIntance[1]]
}

export { message, modal }