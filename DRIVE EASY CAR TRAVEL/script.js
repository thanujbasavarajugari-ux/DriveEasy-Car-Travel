alert("SCRIPT LOADED");

const SUPABASE_URL =
"https://glqaoesroggpjrrryjan.supabase.co";

const SUPABASE_KEY =
"sb_publishable_KIqnwBxwxww7Wn0j7O6SDQ_nTJldkWX";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        alert("SUBMIT CLICKED");

        const booking = {
            fullname: document.getElementById("fullname").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            pickup_date: document.getElementById("pickup_date").value,
            pickup_location: document.getElementById("pickup_location").value,
            drop_location: document.getElementById("drop_location").value,
            passengers: document.getElementById("passengers").value,
            car_name: document.getElementById("car_name").value
        };

        try {

            const { error } = await supabaseClient
                .from("bookings")
                .insert([booking]);

          if (error) {
    alert("Supabase Error: " + error.message);
    return;
}

alert("Booking Successful");

// MAKE WEBHOOK
await fetch("https://hook.eu1.make.com/lwfwjmg4tfr539io0gmsma9tmdltg0vg", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(booking)
});

const message =
`🚗 New Booking

Name: ${booking.fullname}
Phone: ${booking.phone}
Pickup: ${booking.pickup_location}
Drop: ${booking.drop_location}
Date: ${booking.pickup_date}
Passengers: ${booking.passengers}`;

window.open(
`https://wa.me/917569782982?text=${encodeURIComponent(message)}`,
"_blank"
);

bookingForm.reset();

        } catch (err) {

            alert("Network Error: " + err.message);

        }

    });

}