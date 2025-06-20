// Button click alert
document.getElementById('bookNowBtn').addEventListener('click', () => {
  alert('Booking feature is below! Please fill out the form.');
});

// Wishlist logic with localStorage
const wishlistButtons = document.querySelectorAll('.wishlist-btn');

function loadWishlist() {
  return JSON.parse(localStorage.getItem('hotelWishlist')) || [];
}

function saveWishlist(wishlist) {
  localStorage.setItem('hotelWishlist', JSON.stringify(wishlist));
}

function updateWishlistUI() {
  const wishlist = loadWishlist();
  wishlistButtons.forEach(btn => {
    const id = btn.dataset.id;
    if (wishlist.includes(id)) {
      btn.textContent = 'Remove from Wishlist';
      btn.classList.add('active');
    } else {
      btn.textContent = 'Add to Wishlist';
      btn.classList.remove('active');
    }
  });
}

wishlistButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    let wishlist = loadWishlist();
    const id = btn.dataset.id;
    if (wishlist.includes(id)) {
      wishlist = wishlist.filter(item => item !== id);
    } else {
      wishlist.push(id);
    }
    saveWishlist(wishlist);
    updateWishlistUI();
  });
});

updateWishlistUI();

// Booking form submission
const bookingForm = document.getElementById('bookingForm');
const bookingMsg = document.getElementById('bookingMsg');

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const checkinDate = new Date(bookingForm.checkin.value);
  const checkoutDate = new Date(bookingForm.checkout.value);
  if (checkoutDate <= checkinDate) {
    bookingMsg.style.color = 'red';
    bookingMsg.textContent = 'Check-out date must be after check-in date.';
    return;
  }

  bookingMsg.style.color = 'green';
  bookingMsg.textContent = `Thank you, ${bookingForm.name.value}! Your booking request for the ${bookingForm.room.value} from ${bookingForm.checkin.value} to ${bookingForm.checkout.value} has been received.`;

  bookingForm.reset();
});
