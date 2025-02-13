document.addEventListener('DOMContentLoaded', function () {
	const categories = document.querySelectorAll('.category')

	function revealOnScroll() {
		categories.forEach(category => {
			const rect = category.getBoundingClientRect()
			if (rect.top < window.innerHeight - 50) {
				category.style.opacity = '1'
				category.style.transform = 'translateY(0)'
			}
		})
	}

	categories.forEach(category => {
		category.style.opacity = '0'
		category.style.transform = 'translateY(30px)'
		category.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'
	})

	window.addEventListener('scroll', revealOnScroll)
	revealOnScroll()
})
