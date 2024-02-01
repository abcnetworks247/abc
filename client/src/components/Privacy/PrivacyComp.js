import parse from "html-react-parser";

const Privacy = () => {
  return (
    <div>
      {/* terms and condition component */}
      <div className="container mx-auto px-4 lg:px-20 py-6 ">
        <div className="flex flex-wrap justify-center text-center my-12">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-2xl font-semibold">Read our Privacy Policy</h2>
            <p className="text-base leading-relaxed m-4 text-gray-600">
              {` Please read privacy policy carefully before using the ${process.env.NEXT_PUBLIC_CLIENT_URL}, website.`}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap">{parse(`${"new"}`)}</div>
      </div>
    </div>
  );
};

export default Privacy;
