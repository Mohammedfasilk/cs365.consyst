import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "./Card";
import { Megaphone } from "lucide-react";
import { Badge } from "./Badge";

function HorizontalCard({
  title,
  description,
  category,
  banner,
  createdAt,
  author = "Admin",
}) {
  return (
    <Card className="w-full bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-auto">
      {/* Image at top (only if banner exists) */}
      {banner && (
        <CardHeader className="p-1 h-40 overflow-hidden">
          <img
            src={banner}
            alt="Announcement"
            className="object-cover w-full h-full p-1 rounded-lg"
          />
        </CardHeader>
      )}

      {/* Content below */}
      <CardContent className="flex-1 p-4 overflow-y-auto space-y-3">
        <div className="flex items-center space-x-2">
          <div className="bg-amber-500 p-2 rounded-full text-white">
            <Megaphone className="w-5 h-5" />
          </div>
          <CardTitle className="text-lg font-serif font-semibold">
            {title}
          </CardTitle>
          {category && (
            <Badge className="rounded-full bg-orange-200">{category}</Badge>
          )}
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between text-sm text-gray-500 px-4 py-2">
        <span className="font-medium text-gray-800">{author}</span>
        <span>{new Date(createdAt).toLocaleString()}</span>
      </CardFooter>
    </Card>
  );
}

export default HorizontalCard;
