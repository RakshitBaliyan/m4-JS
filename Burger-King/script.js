document.querySelectorAll('.food-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const quantityInput = this.nextElementSibling;
        if (this.checked) {
            quantityInput.disabled = false;
            quantityInput.value = 1;
        } else {
            quantityInput.disabled = true;
            quantityInput.value = 0;
        }
        calculateTotal();
    });
});

document.querySelectorAll('.food-quantity').forEach(input => {
    input.addEventListener('input', function () {
        if (this.value == 0) {
            this.previousElementSibling.checked = false;
            this.disabled = true;
        }
        calculateTotal();
    });
});

function calculateTotal() {
    let total = 0;
    document.querySelectorAll('.food-item').forEach(item => {
        const checkbox = item.querySelector('.food-checkbox');
        const quantity = item.querySelector('.food-quantity').value;
        if (checkbox.checked) {
            total += checkbox.getAttribute('data-price') * quantity;
        }
    });
    document.getElementById('total').innerText = total;
}

document.getElementById('place-order').addEventListener('click', function () {
    console.log("order btn clicked");
    
    // Hide food items and show order details
    document.getElementById('food-items').classList.add('hidden');
    document.getElementById('order-details').classList.remove('hidden');
    
    // Generate a random order ID
    const orderId = Math.floor(Math.random() * 100000);
    document.getElementById('order-id').innerText = orderId;

    // Start a 1.5-minute countdown timer
    let timeRemaining = 5; // 90 seconds
    const timerElement = document.getElementById('timer');
    const interval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
        const seconds = (timeRemaining % 60).toString().padStart(2, '0');
        timerElement.innerText = `${minutes}:${seconds}`;
        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(interval);
            document.getElementById('order-details').classList.add('hidden');
            document.getElementById('thank-you').classList.remove('hidden');
        }
    }, 1000);
});

// Handle feedback
document.getElementById('submit-feedback').addEventListener('click', function () {
    const feedback = document.getElementById('feedback').value;
    alert("Thank you for your feedback: " + feedback);
    document.getElementById('feedback').value = ""; // Clear input field
});

// Random feedbacks display
document.getElementById('submit-feedback').addEventListener('click', function () {
    const feedback = document.getElementById('feedback').value.trim();
    
    if (feedback) {
        alert("Thank you for your feedback: " + feedback);
        
        // Add feedback to the random feedbacks array
        feedbacks.push(feedback);
        
        // Clear the input field
        document.getElementById('feedback').value = "";
    } else {
        alert("Please enter feedback before submitting.");
    }
});

// Random feedbacks display
const feedbacks = ["Amazing food!", "Loved the service!", "Would order again!", "Great experience!"];
setInterval(() => {
    const randomFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];
    document.getElementById('random-feedback').innerText = randomFeedback;
}, 5000);
