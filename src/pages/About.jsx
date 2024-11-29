const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(24,28,20)] to-[rgb(36,36,36)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-[rgb(32,32,32)] border border-[rgb(60,61,55)] p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-[rgb(236,223,204)] text-center uppercase">
          About Us
        </h1>
        <p className="text-[rgb(236,223,204)] text-lg leading-relaxed">
          Welcome to R@MIs Kart! We are dedicated to providing you with the
          best shopping experience. Our platform offers a wide range of
          products, from electronics to clothing, all at unbeatable prices.
          Experience seamless shopping with quality customer support and
          excellent deals.
        </p>
      </div>
    </div>
  );
};

export default About;
