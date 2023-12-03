import Image from "next/image";

const Companies = () => {
  return (
    <section className=" px-3 md:container pt-4">
      <h1 className="text-center text-2xl font-bold text-slate-600">
        Trusted by with industry leaders
      </h1>
      <div className="grid grid-cols-5 gap-8 px-20 py-8 place-items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/128/731/731970.png"
          alt=""
          className="h-10 sm:h-20 hover:scale-110"
        />
        <Image
          src="https://cdn-icons-png.flaticon.com/128/6033/6033713.png"
          alt="company"
          height={50}
          width={65}
          className="h-10 sm:h-20 hover:scale-110"
        />
        <Image
          src="https://cdn-icons-png.flaticon.com/128/1724/1724587.png"
          alt="company"
          height={50}
          width={65}
          className="h-10 sm:h-20 hover:scale-110"
        />
        <Image
          src="https://cdn-icons-png.flaticon.com/128/10464/10464582.png"
          alt="company"
          height={50}
          width={65}
          className="h-10 sm:h-20 hover:scale-110"
        />
        <Image
          src="https://cdn-icons-png.flaticon.com/128/731/731985.png"
          alt="company"
          height={50}
          width={65}
          className="h-10 sm:h-20 hover:scale-110"
        />
      </div>
    </section>
  );
};

export default Companies;
