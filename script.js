document.addEventListener('DOMContentLoaded', function () {
	// Появление секций при прокрутке (оставляем без изменений)
	const categories = document.querySelectorAll('.category')
	categories.forEach(category => {
		category.style.opacity = '0'
		category.style.transform = 'translateY(30px)'
		category.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'
	})
	function revealOnScroll() {
		categories.forEach(category => {
			const rect = category.getBoundingClientRect()
			if (rect.top < window.innerHeight - 50) {
				category.style.opacity = '1'
				category.style.transform = 'translateY(0)'
			}
		})
	}
	window.addEventListener('scroll', revealOnScroll)
	revealOnScroll()

	// Упрощённая анимация открытия/закрытия скрытого контента
	const toggleButtons = document.querySelectorAll('.toggle-btn')
	toggleButtons.forEach(button => {
		button.addEventListener('click', function () {
			const hiddenContent = this.previousElementSibling
			hiddenContent.classList.toggle('open')
			this.textContent = hiddenContent.classList.contains('open')
				? 'Skjul'
				: 'Vis mer'
		})
	})

	// Тоггл мобильного меню (без изменений)
	const menuToggle = document.getElementById('mobile-menu')
	const navLinks = document.querySelector('.nav-links')
	menuToggle.addEventListener('click', function () {
		navLinks.classList.toggle('active')
	})
})
