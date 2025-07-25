// import { format } from 'date-fns';
// import { Calendar, Clock, Repeat } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { CalendarEvent } from '@/types/calendar';
// import { cn } from '@/lib/utils';

import { format } from "date-fns";
import { Calendar, Clock, Repeat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../UI/Card";
import { Badge } from "../UI/Badge";
import { cn } from "../../lib/utils";

export const EventSidebar = ({
  todayEvents,
  tomorrowEvents,
  next7DaysEvents,
}) => {
  const categoryColors = {
    Strict: "bg-red-300/20 text-red-500 border-red-500/30",
    Flexible: "bg-blue-300/20 text-blue-500 border-blue-500/30",
  };

  const categoryLabels = {
    strict: "Strict",
    flexible: "Flexible",
    routine: "Routine",
  };

  const renderEventList = (events, showDate = false) => (
    <div className="space-y-2">
      {events.length === 0 ? (
        <p className="text-sm text-[var(--muted-foreground)]">No events</p>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            className={cn(
              "p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50",
              categoryColors[event.category]
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{event.title}</h4>
                {event.description && (
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {event.description}
                  </p>
                )}
                {showDate && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(event.date, "MMM d, yyyy")}
                  </p>
                )}
                {event.isRecurring && (
                  <div className="flex items-center mt-1">
                    <Repeat className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="text-xs text-muted-foreground">
                      Repeats {event.recurringType}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex gap-1">
                <Badge variant="secondary" className="text-xs">
                  {categoryLabels[event.category]}
                </Badge>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="w-80 space-y-6">
      {/* Today's Events */}
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Today
            <Badge
              variant="secondary"
              className="ml-auto bg-gray-100 rounded-full text-sm"
            >
              {todayEvents.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>{renderEventList(todayEvents)}</CardContent>
      </Card>

      {/* Tomorrow's Events */}
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-500" />
            Tomorrow
            <Badge
              variant="secondary"
              className="ml-auto bg-gray-100 rounded-full text-sm"
            >
              {tomorrowEvents.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>{renderEventList(tomorrowEvents)}</CardContent>
      </Card>

      {/* Next 7 Days */}
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            Next 7 Days
            <Badge
              variant="secondary"
              className="ml-auto bg-gray-100 rounded-full text-sm"
            >
              {next7DaysEvents.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>{renderEventList(next7DaysEvents, true)}</CardContent>
      </Card>
    </div>
  );
};
