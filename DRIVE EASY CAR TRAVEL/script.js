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

    const booking = {
        fullname: document.getElementById("fullName").value,
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
            console.error(error);
            alert("Supabase Error: " + error.message);
            return;
        }

        alert("Booking Successful");

        bookingForm.reset();

    } catch (err) {

        console.error(err);

        alert(
            "Network Error: " +
            err.message
        );
    }

});
```

}
