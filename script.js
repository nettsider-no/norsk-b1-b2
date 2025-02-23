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

	// Функция для сворачивания/разворачивания скрытого контента с сохранением состояния
	const toggleButtons = document.querySelectorAll('.toggle-btn')
	toggleButtons.forEach((button, index) => {
		// Восстановление состояния при загрузке страницы
		if (sessionStorage.getItem('toggleState-' + index) === 'expanded') {
			const hiddenContent = button.previousElementSibling
			if (hiddenContent) {
				hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px'
				button.textContent = 'Скрыть'
			}
		}

		button.addEventListener('click', function () {
			const hiddenContent = this.previousElementSibling
			if (hiddenContent) {
				if (
					hiddenContent.style.maxHeight &&
					hiddenContent.style.maxHeight !== '0px'
				) {
					hiddenContent.style.maxHeight = '0'
					this.textContent = 'Показать больше'
					sessionStorage.setItem('toggleState-' + index, 'collapsed')
					this.blur()
				} else {
					hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px'
					this.textContent = 'Скрыть'
					sessionStorage.setItem('toggleState-' + index, 'expanded')
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

	// Сохранение позиции прокрутки при клике на Lightbox-ссылки
	let storedScroll = 0
	document.querySelectorAll('a[data-lightbox]').forEach(anchor => {
		anchor.addEventListener('click', () => {
			storedScroll = window.pageYOffset
		})
	})

	// Восстановление позиции прокрутки, когда hash очищается (Lightbox закрыт)
	window.addEventListener('hashchange', () => {
		if (!location.hash) {
			window.scrollTo({ top: storedScroll, behavior: 'smooth' })
		}
	})

	// Mousemove параллакс-эффект для фона:
	document.addEventListener('mousemove', function (e) {
		// Получаем координаты мыши
		const x = e.clientX
		const y = e.clientY

		// Вычисляем смещение: базовая позиция 50%, смещение ±5%
		const moveX = 50 + (x / window.innerWidth - 0.5) * 12
		const moveY = 50 + (y / window.innerHeight - 0.5) * 12

		// Применяем новое положение фона к body
		document.body.style.backgroundPosition = `${moveX}% ${moveY}%`
	})
})
