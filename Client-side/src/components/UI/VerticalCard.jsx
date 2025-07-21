import React from "react";
import { Card, CardContent, CardFooter } from "./Card";
import { Megaphone } from "lucide-react";

function VerticalCard({
  title = "No Title",
  description = "No Description",
  category,
  banner,
  createdAt = new Date(),
  author = "Admin",
}) {
  return (
    <Card
      className={`flex bg-white rounded-xl shadow-sm overflow-hidden w-full max-w-3xl ${
        banner ? "h-64" : "min-h-48"
      }`}
    >
      {/* Left Image (only if banner exists) */}
      {banner && (
        <div className="w-1/3 min-w-[200px] flex items-center justify-center bg-gray-100 p-1">
          <img
            src={banner}
            alt="Announcement"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}

      {/* Right Text Content */}
      <div className={`${banner ? "w-2/3" : "w-full"} p-4 flex flex-col justify-between`}>
        <CardContent className="p-0 overflow-y-auto max-h-full pr-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className="bg-amber-500 p-2 rounded-full text-white">
              <Megaphone className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-serif font-semibold truncate">{title}</h2>
            {category && (
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full truncate">
                {category}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 line-clamp-4">{description}</p>
        </CardContent>

        <CardFooter className="flex justify-between text-sm text-gray-500 px-0 pt-4">
          <span className="font-medium text-gray-800">{author}</span>
          <span>{new Date(createdAt).toLocaleString()}</span>
        </CardFooter>
      </div>
    </Card>
  );
}

export default VerticalCard;
