// note you need to import the css module before using this, to get the best results
import Toastify from "toastify-js"
const notify = ({ type, message }) => {
	let options = {}
	if (type === "warn") {
		options.color = "#ffffb3"
		options.duration = 3000
		options.text = "⚠️ " + message
	} else if (type === "error") {
		options.color = "#ffcccc"
		options.duration = 4000
		options.text = "❌ " + message
	} else if (type === "success") {
		options.color = "#dbfff3"
		options.duration = 2000
		options.text = "✔️ " + message
	} else if (type === "loading") {
		options.color = "#f2f8ff"
		options.text = ` <div><div class="loader"></div> ${message}</div>`
		options.duration = 200000
	} else throw new Error(`Unknown type ${type}`)

	const toast = Toastify({
		close: false,
		gravity: "top",
		position: "center",
		stopOnFocus: true,
		style: {
			background: options.color,
			color: "black",
			maxWidth: "min(260px, 70vw)",
			borderRadius: "4px",
			boxShadow:
				"0 2px 5px -1px rgba(92, 92, 92, 0.1), 0 3px 10px -5px rgba(84, 98, 211, 0.14)",
		},
		escapeMarkup: false,
		...options,
	})
	toast.showToast()
	return toast
}

export default notify
