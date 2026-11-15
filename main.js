const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', function() {
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});


document.getElementById('global-search-btn').addEventListener('click', () => {

    const country = document.getElementById('global-country').value;
    const city = document.getElementById('global-city').value;
    const year = document.getElementById('global-year').value;

    document.getElementById('loading-overlay').classList.remove('hidden');
});


document.getElementById('loading-overlay').classList.add('hidden');


// ===============================
// My Plans
// ===============================

let savedPlans = JSON.parse(localStorage.getItem('wanderlust_plans')) || [];


// Save Plan
function savePlan(planData) {

    savedPlans.push(planData);

    localStorage.setItem(
        'wanderlust_plans',
        JSON.stringify(savedPlans)
    );

    document.getElementById('plans-count').textContent = savedPlans.length;
    document.getElementById('plans-count').classList.remove('hidden');

    displaySavedPlans();
}


// Display Saved Plans
function displaySavedPlans() {

    const container = document.getElementById('plans-content');

    const plans = JSON.parse(
        localStorage.getItem('wanderlust_plans')
    ) || [];

    if (plans.length === 0) {
        return;
    }

    container.innerHTML = plans.map(plan => `

    <div ``class="plan-card">

        <h4>${plan.name}</h4>

        <p>${plan.date || ''}</p>
        </div>

    ).join('');
}



document.addEventListener('click', (e) => {

    if (
        e.target.closest('.holiday-action-btn') ||
        e.target.closest('.event-card-save')
    ) {

        const card =
            e.target.closest('.holiday-card') ||
            e.target.closest('.event-card');

        if (!card) return;

        const name = card.querySelector('h3').textContent;

        const date =
            card.querySelector('.holiday-day-badge')?.textContent ||
            card.querySelector('.event-card-info div')?.textContent;

        savePlan({
            name: name,
            date: date
)}
}
displaySavedPlans();