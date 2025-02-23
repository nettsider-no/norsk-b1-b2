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

	// Инициализация particlesJS для фоновой анимации
	particlesJS('particles-js', {
		particles: {
			number: {
				value: 80,
				density: {
					enable: true,
					value_area: 800,
				},
			},
			color: {
				value: '#007aff',
			},
			shape: {
				type: 'circle',
				stroke: {
					width: 0,
					color: '#000000',
				},
			},
			opacity: {
				value: 0.5,
				random: false,
				anim: {
					enable: false,
				},
			},
			size: {
				value: 3,
				random: true,
				anim: {
					enable: false,
				},
			},
			line_linked: {
				enable: true,
				distance: 150,
				color: '#007aff',
				opacity: 0.4,
				width: 1,
			},
			move: {
				enable: true,
				speed: 4,
				direction: 'none',
				random: false,
				straight: false,
				out_mode: 'out',
			},
		},
		interactivity: {
			detect_on: 'canvas',
			events: {
				onhover: {
					enable: true,
					mode: 'grab',
				},
				onclick: {
					enable: true,
					mode: 'push',
				},
			},
			modes: {
				grab: {
					distance: 140,
					line_linked: {
						opacity: 1,
					},
				},
				push: {
					particles_nb: 4,
				},
			},
		},
		retina_detect: true,
	})
})
