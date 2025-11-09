/*=============== CAR FILTERING ===============*/
const filterItems = document.querySelectorAll('.filter__item');
const carCards = document.querySelectorAll('.car__card');

if (filterItems.length > 0 && carCards.length > 0) {
    filterItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items and add to the clicked one
            filterItems.forEach(el => el.classList.remove('active-filter'));
            item.classList.add('active-filter');

            const filterValue = item.getAttribute('data-filter');

            carCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = 'block'; // Or 'grid', 'flex', etc.
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
