import Image from "next/image";
import FooterComp from "../Footer/FooterComp";
import Newsletter from "../newsletter/Newsletter";

export default function BlogComp() {
  return (
    <div>
      {/* <!-- component --> */}
      <div className="max-w-screen-lg mx-auto md:max-w-screen-xl md:px-10">
        <main className="">
          {/* <!-- featured section --> */}
          <div className="flex flex-col gap-5 mb-16 space-x-0 lg:flex-row md:flex-row md:space-x-6">
            {/* <!-- main post --> */}
            <div className="relative block w-full p-4 mb-4 rounded lg:mb-0 lg:p-0 md:w-4/7">
              <Image
                src="https://images.unsplash.com/photo-1427751840561-9852520f8ce8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                height={500}
                width={500}
                alt="img"
                className="object-cover w-full h-60 md:h-[60vh] rounded-md"
              />
              <span className="hidden mt-4 text-sm text-green-700 md:block">
                {" "}
                Technology{" "}
              </span>
              <h1 className="my-4 text-xl font-bold leading-tight text-gray-800">
                Ignorant branched humanity led now marianne too.
              </h1>
              <p className="mb-4 text-sm text-gray-600">
                Necessary ye contented newspaper zealously breakfast he
                prevailed. Melancholy middletons yet understood decisively boy
                law she. Answer him easily are its barton little. Oh no though
                mother be things simple itself. Oh be me, sure wise sons, no.
                Piqued ye of am spirit regret. Stimulated discretion impossible
                admiration in particular conviction up.
              </p>
              <a
                href="#"
                className="inline-block px-6 py-3 mt-2 text-gray-100 bg-green-700 rounded-md"
              >
                Read more
              </a>
            </div>

            {/* <!-- sub-main posts --> */}
            <div className="w-full md:w-4/7">
              {/* <!-- post 1 --> */}
              <div className="flex flex-col w-full mb-10 rounded md:flex-row">
                <Image
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                  height={500}
                  width={500}
                  alt="img"
                  className="block object-cover w-auto h-[60vh] m-4 rounded-md md:hidden lg:block md:h-[23vh] md:m-0"
                />
                <div className="px-4 bg-white rounded">
                  <span className="hidden text-sm text-green-700 md:block">
                    {" "}
                    Gadgets{" "}
                  </span>
                  <div className="mb-2 text-base font-semibold text-gray-800 md:mt-0">
                    At every tiled on ye defer do. No attention suspected oh
                    difficult.
                  </div>
                  <p className="block p-2 pt-1 pl-0 text-sm text-gray-600 md:hidden ">
                    Wonder matter now can estate esteem assure fat roused. Am
                    performed on existence as discourse is. Pleasure friendly at
                    marriage blessing or
                  </p>
                </div>
              </div>

              <div className="flex flex-col w-full mb-10 rounded md:flex-row">
                <Image
                  src="https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                  height={500}
                  width={500}
                  alt="img"
                  className="block object-cover w-auto h-[60vh] m-4 rounded-md md:hidden lg:block md:h-[23vh] md:m-0"
                />
                <div className="px-4 bg-white rounded">
                  <span className="hidden text-sm text-green-700 md:block">
                    {" "}
                    Gadgets{" "}
                  </span>
                  <div className="mb-2 text-base font-semibold text-gray-800 md:mt-0">
                    At every tiled on ye defer do. No attention suspected oh
                    difficult.
                  </div>
                  <p className="block p-2 pt-1 pl-0 text-sm text-gray-600 md:hidden ">
                    Wonder matter now can estate esteem assure fat roused. Am
                    performed on existence as discourse is. Pleasure friendly at
                    marriage blessing or
                  </p>
                </div>
              </div>

              {/* <!-- post 2 --> */}
             
              {/* <!-- post 3 --> */}
              <div className="flex flex-col w-full mb-10 rounded md:flex-row">
                <Image
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                  height={500}
                  width={500}
                  alt="img"
                  className="block object-cover w-auto h-[60vh] m-4 rounded-md md:hidden lg:block md:h-[23vh] md:m-0"
                />
                <div className="px-4 bg-white rounded">
                  <span className="hidden text-sm text-green-700 md:block">
                    {" "}
                    Insights{" "}
                  </span>
                  <div className="mb-2 text-base font-semibold text-gray-800 md:mt-0">
                    Advice me cousin an spring of needed. Tell use paid law ever
                    yet new.
                  </div>
                  <p className="block p-2 pt-1 pl-0 text-sm text-gray-600 md:hidden">
                    Meant to learn of vexed if style allow he there. Tiled man
                    stand tears ten joy there terms any widen.
                  </p>
                </div>
              </div>
              {/* <!-- post 4 --> */}
              <div className="flex flex-col w-full mb-10 rounded md:flex-row">
                <Image
                  src="https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                  height={500}
                  width={500}
                  alt="img"
                  className="block object-cover w-auto h-[60vh] m-4 rounded-md md:hidden lg:block md:h-[23vh] md:m-0"
                />
                <div className="px-4 bg-white rounded">
                  <span className="hidden text-sm text-green-700 md:block">
                    {" "}
                    Cryptocurrency{" "}
                  </span>
                  <div className="mb-2 text-base font-semibold text-gray-800 md:mt-0">
                    Advice me cousin an spring of needed. Tell use paid law ever
                    yet new.
                  </div>
                  <p className="block p-2 pt-1 pl-0 text-sm text-gray-600 md:hidden">
                    Meant to learn of vexed if style allow he there. Tiled man
                    stand tears ten joy there terms any widen.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end featured section --> */}

          {/* <!-- recent posts --> */}
          <div className="flex items-center justify-between px-4 mt-16 mb-4 lg:px-0">
            <h2 className="text-3xl font-bold">Latest news</h2>
            <a className="px-3 py-1 text-gray-800 bg-gray-200 rounded cursor-pointer hover:bg-green-200">
              View all
            </a>
          </div>
          <div className="block space-x-0 lg:flex lg:space-x-6">
            <div className="w-full p-4 rounded lg:w-1/2 xl:w-1/3 lg:p-0">
              <Image
                src="https://images.unsplash.com/photo-1526666923127-b2970f64b422?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                height={500}
                width={500}
                alt="img"
                className="rounded"
              
              />
              <div className="p-4 pl-0">
                <h2 className="text-base font-bold text-gray-800">
                  Put all speaking her delicate recurred possible.
                </h2>
                <p className="mt-2 text-gray-700">
                  Set indulgence inquietude discretion insensible bed why
                  announcing. Middleton fat two satisfied additions. So
                  continued he or commanded household smallness delivered. Door
                  poor on do walk in half. Roof his head the what.
                </p>

                <a
                  href="#"
                  className="inline-block py-2 mt-2 ml-auto text-green-900 rounded"
                >
                  {" "}
                  Read more{" "}
                </a>
              </div>
            </div>

            <div className="w-full p-4 rounded lg:w-1/2 xl:w-1/3 lg:p-0">
              <Image
                src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                className="rounded"
                height={500}
                width={500}
                alt="img"
              />
              <div className="p-4 pl-0">
                <h2 className="text-base font-bold text-gray-800">
                  Is at purse tried jokes china ready decay an.{" "}
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                  Small its shy way had woody downs power. To denoting admitted
                  speaking learning my exercise so in. Procured shutters mr it
                  feelings. To or three offer house begin taken am at.
                </p>

                <a
                  href="#"
                  className="inline-block py-2 mt-2 ml-auto text-green-900 rounded"
                >
                  {" "}
                  Read more{" "}
                </a>
              </div>
            </div>

            <div className="w-full p-4 rounded lg:w-1/2 xl:w-1/3 lg:p-0">
              <Image
                src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
                className="rounded"
                height={500}
                width={500}
                alt="img"
              />
              <div className="p-4 pl-0">
                <h2 className="text-base font-bold text-gray-800">
                  As dissuade cheerful overcame so of friendly he indulged
                  unpacked.
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                  Alteration connection to so as collecting me. Difficult in
                  delivered extensive at direction allowance. Alteration put use
                  diminution can considered sentiments interested discretion.
                </p>

                <a
                  href="#"
                  className="inline-block py-2 mt-2 ml-auto text-green-900 rounded"
                >
                  {" "}
                  Read more{" "}
                </a>
              </div>
            </div>
          </div>
          {/* <!-- end recent posts --> */}

          {/* <!-- subscribe --> */}
          <Newsletter />
          {/* <!-- ens subscribe section --> */}

          {/* <!-- popular posts --> */}
          <div className="flex items-center justify-between px-4 mt-16 mb-4 lg:px-0">
            <h2 className="text-3xl font-bold">Popular news</h2>
            <a className="px-3 py-1 text-gray-800 bg-gray-200 rounded cursor-pointer hover:bg-green-200">
              View all
            </a>
          </div>
          <div className="block space-x-0 lg:flex lg:space-x-6">
            <div className="w-full p-4 rounded lg:w-1/2 xl:w-1/3 lg:p-0">
              <Image
                src="https://images.unsplash.com/photo-1526666923127-b2970f64b422?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                className="rounded"
                height={500}
                width={500}
                alt="img"
              />
              <div className="p-4 pl-0">
                <h2 className="text-base font-bold text-gray-800">
                  Put all speaking her delicate recurred possible.
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                  Set indulgence inquietude discretion insensible bed why
                  announcing. Middleton fat two satisfied additions. So
                  continued he or commanded household smallness delivered. Door
                  poor on do walk in half. Roof his head the what.
                </p>

                <a
                  href="#"
                  className="inline-block py-2 mt-2 ml-auto text-green-900 rounded"
                >
                  {" "}
                  Read more{" "}
                </a>
              </div>
            </div>

            <div className="w-full p-4 rounded lg:w-1/2 xl:w-1/3 lg:p-0">
              <Image
                src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                className="rounded"
                height={500}
                width={500}
                alt="img"
              />
              <div className="p-4 pl-0">
                <h2 className="text-base font-bold text-gray-800">
                  Is at purse tried jokes china ready decay an.{" "}
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                  Small its shy way had woody downs power. To denoting admitted
                  speaking learning my exercise so in. Procured shutters mr it
                  feelings. To or three offer house begin taken am at.
                </p>

                <a
                  href="#"
                  className="inline-block py-2 mt-2 ml-auto text-green-900 rounded"
                >
                  {" "}
                  Read more{" "}
                </a>
              </div>
            </div>

            <div className="w-full p-4 rounded lg:w-1/2 xl:w-1/3 lg:p-0">
              <Image
                src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
                className="rounded"
                height={500}
                width={500}
                alt="img"
              />
              <div className="p-4 pl-0">
                <h2 className="text-base font-bold text-gray-800">
                  As dissuade cheerful overcame so of friendly he indulged
                  unpacked.
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                  Alteration connection to so as collecting me. Difficult in
                  delivered extensive at direction allowance. Alteration put use
                  diminution can considered sentiments interested discretion.
                </p>

                <a
                  href="#"
                  className="inline-block py-2 mt-2 ml-auto text-green-900 rounded"
                >
                  {" "}
                  Read more{" "}
                </a>
              </div>
            </div>
          </div>
          {/* <!-- end popular posts --> */}
        </main>
        {/* <!-- main ends here --> */}
      </div>
      <FooterComp />
    </div>
  );
}
