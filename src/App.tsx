import axios from 'axios'
import { FormEvent, useState } from 'react'
import './App.scss'

interface IFormData {
	name: string
	email: string
	message: string
}

interface IErrorData {
	[name: string]: string
}

const initialFormData: IFormData = {
	name: '',
	email: '',
	message: '',
}

const App: React.FC = () => {
	const [formData, setFormData] = useState<IFormData>(initialFormData)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errors, setErrors] = useState<IErrorData>({})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		const validationErrors = validateForm()
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			return
		}

		try {
			setIsSubmitting(true)

			const res = await axios.post('', formData)
			console.log(res.data)

			setFormData(initialFormData)
			setIsSubmitting(false)
			setErrors({})
		} catch (e) {
			console.error(e)
			setIsSubmitting(false)
		}
	}

	const validateForm = () => {
		const errors: IErrorData = {}

		if (formData.name.trim() === '') errors.name = 'Name is required'
		if (formData.email.trim() === '') errors.email = 'Email is required'
		if (formData.message.trim() === '') errors.message = 'Message is required'

		return errors
	}

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target

		setFormData(prevFormData => ({
			...prevFormData,
			[name]: value,
		}))

		setErrors(prevErrors => ({
			...prevErrors,
			[name]: '',
		}))
	}

	return (
		<div className="form-container">
			<div className="contact-container">
				<h1>Send me a message</h1>
				<p>
					Feel free to get in touch with me with anything related to Web
					Development or you can just say hi. I will get back to you as soon as
					possible.
				</p>
				<form className="contact-form" onSubmit={handleSubmit}>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Your name"
						value={formData.name}
						onChange={handleInputChange}
					></input>
					{errors.name && <span>{errors.name}</span>}
					<input
						type="text"
						id="email"
						name="email"
						placeholder="Email address"
						value={formData.email}
						onChange={handleInputChange}
					></input>
					{errors.email && <span>{errors.email}</span>}
					<textarea
						id="message"
						name="message"
						value={formData.message}
						placeholder="Message"
						onChange={handleInputChange}
					></textarea>
					{errors.message && <span>{errors.message}</span>}
					<button type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Submitting...' : 'Submit'}
					</button>
				</form>
			</div>
		</div>
	)
}

export default App
