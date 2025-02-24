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
				content.style.maxHeight = '0'
				this.textContent = 'Показать больше'
				sessionStorage.setItem('toggleState-' + index, 'collapsed')
				this.blur()
			} else {
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
			toggleLink.addEventListener('click', e => {
				e.preventDefault() // предотвращаем переход по ссылке
				dropdown.classList.toggle('open')
				e.currentTarget.blur()
			})
		}
	})

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

	// Функция параллакса фона
	const parallaxHandler = e => {
		const x = e.clientX
		const y = e.clientY
		// Множитель смещения можно подстроить (здесь 10)
		const moveX = 50 + (x / window.innerWidth - 0.5) * 10
		const moveY = 50 + (y / window.innerHeight - 0.5) * 10
		document.body.style.backgroundPosition = `${moveX}% ${moveY}%`
	}

	// Функция для включения или отключения параллакса в зависимости от ширины окна
	const setupParallax = () => {
		// Если устройство широкое (например, десктоп), добавляем обработчик mousemove
		if (window.innerWidth > 768) {
			document.addEventListener('mousemove', parallaxHandler)
		} else {
			// Для мобильных устройств сбрасываем положение фона и удаляем обработчик (если ранее был добавлен)
			document.body.style.backgroundPosition = '50% 50%'
			document.removeEventListener('mousemove', parallaxHandler)
		}
	}

	// Запуск параллакса с задержкой 2 сек (2000 мс)
	setTimeout(() => {
		setupParallax()
	}, 2000)

	// Обновляем настройки параллакса при изменении размеров окна
	window.addEventListener('resize', () => {
		setupParallax()
	})
})
