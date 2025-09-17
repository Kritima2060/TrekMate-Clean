const Contact = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        e.target.reset();
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending message.");
    }
  };

  return (
      <section className="py-32 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mt-32 mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-12">
            Contact Us
          </h2>


          <div className="grid md:grid-cols-3 gap-8 text-sm font-light text-slate-400 tracking-wide">
            <div>
              <div className="mb-2">EMAIL</div>
              <div className="text-white">trekmate@gmail.com</div>
            </div>
            <div>
              <div className="mb-2">PHONE</div>
              <div className="text-white">+977 981-234-5678</div>
            </div>
            <div>
              <div className="mb-2">LOCATION</div>
              <div className="text-white">Biratnagar, Nepal</div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Contact;
