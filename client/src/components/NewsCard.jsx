import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

const NewsCard = ({ item, pathUrl }) => {
  const formattedDate = format(new Date(item.createdAt), "MMMM d, yyyy");

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48">
        <Image
          src={item.blogimage || "/placeholder.svg"}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="transition-all duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold text-blue-600 uppercase">
          {item.category}
        </span>
        <Link
          href={`${pathUrl}/${item._id}`}
          className="block mt-2 hover:underline"
        >
          <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
            {item.title}
          </h2>
        </Link>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {item.shortdescription}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-500">{formattedDate}</span>
          <Link
            href={`${pathUrl}/${item._id}`}
            className="text-blue-500 hover:underline"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
