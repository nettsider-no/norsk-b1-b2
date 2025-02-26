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

	// Функция для сворачивания/разворачивания скрытого контента с сохранением позиции скролла
	const toggleButtons = document.querySelectorAll('.toggle-btn')
	toggleButtons.forEach((button, index) => {
		const hiddenContent = button.previousElementSibling
		if (
			hiddenContent &&
			sessionStorage.getItem('toggleState-' + index) === 'expanded'
		) {
			hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px'
			button.textContent = 'Скрыть'
		}

		button.addEventListener('click', function () {
			const content = this.previousElementSibling
			if (!content) return

			if (content.style.maxHeight && content.style.maxHeight !== '0px') {
				let previousScroll = this.dataset.previousScroll
				content.style.maxHeight = '0'
				this.textContent = 'Показать больше'
				sessionStorage.setItem('toggleState-' + index, 'collapsed')
				this.blur()

				content.addEventListener('transitionend', function handler(e) {
					if (e.propertyName === 'max-height') {
						if (previousScroll) {
							window.scrollTo({
								top: parseFloat(previousScroll),
								behavior: 'smooth',
							})
						}
						content.removeEventListener('transitionend', handler)
					}
				})
				delete this.dataset.previousScroll
			} else {
				this.dataset.previousScroll = window.pageYOffset
				content.style.maxHeight = content.scrollHeight + 'px'
				this.textContent = 'Скрыть'
				sessionStorage.setItem('toggleState-' + index, 'expanded')
			}
		})
	})

	// Toggle для мобильного меню
	const menuToggle = document.getElementById('mobile-menu')
	const navLinks = document.querySelector('.nav-links')
	menuToggle.addEventListener('click', () => {
		navLinks.classList.toggle('active')
	})

	// Обработка выпадающего меню для мобильной версии
	const dropdowns = document.querySelectorAll('.dropdown')
	dropdowns.forEach(dropdown => {
		const toggleLink = dropdown.querySelector('.dropdown-toggle')
		if (toggleLink) {
			const handleToggle = e => {
				e.preventDefault()
				const wasOpen = dropdown.classList.contains('open')
				dropdown.classList.toggle('open')
				if (wasOpen) {
					// При закрытии меню сбрасываем фокус и устанавливаем стандартный цвет
					setTimeout(() => {
						toggleLink.blur()
						toggleLink.style.color = getComputedStyle(
							document.documentElement
						).getPropertyValue('--text-color')
					}, 100)
				} else {
					// При открытии устанавливаем hover-эффект
					toggleLink.style.color = getComputedStyle(
						document.documentElement
					).getPropertyValue('--primary-color')
				}
			}
			toggleLink.addEventListener('click', handleToggle)
			toggleLink.addEventListener('touchend', handleToggle)
		}
	})

	// --- Восстановление скролла после закрытия Lightbox ---
	document.querySelectorAll('a[data-lightbox]').forEach(anchor => {
		anchor.addEventListener('click', () => {
			window.lightboxScrollPosition = window.pageYOffset
		})
	})
	document.addEventListener('click', e => {
		if (e.target.closest('.lb-close')) {
			setTimeout(() => {
				if (typeof window.lightboxScrollPosition !== 'undefined') {
					window.scrollTo({
						top: window.lightboxScrollPosition,
						behavior: 'smooth',
					})
				}
			}, 100)
		}
	})
})
