export default function Aboutus() {
  return (
    <div
      className="flex items-center justify-between"
      style={{ height: "650px" }}
    >
      <div className="w-full" style={{ height: "650px", width: "1100px" }}>
        <img
          src="/assets/Tea.jpg"
          alt="Tea picking"
          className="object-cover"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div
        className="flex flex-col items-start justify-center w-1/2 p-8 bg-white"
        style={{ height: "650px" }}
      >
        <h1 className="mb-9 text-6xl font-bold text-green-900 -mt-24 overflow-hidden whitespace-nowrap ">
          Why you choose us?
        </h1>
        <p className="mb-4 text-2xl text-gray-700">
          At CropGain, we're dedicated to revolutionizing harvest management for
          a more profitable, efficient, and safe crop production. Our innovative
          solutions empower farmers and growers with the tools they need to
          optimize their harvest processes, from tea to cinnamon and beyond.
          With a focus on sustainability and productivity, CropGain is your
          partner in achieving the best results in agriculture.
        </p>
        <button className="px-14 py-3 font-semibold text-white bg-green-700 rounded-lg mt-6 text-2xl ml-40 transform transition-transform duration-300 hover:scale-110">
          About us
        </button>
      </div>
    </div>
  );
}
