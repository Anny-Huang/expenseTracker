/**
 *     This component only represent a single row inside the recent transactions
 *     It does not have rounded corners as it should belong to the outer container
 */

import { Text, View, useThemeColor } from "@/components/Themed";
import {
    isToday as dfIsToday,
    isYesterday as dfIsYesterday,
    format,
    isSameYear,
} from "date-fns";
import React from "react";

type Props = {
  merchant: string;
  date: string;
  total: number;
  category: string;
};

// Treat "YYYY-MM-DD" as a LOCAL calendar date
function parseLocalDate(input: string): Date | null {
  if (!input) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
  if (m) {
    const [, y, mo, d] = m;
    return new Date(Number(y), Number(mo) - 1, Number(d)); // local midnight
  }
  const dt = new Date(input);
  return isNaN(dt.getTime()) ? null : dt;
}

export default function TransactionCard({
  merchant,
  date,
  total,
  category,
}: //   isLast = false, -- only rows that are NOT the last one get a bottom border as divider
Props) {
  const text = useThemeColor({}, "text");
  const textMuted = useThemeColor({}, "textMuted");
  const cardBg = useThemeColor({}, "card");
  const border = useThemeColor({}, "border");

  //   Format the transaction date: today, yesterday, date
  const dt = parseLocalDate(date);
  let fDate = date;
  if (dt) {
    if (dfIsToday(dt)) {
      fDate = `Today, ${format(dt, "p")}`; // e.g., "Today, 2:34 PM"
    } else if (dfIsYesterday(dt)) {
      fDate = "Yesterday";
    } else if (isSameYear(dt, new Date())) {
      fDate = format(dt, "MMM d"); // "Oct 1"
    } else {
      fDate = format(dt, "MMM d, yyyy"); // "Oct 1, 2024"
    }
  }

  return (
    <View
      style={{
        backgroundColor: cardBg,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: border,
        // borderBottomWidth: isLast ? 0 : 1,
        // borderBottomColor: border,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: cardBg,
        }}
      >
        <Text style={{ color: text, fontSize: 16, fontWeight: "600" }}>
          {merchant}
        </Text>
        <Text style={{ color: textMuted, fontSize: 12 }}>{fDate}</Text>
      </View>

      <View style={{ alignItems: "flex-end", backgroundColor: cardBg }}>
        <Text style={{ color: text, fontWeight: "600", fontSize: 16 }}>
          {total < 0 ? "-" : "+"}${Math.abs(total).toFixed(2)}
        </Text>
        <Text style={{ color: textMuted, fontSize: 12 }}>{category}</Text>
      </View>
    </View>
  );
}
