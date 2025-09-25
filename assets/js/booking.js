// Booking Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const tourSelect = document.getElementById('tourSelect');
    const adultsSelect = document.getElementById('adults');
    const childrenSelect = document.getElementById('children');
    const departureDate = document.getElementById('departureDate');
    const returnDate = document.getElementById('returnDate');
    
    // Tour prices
    const tourPrices = {
        'con-dao': { price: 299, duration: '3 days 2 nights' },
        'phu-quoc': { price: 399, duration: '4 days 3 nights' },
        'ha-long': { price: 199, duration: '2 days 1 night' },
        'sapa': { price: 249, duration: '3 days 2 nights' },
        'hue': { price: 179, duration: '2 days 1 night' },
        'hoi-an': { price: 189, duration: '2 days 1 night' },
        'da-nang': { price: 279, duration: '3 days 2 nights' },
        'tam-dao': { price: 149, duration: '2 days 1 night' }
    };
    
    // Update summary when form changes
    function updateSummary() {
        const selectedTour = tourSelect.value;
        const adults = parseInt(adultsSelect.value) || 0;
        const children = parseInt(childrenSelect.value) || 0;
        
        if (selectedTour && tourPrices[selectedTour]) {
            const tourInfo = tourPrices[selectedTour];
            const tourName = tourSelect.options[tourSelect.selectedIndex].text;
            
            document.getElementById('summaryTour').textContent = tourName;
            document.getElementById('summaryDuration').textContent = tourInfo.duration;
            document.getElementById('summaryTravelers').textContent = `${adults} Adults${children > 0 ? `, ${children} Children` : ''}`;
            
            // Calculate total price (children 50% discount)
            const adultPrice = tourInfo.price * adults;
            const childPrice = tourInfo.price * 0.5 * children;
            const totalPrice = adultPrice + childPrice;
            
            document.getElementById('summaryPrice').textContent = `$${totalPrice}`;
        } else {
            document.getElementById('summaryTour').textContent = 'Select a tour';
            document.getElementById('summaryDuration').textContent = '-';
            document.getElementById('summaryTravelers').textContent = '-';
            document.getElementById('summaryPrice').textContent = '$0';
        }
    }
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    departureDate.min = today;
    returnDate.min = today;
    
    // Update return date minimum when departure date changes
    departureDate.addEventListener('change', function() {
        if (this.value) {
            const departureDateValue = new Date(this.value);
            departureDateValue.setDate(departureDateValue.getDate() + 1);
            returnDate.min = departureDateValue.toISOString().split('T')[0];
        }
    });
    
    // Add event listeners
    tourSelect.addEventListener('change', updateSummary);
    adultsSelect.addEventListener('change', updateSummary);
    childrenSelect.addEventListener('change', updateSummary);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.tourSelect || !data.departureDate || !data.returnDate || !data.adults) {
            alert('Please fill in all required fields.');
            return;
        }
        
        if (!data.terms) {
            alert('Please agree to the Terms & Conditions.');
            return;
        }
        
        // Validate dates
        const departure = new Date(data.departureDate);
        const returnDate = new Date(data.returnDate);
        
        if (returnDate <= departure) {
            alert('Return date must be after departure date.');
            return;
        }
        
        // Show success message
        showBookingSuccess(data);
    });
    
    // Show booking success modal
    function showBookingSuccess(data) {
        const tourName = tourSelect.options[tourSelect.selectedIndex].text;
        const totalPrice = document.getElementById('summaryPrice').textContent;
        
        const successMessage = `
            <div style="text-align: center; padding: 20px;">
                <h3 style="color: var(--viridian-green); margin-bottom: 20px;">Booking Confirmed!</h3>
                <p style="margin-bottom: 15px;"><strong>Tour:</strong> ${tourName}</p>
                <p style="margin-bottom: 15px;"><strong>Travelers:</strong> ${data.adults} Adults${data.children > 0 ? `, ${data.children} Children` : ''}</p>
                <p style="margin-bottom: 15px;"><strong>Dates:</strong> ${data.departureDate} to ${data.returnDate}</p>
                <p style="margin-bottom: 20px;"><strong>Total Price:</strong> ${totalPrice}</p>
                <p style="color: var(--gray-1); font-size: 14px;">We'll send you a confirmation email shortly.</p>
            </div>
        `;
        
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: 20px;
            padding: 0;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease;
        `;
        
        modalContent.innerHTML = successMessage;
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Auto close after 5 seconds
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 5000);
    }
});

// Reset form function
function resetForm() {
    document.getElementById('bookingForm').reset();
    document.getElementById('summaryTour').textContent = 'Select a tour';
    document.getElementById('summaryDuration').textContent = '-';
    document.getElementById('summaryTravelers').textContent = '-';
    document.getElementById('summaryPrice').textContent = '$0';
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
