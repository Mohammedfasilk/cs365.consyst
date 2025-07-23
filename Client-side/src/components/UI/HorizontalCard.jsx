import { Bell, Calendar, Megaphone, PartyPopper } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./Card";
import { Badge } from "./Badge";
import { formatDistanceToNow } from "date-fns";

function HorizontalCard({ notice }) {
  const {
    title,
    description,
    category,
    banner,
    createdAt,
    author = "Admin",
  } = notice;

  return (
    <Card className="w-full bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-auto">
      {banner && (
        <CardHeader className="p-1 overflow-hidden">
          <img
            src={`${import.meta.env.VITE_CS365_URI}/${banner.replace(
              /\\/g,
              "/"
            )}`}
            alt="img"
            className="object-cover w-full h-full p-1 rounded"
          />
        </CardHeader>
      )}

      <CardContent className="flex-1 p-4 overflow-y-auto space-y-3">
        <div className="flex items-center space-x-2">
          <div
            className={`${
              category.toLowerCase() === "celebration"
                ? "bg-green-200 text-green-800"
                : category.toLowerCase() === "event"
                ? "bg-blue-200 text-blue-800"
                : "bg-orange-200 text-orange-800"
            } p-2 rounded-full`}
          >
            {category.toLowerCase() === "celebration" ? (
              <PartyPopper className="w-4 h-4" />
            ) : category.toLowerCase() === "event" ? (
              <Calendar className="w-4 h-4" />
            ) : category.toLowerCase() === "reminder" ? (
              <Bell className="w-4 h-4" />
            ) : (
              <Megaphone className="w-4 h-4" />
            )}
          </div>
          <CardTitle className="text-lg font-serif font-semibold break-words">
            {title}
          </CardTitle>
          {category && (
            <span
              className={`text-xs rounded-full ${
                category.toLowerCase() === "celebration"
                  ? "bg-green-200 text-green-800"
                  : category.toLowerCase() === "event"
                  ? "bg-blue-200 text-blue-800"
                  : category.toLowerCase() === "reminder"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-orange-200 text-orange-800"
              } px-2 py-0 rounded-full truncate`}
            >
              {category}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 break-words">{description}</p>
      </CardContent>

      <CardFooter className="flex justify-end text-sm text-gray-500 px-4 py-2">
        <span>
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
      </CardFooter>
    </Card>
  );
}

export default HorizontalCard;
