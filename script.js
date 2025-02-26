document.addEventListener('DOMContentLoaded', () => {
	'use strict'
	let e = document.querySelectorAll('.toggle-btn')
	e.forEach((e, t) => {
		let l = e.previousElementSibling
		l &&
			'expanded' === sessionStorage.getItem('toggleState-' + t) &&
			((l.style.maxHeight = l.scrollHeight + 'px'), (e.textContent = 'Скрыть')),
			e.addEventListener('click', function () {
				let e = this.previousElementSibling
				if (e) {
					if (e.style.maxHeight && '0px' !== e.style.maxHeight) {
						let l = this.dataset.previousScroll
						;(e.style.maxHeight = '0'),
							(this.textContent = 'Показать больше'),
							sessionStorage.setItem('toggleState-' + t, 'collapsed'),
							this.blur(),
							e.addEventListener('transitionend', function t(o) {
								'max-height' === o.propertyName &&
									(l &&
										window.scrollTo({ top: parseFloat(l), behavior: 'smooth' }),
									e.removeEventListener('transitionend', t))
							}),
							delete this.dataset.previousScroll
					} else
						(this.dataset.previousScroll = window.pageYOffset),
							(e.style.maxHeight = e.scrollHeight + 'px'),
							(this.textContent = 'Скрыть'),
							sessionStorage.setItem('toggleState-' + t, 'expanded')
				}
			})
	})
	let t = document.getElementById('mobile-menu'),
		l = document.querySelector('.nav-links')
	t.addEventListener('click', () => {
		l.classList.toggle('active')
	})
	let o = document.querySelectorAll('.dropdown')
	o.forEach(e => {
		let t = e.querySelector('.dropdown-toggle')
		if (t) {
			let l = l => {
				l.preventDefault()
				let o = e.classList.contains('open')
				e.classList.toggle('open'),
					o
						? setTimeout(() => {
								t.blur(),
									(t.style.color = getComputedStyle(
										document.documentElement
									).getPropertyValue('--text-color'))
						  }, 100)
						: (t.style.color = getComputedStyle(
								document.documentElement
						  ).getPropertyValue('--primary-color'))
			}
			t.addEventListener('click', l), t.addEventListener('touchend', l)
		}
	}),
		document.querySelectorAll('a[data-lightbox]').forEach(e => {
			e.addEventListener('click', () => {
				window.lightboxScrollPosition = window.pageYOffset
			})
		}),
		document.addEventListener('click', e => {
			e.target.closest('.lb-close') &&
				setTimeout(() => {
					void 0 !== window.lightboxScrollPosition &&
						window.scrollTo({
							top: window.lightboxScrollPosition,
							behavior: 'smooth',
						})
				}, 100)
		})
})
