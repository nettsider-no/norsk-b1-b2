document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	// Анимация появления секций при прокрутке
	const categories = document.querySelectorAll('.category')
	categories.forEach(category => {
		category.style.opacity = '0'
		category.style.transform = 'translateY(30px)'
		category.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'
	})

	const observer = new IntersectionObserver(
		(entries, obs) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.style.opacity = '1'
					entry.target.style.transform = 'translateY(0)'
					obs.unobserve(entry.target)
				}
			})
		},
		{ threshold: 0.1 }
	)
	categories.forEach(category => observer.observe(category))

	// Функция для сворачивания/разворачивания скрытого контента
	const toggleButtons = document.querySelectorAll('.toggle-btn')
	toggleButtons.forEach(button => {
		button.addEventListener('click', function () {
			const hiddenContent = this.previousElementSibling
			if (hiddenContent) {
				if (
					hiddenContent.style.maxHeight &&
					hiddenContent.style.maxHeight !== '0px'
				) {
					hiddenContent.style.maxHeight = '0'
					this.textContent = 'Vis mer'
					this.blur()
				} else {
					hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px'
					this.textContent = 'Skjul'
				}
			}
		})
	})

	// Toggle для мобильного меню
	const menuToggle = document.getElementById('mobile-menu')
	const navLinks = document.querySelector('.nav-links')
	menuToggle.addEventListener('click', () =>
		navLinks.classList.toggle('active')
	)
})
