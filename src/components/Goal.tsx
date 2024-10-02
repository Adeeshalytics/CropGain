export default function Goal() {
  return (
    <section
      className="relative w-full h-[80vh] bg-fixed bg-cover bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "url('/assets/tea-state.jpg')",
        paddingTop: "50px",
        paddingBottom: "100px",
        backgroundPosition: "top",
      }}
    >
      <div className="text-center p-12 bg-black bg-opacity-50 mt-8">
        <h2 className="text-6xl font-extrabold text-white font-montserrat ">
          Our goal is to empower farmers with innovative tools and insights to
          optimize harvest management, enhance productivity, and ensure
          sustainable practices, driving greater profitability and efficiency in
          crop production.
        </h2>
      </div>
    </section>
  );
}
