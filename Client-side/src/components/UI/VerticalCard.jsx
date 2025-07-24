import React from "react";
import { Card, CardContent, CardFooter } from "./Card";
import { Bell, Calendar, Megaphone, PartyPopper } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function VerticalCard({ notice }) {
  const {
    title = "No Title",
    description = "No Description",
    category,
    banner,
    createdAt = new Date(),
    author = "Admin",
  } = notice;
  return (
    <Card
      className={`flex bg-white rounded-xl shadow-sm overflow-hidden w-full max-h-[400px] max-w-3xl `}
    >
      {/* Left Image (only if banner exists) */}
      {banner && (
  <div className="w-1/3 min-w-[200px] flex items-center justify-center p-1">
    <img
      src={banner}
      alt="Announcement"
      className="max-h-full max-w-full rounded object-contain"
    />
  </div>
)}

      {/* Right Text Content */}
      <div
        className={`${
          banner ? "w-2/3" : "w-full"
        } p-4 flex flex-col justify-between`}
      >
        <CardContent className="p-0 overflow-y-auto max-h-full pr-1">
          <div className="flex items-center space-x-2 mb-2">
            <div
              className={`${
                category.toLowerCase() === "celebration"
                  ? "bg-green-200 text-green-800"
                  : category.toLowerCase() === "event"
                  ? "bg-blue-200 text-blue-800"
                  : category.toLowerCase() === "reminder"
                  ? "bg-yellow-200 text-yellow-800"
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
            <h2 className="text-lg font-serif font-semibold truncate">
              {title}
            </h2>
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
          <p className="text-sm text-gray-600 line-clamp-4">{description}</p>
        </CardContent>

        <CardFooter className="flex justify-end text-sm text-gray-500 px-0 pt-4">
          <span>
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </span>
        </CardFooter>
      </div>
    </Card>
  );
}

export default VerticalCard;
