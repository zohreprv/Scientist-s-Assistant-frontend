const Logo = () => {
  return (
    <div className="flex justify-center items-center gap-9 mb-5" role="banner">
      <div className="rounded-lg w-1/3 overflow-hidden">
        <img src="/favicon.png" alt="scientists logo" className="scale-145" />
      </div>
      <div>
        <h1 className="font-semibold text-3xl w-fit">
          Scientist's <span className="text-blue">Assistant</span>
        </h1>
      </div>
    </div>
  );
};

export default Logo;
